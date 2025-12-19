# backend/app/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# paths
THIS_DIR = os.path.dirname(os.path.abspath(__file__))         # backend/app
BACKEND_DIR = os.path.dirname(THIS_DIR)                       # backend
STATIC_RESULTS_DIR = os.path.join(BACKEND_DIR, "static", "results")
os.makedirs(STATIC_RESULTS_DIR, exist_ok=True)

# import model loader and routers (app package)
from app.services.model_loader import load_model_and_classes
from app.routers import predict, explain

app = FastAPI(
    title="Pneumonia Detection API",
    description="Deep Learning Pneumonia Classifier with Occlusion Explainability",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# mount static results directory at /static
app.mount("/static", StaticFiles(directory=STATIC_RESULTS_DIR), name="static")

# Load model
print("🔄 Loading model...")
model, class_names = load_model_and_classes()
app.state.model = model
app.state.class_names = class_names
print("✅ Model loaded successfully!")

# Register routers
app.include_router(predict.router)
app.include_router(explain.router)

@app.get("/")
def root():
    return {"message": "Pneumonia Detection API is running!"}
