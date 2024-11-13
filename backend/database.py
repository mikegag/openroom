from sqlmodel import SQLModel, create_engine
from sqlalchemy.orm import sessionmaker
from fastapi import Depends

# SQLite database URL
DATABASE_URL = "sqlite:///backend/test.db"

# Create engine for SQLite
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create tables in the database
def create_db_and_tables():
    SQLModel.metadata.create_all(bind=engine)

# Create a session maker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to provide a session to the route
def get_session():
    db = SessionLocal()  # Get a new session
    try:
        yield db  # Return the session to the route function
    finally:
        db.close()  # Close the session after the request is processed
