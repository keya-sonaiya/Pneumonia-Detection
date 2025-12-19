import os
import uuid
import cv2
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
STATIC_RESULTS_DIR = os.path.join(BASE_DIR, "static", "results")


os.makedirs(STATIC_RESULTS_DIR, exist_ok=True)

def save_numpy_image_as_png(img_rgb: np.ndarray, prefix="image"):
    filename = f"{prefix}_{uuid.uuid4().hex}.png"
    save_path = os.path.join(STATIC_RESULTS_DIR, filename)

    cv2.imwrite(save_path, cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR))

    web_path = f"/static/{filename}"
    return save_path, web_path
