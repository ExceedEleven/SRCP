from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from router import parking
from config.database import db

origins = ['*']

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(parking.router)

@app.get("/")
def root():
    return {"msg": "Connect!"}
