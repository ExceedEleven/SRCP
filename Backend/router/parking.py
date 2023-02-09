from datetime import datetime, timedelta
from typing import List, Optional, Union

from config.database import db
from fastapi import APIRouter, Body, HTTPException


router = APIRouter(prefix="/park",
                   tags=["park"])


@router.get("/", status_code=200)
def get_park():
    pass


@router.get("/{park_id}", status_code=200)
def get_park(park_id: int):
    pass


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



