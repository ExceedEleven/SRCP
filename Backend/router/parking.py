from datetime import datetime, timedelta
from typing import List, Optional, Union
from math import ceil
from config.database import db
from fastapi import APIRouter, Body, HTTPException


router = APIRouter(prefix="/park",
                   tags=["park"])

FEE = 10


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


@router.put("/update/{park_id}", status_code=200)
def update_park(park_id: int):
    pass


@router.get("/barrier/{park_id}", status_code=200)
def get_barrier(park_id: int):
    pass


@router.put("/barrier/{park_id}", status_code=200)
def update_barrier(park_id: int):
    pass


@router.post("/reserved/{park_id}/{user_id}", status_code=200)
def reserved_park(park_id: int, user_id: int):
    pass


@router.delete("/reserved/{park_id}", status_code=200)
def delete_reserved_park(park_id: int):
    pass



