import os
import urllib

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('.env')

exceeduser = os.getenv('exceeduser')
password = os.getenv('password')

client = MongoClient(f"mongodb://{exceeduser}:{password}@mongo.exceed19.online:8443/?authMechanism=DEFAULT")
db = client['exceed11']