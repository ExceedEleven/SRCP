from datetime import datetime, timedelta
from typing import List, Optional, Union

from config.database import db
from fastapi import APIRouter, Body, HTTPException


router = APIRouter(prefix="/park",
                   tags=["park"])

