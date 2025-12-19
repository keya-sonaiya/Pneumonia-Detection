# backend/app/routers/predict.py
from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from app.services.preprocess import preprocess_image
from app.services.prediction import predict_image

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
async def predict_endpoint(request: Request, file: UploadFile = File(...)):
    try:
        img_bytes = await file.read()
        img_arr = preprocess_image(img_bytes)

        predicted_class, prob_normal, prob_pneumonia = predict_image(
            model=request.app.state.model,
            img_array=img_arr,
            class_names=request.app.state.class_names
        )

        # return both structured dict and easy-to-read floats
        return {
            "filename": file.filename,
            "predicted_class": predicted_class,
            "probability_normal": float(prob_normal),
            "probability_pneumonia": float(prob_pneumonia),
            "probabilities": {
                "NORMAL": float(prob_normal),
                "PNEUMONIA": float(prob_pneumonia)
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
