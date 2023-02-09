from pydantic import BaseModel
from datetime import datetime


class User(BaseModel):
    # user id from database
    jwt: str
    username: str
    password: str
    credits_card: str
    park_id: str
    time_reserverd: datetime
    
    
class CarPark(BaseModel):
    park_id: str
    state: str
    is_open: bool
    time_start: datetime
    time_close: datetime
    is_use_time_close: bool
    user_id: str
    time_reserved: datetime
    

class Payment(BaseModel):
    # payment_id from database
    user_id: str
    fee: int
    time_payment: datetime