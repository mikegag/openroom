from sqlmodel import SQLModel, Field
from typing import Optional

# Application model based on Frontend form
class Application(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    firstname: Optional[str] = Field(default=None) 
    middlename: Optional[str] = Field(default=None)
    lastname: Optional[str] = Field(default=None) 
    started: Optional[str] = Field(default=None) 
    submitted: Optional[str] = Field(default=None)
    licenseNumber: Optional[str] = Field(default=None) 
    dob: Optional[str] = Field(default=None) 
    sex: Optional[str] = Field(default=None) 
    height: Optional[int] = Field(default=None)
    poBox: Optional[str] = Field(default=None)
    unitNumber: Optional[int] = Field(default=None)
    streetNumber: Optional[int] = Field(default=None) 
    streetName: Optional[str] = Field(default=None) 
    city: Optional[str] = Field(default=None) 
    province: Optional[str] = Field(default=None) 
    postalCode: Optional[str] = Field(default=None) 