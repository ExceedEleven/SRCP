from datetime import datetime, timedelta
from typing import List, Optional, Union
from math import ceil
from config.database import db
from fastapi import APIRouter, Body, HTTPException

PLEDGE = 50
FEE = 10

router = APIRouter(prefix="/park",
                   tags=["park"])


def cost_calculate(start: datetime, cost):
    hours = ceil(abs(datetime.now() - start).total_seconds() / 3600)
    return hours * FEE


@router.get("/", status_code=200)
def get_park():
    collection = db["car_park"]
    data = list(collection.find({}, {"_id": False}))

    if len(data) == 0:
        raise HTTPException(status_code=404, detail="Park not found")

    return {"result": data}

# Frontend
@router.get("/{park_id}", status_code=200)
def get_park(park_id: int):
    if park_id not in range(0, 2):
        raise HTTPException(status_code=404, detail="Park Id not in range (0-2)")

    collection = db["car_park"]
    data = list(collection.find({"park_id": park_id}, {"_id": False}))

    if len(data) == 0:
        raise HTTPException(status_code=404, detail="Park not found")

    result = data[0]
    return {"result": result,
            "fee": cost_calculate(result["start_time"], FEE)}

# # Hardware 
# @router.put("/update/{park_id}", status_code=200)
# def update_park(park_id: int):
    

# Hardware
@router.get("/barrier/{park_id}/{state}", status_code=200)
def get_barrier(park_id: int, state: str):
    if park_id not in range(0,1):
        raise HTTPException(status_code=404, detail="park_id must in range 0-1")
    
    if state not in ["empty", "reserved", "parked"]:
        raise HTTPException(status_code=404, detail="state must in [empty, reserved, parked]")
    
    park = list(db["parking"].find({"park_id": park_id}))
    
    if len(park) == 0:
        raise HTTPException(status_code=404, detail="park not found")

    # =====
    if park[0]["is_use_time_close"] == False:
        if park[0]["time_close"] < datetime.now():
            if state == "parked":
                db["parking"].update_one({"park_id": park_id}, {"$set": {"is_open": False, "time_start": datetime.now(), "is_use_time_close": True}})
            
            elif state == "empty":
                db["parking"].update_one({"park_id": park_id}, {"$set": {"state": "empty", "is_open": True, "time_start": None, "is_use_time_close": True}})
    
    if park[0]["state"] == "reserved" and park[0]["time_reserved"] < datetime.now():
        db["parking"].update_one({"park_id": park_id}, {"$set": {"state": "empty", "is_open": True, "time_start": None, "is_use_time_close": True, "user_id": None, "time_reserved": None}})
        # add payment for user who reserved this park but not park 50
    # =====
    
    return {"result": park[0]["is_open"]}
    

# Frontend
@router.put("/barrier/{park_id}", status_code=200)
def update_barrier(park_id: int):
    if park_id not in range(0,1):
        raise HTTPException(status_code=404, detail="park_id must in range 0-1")
    
    park = list(db["parking"].find({"park_id": park_id}))
    
    if len(park) == 0:
        raise HTTPException(status_code=404, detail="park not found")
    
    db["parking"].update_one({"park_id": park_id}, {"$set": {"is_open": True, "time_close": datetime.now() + timedelta(seconds=10), "is_use_time_close": False}})
    
    return {"result": "Success, barrier is open"}

# TODAY!!!
# Frontend
@router.post("/reserved/{park_id}/{user_id}", status_code=200)
def reserved_park(park_id: int, user_id: int):
    pass

# Frontend
@router.delete("/reserved/{park_id}", status_code=200)
def delete_reserved_park(park_id: int):
    pass



