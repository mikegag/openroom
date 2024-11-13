from sqlmodel import SQLModel, create_engine
from sqlalchemy import create_engine

# SQLite database URL
DATABASE_URL = "sqlite:///backend/test.db"  # Change as needed for your path

# Create engine for SQLite
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create tables in the database
def create_db_and_tables():
    SQLModel.metadata.create_all(bind=engine)
