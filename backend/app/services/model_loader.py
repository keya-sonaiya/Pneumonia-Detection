import os
from tensorflow import keras

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# BASE_DIR = /opt/render/project/src/backend

MODEL_PATH = os.getenv(
    "MODEL_PATH",
    os.path.join(BASE_DIR, "model", "best_model.h5")
)

CLASS_NAMES = ["NORMAL", "PNEUMONIA"]

def load_model_and_classes():
    print(f"📥 Loading trained pneumonia model from: {MODEL_PATH}")

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

    model = keras.models.load_model(MODEL_PATH)
    print("✅ Model loaded!")
    return model, CLASS_NAMES
