import os
from tensorflow import keras
from dotenv import load_dotenv

load_dotenv()

MODEL_PATH = os.getenv("MODEL_PATH")
CLASS_NAMES = ["NORMAL", "PNEUMONIA"]

def load_model_and_classes():
    if not MODEL_PATH or not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

    print(f"📥 Loading trained pneumonia model from: {MODEL_PATH}")
    model = keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded!")
    return model, CLASS_NAMES