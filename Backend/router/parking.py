from datetime import datetime, timedelta
from typing import List, Optional, Union
from math import ceil
from config.database import db
from fastapi import APIRouter, Body, HTTPException

PLEDGE = 50
FEE = 10

router = APIRouter(prefix="/park",
                   tags=["park"])


def cost_calculate(start):
    if start is None:
        return 0
    hours = ceil(abs(datetime.now() - start).total_seconds() / 3600)
    return hours * FEE


def convert_time(time: datetime):
    hour = int(time.total_seconds() // 3600)
    min = int(time.total_seconds() % 3600 // 60)
    sec = int(time.total_seconds() % 60 // 1)
    return f"{hour}:{min}:{sec}"


def create_payment(user_id: str, fee: int):
    collection_payment = db["payment_parking"]
    collection_payment.insert_one({"user_id": user_id,
                           "fee": fee,
                           "time_payment": datetime.now()})


# Frontend
@router.get("/", status_code=200)
def get_park():
    collection = db["car_park"]
    data = list(collection.find({}, {"_id": False}))

    if len(data) == 0:
        raise HTTPException(status_code=404, detail="Park not found")

    for park in data:
        if park["time_reserved"] is not None:
            park["remain_time_reserved"] = park["time_reserved"] - datetime.now()
        else:
            park["remain_time_reserved"] = None

    return {"result": data}


# Frontend QR or park detail
@router.get("/{park_id}", status_code=200)
def get_park_id(park_id: int):
    if park_id not in range(0, 2):
        raise HTTPException(status_code=404, detail="Park Id not in range 0-1")

    collection = db["car_park"]
    data = list(collection.find({"park_id": park_id}, {"_id": False}))

    if len(data) == 0:
        raise HTTPException(status_code=404, detail="Park not found")

    result = data[0]

    reserved_time = None
    if result["time_reserved"] is not None:
        reserved_time = convert_time(result["time_reserved"] - datetime.now())

    parked_time = None
    if result["time_start"] is not None:
        parked_time = convert_time(datetime.now() - result["time_start"])

    result["remain_time_reserved"] = reserved_time
    result["parked_time"] = parked_time
    result["fee"] = cost_calculate(result["time_start"])

    return {"result": result}


# # Hardware
# @router.put("/update/{park_id}", status_code=200)
# def update_park(park_id: int):


# Hardware input output validate data in db
@router.get("/barrier/{park_id}/{state}", status_code=200)
def get_barrier(park_id: int, state: str):
    if park_id not in range(0, 2):
        raise HTTPException(status_code=404, detail="park_id must in range 0-1")

    if state not in ["empty", "reserved", "parked"]:
        raise HTTPException(status_code=404, detail="state must in [empty, reserved, parked]")

    collection_park = db["car_park"]
    park = list(collection_park.find({"park_id": park_id}))

    if len(park) == 0:
        raise HTTPException(status_code=404, detail="park not found")

    # =====
    if park[0]["is_use_time_close"] == False and park[0]["time_close"] < datetime.now():
        if state == "parked":
            collection_park.update_one({"park_id": park_id}, {"$set": {"is_open": False,
                                                                       "time_start": datetime.now(),
                                                                       "is_use_time_close": True}})

        elif state == "empty":
            collection_park.update_one({"park_id": park_id}, {"$set": {"state": "empty",
                                                                       "is_open": True,
                                                                       "time_start": None,
                                                                       "time_close": None,
                                                                       "is_use_time_close": True,
                                                                       "user_id": "-1",
                                                                       "time_reserved": None}})

    if park[0]["state"] == "reserved" and park[0]["time_reserved"] < datetime.now():
        collection_park.update_one({"park_id": park_id}, {"$set": {"state": "empty",
                                                                   "is_open": True,
                                                                   "time_start": None,
                                                                   "is_use_time_close": True,
                                                                   "user_id": "-1",
                                                                   "time_reserved": None}})
        # add payment for user who reserved this park but not park 50
        create_payment(park[0]["user_id"], PLEDGE)
    # =====

    return {"result": park[0]["is_open"]}


# Frontend call for open barrier and get fee
@router.put("/barrier/{park_id}", status_code=200)
def update_barrier(park_id: int):
    if park_id not in range(0, 2):
        raise HTTPException(status_code=404, detail="park_id must in range 0-1")

    collection_park = db["car_park"]
    park = list(collection_park.find({"park_id": park_id}))

    if len(park) == 0:
        raise HTTPException(status_code=404, detail="park not found")

    collection_park.update_one({"park_id": park_id}, {"$set": {"is_open": True,
                                                               "time_close": datetime.now() + timedelta(seconds=10),
                                                               "is_use_time_close": False}})
    # Payment after open
    create_payment(park[0]["user_id"], cost_calculate(park[0]["time_start"]))
    
    return {"result": "Success, barrier is open"}


# TODAY!!!
# Frontend
@router.post("/reserved/{park_id}/{user_id}", status_code=200)
def reserved_park(park_id: int, user_id: int):
    if park_id not in range(0, 2):
        raise HTTPException(status_code=404, detail="park_id must in range 0-1")
    
    collection_park = db["car_park"]
    park = list(collection_park.find({"park_id": park_id}))
    if len(park) == 0:
        raise HTTPException(status_code=404, detail="park not found")
    
    collection_user = db["parking_user"]
    user = list(collection_user.find({"_id": user_id}))
    if len(user) == 0:
        raise HTTPException(status_code=404, detail="user not found")
    
    if park[0]["state"] != "empty":
        raise HTTPException(status_code=404, detail="park is not empty")
    
    collection_park.update_one({"park_id": park_id}, {"$set": {"user_id": user_id,
                                                               "state": "reserved",
                                                               "is_open": False,
                                                                "time_reserved": datetime.now() + timedelta(seconds=30)}})
                                                                
    collection_user.update_one({"_id": user_id}, {"$set": {"park_id": park_id}})
    
    return {"result": "Success, park is reserved"}
    

# Frontend Optional
@router.delete("/reserved/{park_id}", status_code=200)
def delete_reserved_park(park_id: int):
    pass
