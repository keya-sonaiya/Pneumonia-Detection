import numpy as np
from PIL import Image
import io

def preprocess_image(img_bytes, target_size=(224, 224)):
    """
    Convert raw uploaded image bytes → normalized numpy array (1,224,224,3)
    """

    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize(target_size)

    img_arr = np.array(img).astype("float32") / 255.0
    img_arr = np.expand_dims(img_arr, axis=0)

    return img_arr
