from typing import Optional
from sqlmodel import Session, select
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from datetime import datetime
from typing import List
from backend.models import Application, PartialApplication
from backend.database import engine, get_session
from pydantic import BaseModel

router = APIRouter()

from pydantic import BaseModel
from typing import Optional

class ApplicationResponse(BaseModel):
    id: int
    firstname: Optional[str] = None 
    middlename: Optional[str] = None
    lastname: Optional[str] = None 
    started: Optional[str] = None 
    submitted: Optional[str] = None
    licenseNumber: Optional[str] = None 
    dob: Optional[str] = None 
    sex: Optional[str] = None 
    height: Optional[int] = None
    poBox: Optional[str] = None
    unitNumber: Optional[int] = None
    streetNumber: Optional[int] = None 
    streetName: Optional[str] = None 
    city: Optional[str] = None 
    province: Optional[str] = None 
    postalCode: Optional[str] = None 

    class Config:
        from_attributes = True

# 1. Endpoint to return all existing applications as a list
@router.get("/dashboard", response_model=List[ApplicationResponse])
def get_all_applications(session: Session = Depends(get_session)) -> List[Optional[ApplicationResponse]]:
    result = session.execute(select(Application)) 
    applications = result.scalars().all()
    partial_result = session.execute(select(PartialApplication))
    partial_applications = partial_result.scalars().all()

    # Combine both lists (applications and partial_applications)
    all_applications = applications + partial_applications

    return all_applications

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

# 4. Endpoint to create a partial application
@router.post("/dashboard/partial-application", response_model=PartialApplication)
def create_application(application: PartialApplication, session: Session = Depends(get_session)):
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

'''