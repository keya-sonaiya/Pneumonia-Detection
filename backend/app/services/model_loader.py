# backend/app/services/model_loader.py
import os
from tensorflow import keras

# Build absolute path to model in backend/model/
THIS_DIR = os.path.dirname(os.path.abspath(__file__))      # backend/app/services
BACKEND_DIR = os.path.dirname(os.path.dirname(THIS_DIR))   # backend

MODEL_PATH = os.path.join(BACKEND_DIR, "model", "best_model.h5")
CLASS_NAMES = ["NORMAL", "PNEUMONIA"]

def load_model_and_classes():
    print("📥 Loading trained pneumonia model from:", MODEL_PATH)
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
    model = keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded!")
    return model, CLASS_NAMES
