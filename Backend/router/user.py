from fastapi import APIRouter, Body, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from config.database import db
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

load_dotenv(".env")

SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM=os.getenv("ALGORITHM")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


COLLECTION_USER = db["parking_user"]

router = APIRouter(prefix="/user",
                   tags=["user"])


@router.get("", status_code=200)
def get_user(token: str = Body(embed=True)):
    user = list(COLLECTION_USER.find({"jwt": token}))
    if len(user) == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"result": {
        "park_id": user[0]["park_id"],
    }}

# # optional # split password and credit card
# @router.put("/update", status_code=200)
# def update_user(token: str = Body(), credit_card: str = Body()):
#     return
#     user = list(COLLECTION_USER.find({"jwt": token}))
#     if len(user) == 0:
#         raise HTTPException(status_code=404, detail="User not found")
#     pass
#
    
@router.post("/signin", status_code=200)
def signin(username: str = Body(), password: str = Body()):
    user = list(COLLECTION_USER.find({"username": username}))
    if len(user) == 0 or not pwd_context.verify(password, user[0]["password"]):
        raise HTTPException(status_code=404, detail="Username or password is incorrect")
    
    content = {"result": "success",
               "jwt": user[0]["jwt"]}
    
    response = JSONResponse(content=content)
    response.set_cookie(key="jwt", value=user[0]["jwt"])
    
    return response


@router.post("/signup", status_code=200)
def signup(username: str = Body(), password: str = Body(), credits_card: str = Body()):
    if username == password:
        raise HTTPException(status_code=404, detail="Username and password must be different")
    
    other_user = list(COLLECTION_USER.find({"username": username}))
    if len(other_user) != 0:
        raise HTTPException(status_code=404, detail="Username already exists")
    
    password_hash = pwd_context.hash(password)
    
    token = jwt.encode({"username": username}, SECRET_KEY, algorithm=ALGORITHM)
    
    COLLECTION_USER.insert_one({"jwt": token,
                                "username": username,
                                "password": password_hash,
                                "credit_card": credits_card,
                                "park_id": "-1"})
    
    content = {"result": "success"}
    
    response = JSONResponse(content=content)
    response.set_cookie(key="jwt", value=token)
    
    return response