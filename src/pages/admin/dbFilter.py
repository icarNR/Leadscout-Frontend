from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
import urllib
from typing import List

app = FastAPI()

# Connect to MongoDB
client = MongoClient("mongodb+srv://suu:"+ urllib.parse.quote("my123") +"@uom.ainomx2.mongodb.net/?retryWrites=true&w=majority&appName=UoM")
db = client['employee']
leadership_collection = db['leadership']


# CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model for Leadership data
class Leadership(BaseModel):
    picture: str
    name: str
    id: str
    currentPosition: str
    potential: str
    competency: str
    skills:str
    
# Route to get leadership data
@app.get("/src/component/admin/LeadershipTable/", response_model=List[Leadership])
async def get_leadership_data(skill: str = None):
    try:
        # If skill filter criteria is provided, filter data based on it
        if skill:
            # Use $regex to perform a case-insensitive search for the skill in the 'skills' field
            leadership_data = list(leadership_collection.find({'skills': {'$regex': f'{skill}', '$options': 'i'}}))
        else:
            # If no skill filter criteria provided, return all data
            leadership_data = list(leadership_collection.find())
            
        return leadership_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
