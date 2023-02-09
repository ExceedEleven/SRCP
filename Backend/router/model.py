from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    user_id: int
    username: str
    password: str
    credits_card: int
    park_id: int
    jwt: str
    
    
class CarPark(BaseModel):
    park_id: int
    state: str
    is_open: bool
    time_start: datetime
    

class Payment(BaseModel):
    payment_id: int
    user_id: int
    fee: int
    time_payment: datetime