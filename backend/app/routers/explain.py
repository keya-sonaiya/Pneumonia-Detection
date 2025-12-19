# backend/app/routers/explain.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Request
import uuid
import os
import numpy as np

from app.services.preprocess import preprocess_image
from app.services.occlusion import generate_occlusion_map
from app.utils.common import save_numpy_image_as_png

router = APIRouter(prefix="/explain", tags=["Explainability"])

@router.post("/occlusion")
async def occlusion_endpoint(request: Request, file: UploadFile = File(...)):
    try:
        img_bytes = await file.read()
        img_arr = preprocess_image(img_bytes)

        heatmap_rgb = generate_occlusion_map(
            model=request.app.state.model,
            img_array=img_arr
        )

        _, web_path = save_numpy_image_as_png(
            heatmap_rgb,
            prefix="occlusion"
        )

        return {
            "occlusion_image": web_path
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
