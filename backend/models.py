from sqlmodel import SQLModel, Field
from typing import Optional

# Application model based on Frontend form
class Application(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    firstname: str
    middlename: Optional[str] = None
    lastname: str
    started: str  
    submitted: Optional[str] = None 
    licenseNumber: int
    dob: str 
    sex: str
    height: int
    poBox: Optional[str] = None
    unitNumber: Optional[int] = None
    streetNumber: int
    streetName: str
    city: str
    province: str
    postalCode: str