from router.model import *
from config.database import db

COLLECTION = db["car_park"]
SEED_DATA = [
    {
        "park_id": 0,
        "state": "empty",
        "is_open": True,
        "time_start": None,
        "time_close": None,
        "is_use_time_close": True,
        "user_id": None,
        "time_reserved": None


    },
    {
        "park_id": 1,
        "state": "empty",
        "is_open": True,
        "time_start": None,
        "time_close": None,
        "is_use_time_close": True,
        "user_id": None,
        "time_reserved": None
    }
]

def main():
    COLLECTION.delete_many({})
    COLLECTION.insert_many(SEED_DATA)
    print("Seed data successfully!")
    
    
if __name__ == "__main__":
    main()