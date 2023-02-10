from router.model import *
from config.database import db

COLLECTION = db["car_park"]
SEED_DATA = [
    {
        "park_id": 0,
        "state": "empty",
        "is_open": True,
        "time_start": None
    },
    {
        "park_id": 1,
        "state": "empty",
        "is_open": True,
        "time_start": None
    }
]

def main():
    COLLECTION.delete_many({})
    COLLECTION.insert_many(SEED_DATA)
    print("Seed data successfully!")
    
    
if __name__ == "__main__":
    main()