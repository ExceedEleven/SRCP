from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    user_id: str
    park_id: str
    username: str
    password: str
    credits_card: str
    jwt: str
    
    
class CarPark(BaseModel):
    park_id: str
    state: str
    is_open: bool
    time_start: datetime
    

class Payment(BaseModel):
    payment_id: str
    user_id: str
    fee: int
    time_payment: datetime
    
    
class Reservation(BaseModel):
    user_id: str
    park_id: str
    time_expire: datetime