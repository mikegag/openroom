from fastapi import FastAPI
from backend.database import create_db_and_tables
from backend.views import router 

app = FastAPI()

# Run the database setup at app startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Include the routes from views.py
app.include_router(router)
