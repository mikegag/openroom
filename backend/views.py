from typing import Optional
from sqlmodel import Session, select
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from datetime import datetime
from typing import List
from backend.models import Application
from backend.database import engine, get_session
from pydantic import BaseModel

router = APIRouter()

# 1. Endpoint to return all existing applications as a list
@router.get("/dashboard/", response_model=List[Application])
def get_all_applications(session: Session = Depends(get_session)) -> List[Optional[Application]]:
    result = session.execute(select(Application)) 
    applications = result.scalars().all()
    return applications

# 2. Endpoint to return a specific application with a matching id
@router.get("/dashboard/view-application/{id}", response_model=Application)
def get_application_by_id(id: int, session: Session = Depends(get_session)):
    application = session.get(Application, id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    return application

# 3. Endpoint to create a new application and set the submitted field with the current date
@router.post("/dashboard/new-application", response_model=Application)
def create_application(application: Application, session: Session = Depends(get_session)):
    # Set the current date in DD-MM-YYYY format for the submitted field
    application.submitted = datetime.now().strftime("%d-%m-%Y")
    session.add(application)
    session.commit()
    session.refresh(application)
    # Return the created application with a 201 Created status
    return JSONResponse(content=application.model_dump(), status_code=201)



'''
(generic notes)
Endpoint Setup:

Use @app.get("/path/") to define the endpoint and specify its URL path.
Set response_model=List[Model] to indicate that the endpoint will return a list of entries in a specified model (Model).
Function Definition:

Name the function descriptively (e.g., get_all_items) to match what the endpoint does.
Dependency Injection:

Use session: Session = Depends(get_session) to create a database session.
Depends(get_session) initializes a new session for each request and closes it when done.
Database Query:

Call session.exec(select(Model)) to select all rows in the table related to Model.
Use .all() to convert query results into a list. If no entries exist, this will be an empty list.
Returning the Result:

return items returns the list of entries.
FastAPI automatically converts the response to JSON format.

Pydantic model for request body validation
class ApplicationCreate(BaseModel):
    firstname: str
    middlename: Optional[str]
    lastname: str
    started: str
    submitted: Optional[str]
    licenseNumber: str
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

'''