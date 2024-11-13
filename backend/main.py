from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from backend.database import create_db_and_tables
from backend.views import router

app = FastAPI()

# Run the database setup at app startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Define allowed origins (set to "*" for any domain)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# Add CORS middleware to the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include the routes from views.py
app.include_router(router)
