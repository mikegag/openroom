from typing import Optional
from fastapi import APIRouter
from backend.models import Application
from backend.database import engine
from pydantic import BaseModel

router = APIRouter()

# Pydantic model for request body validation
class ApplicationCreate(BaseModel):
    firstname: str
    middlename: Optional[str]
    lastname: str
    started: str
    submitted: Optional[str]
    licenseNumber: int
    dob: str
    sex: str
    height: int
    poBox: Optional[str]
    unitNumber: Optional[int]
    streetNumber: int
    streetName: str
    city: str
    province: str
    postalCode: str

# API route to create an application
@router.post("/applications/")
async def create_application(app_data: ApplicationCreate):
    db = engine.connect()
    db_app = Application(**app_data.dict())  # Convert Pydantic model to SQLModel
    db.add(db_app)
    db.commit()
    db.refresh(db_app)
    db.close()
    return db_app

# Example route to get all applications
@router.get("/applications/")
async def read_applications():
    with engine.connect() as db:
        apps = db.execute(Application.__table__.select()).fetchall()
    return apps
