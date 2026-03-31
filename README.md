# 🫁 Pneumonia Detection System with Explainable AI

A deep learning-based web application for pneumonia detection from chest X-ray images.
The system integrates Explainable AI (XAI) using occlusion sensitivity maps to provide visual insights into model predictions. This helps medical professionals understand why the model made a certain prediction by highlighting the areas of the X-ray that contributed most to the decision.

This project follows an end-to-end ML deployment pipeline, featuring a FastAPI backend for inference and a Next.js frontend for interactive visualization, ensuring both performance and transparency.

--- 

## ✨ Features

- DenseNet121-based CNN for pneumonia classification
- Real-time inference via image upload
- Occlusion sensitivity maps for explainability
- FastAPI backend for performant APIs
- Next.js frontend with responsive UI
- Clean REST-based integration between frontend and backend

---
## 📸 Screenshots

### 📤 Upload 
<img src="screenshots/upload.png" width="700"/>

### 📊 Prediction Result
<img src="screenshots/result.png" width="700"/>

### 🔍 Explainability Output
<img src="screenshots/explain.png" width="700"/>

---

## 🛠️ Tech Stack

### 🔹 Machine Learning
- TensorFlow / Keras (model training and inference)
- NumPy (numerical operations)
- OpenCV and Pillow (image processing and occlusion mapping)
- Jupyter Notebook (experimentation)

### 🔹 Backend
- FastAPI (REST API framework)
- Uvicorn (ASGI web server)
- Python 3.10

###  🔹 Frontend
- Next.js 14+
- React 19
- Tailwind CSS

---

## 🏗️ System Architecture

```text
User (Web Browser)
        |
        v
Next.js Frontend (UI components)
        |
        v  REST API (Axios/Fetch)
FastAPI Backend (app/main.py)
        |
        v
Deep Learning Model (model/best_model.h5)
        |
        v
Prediction + Occlusion Sensitivity Map
        |
        v
Frontend Visualization (PredictionResult.js)
```
---

## 📂 Project Structure

```text
Pneumonia-Detection/
├── backend/                  # FastAPI backend
│   ├── app/                  # Application logic
│   │   ├── main.py           # API entry point
│   │   ├── routers/          # API routes (predict, explain)
│   │   ├── services/         # ML logic (model_loader, occlusion, preprocess)
│   │   └── utils/            # Helper functions
│   ├── model/                # Saved models (best_model.h5)
│   ├── notebook/             # Jupyter notebooks for training
│   ├── static/results/       # Generated occlusion maps
│   └── requirements.txt      # Python dependencies
├── frontend/                 # Next.js frontend
│   ├── app/                  # App router (page.js, layout.js, etc.)
│   ├── components/           # UI components (FileUpload, Loader, PredictionResult)
│   ├── public/               # Static assets
│   ├── utils/                # API communication helpers
│   ├── package.json          # Node dependencies
│   └── tailwind.config.js    # Tailwind configuration
├── data/                     # Dataset split
│   ├── train/                # Training images
│   ├── val/                  # Validation images
│   └── test/                 # Testing images
└── README.md                 # Project documentation
```

---

## Model Details 

- Architecture: DenseNet121 (pretrained on ImageNet)
- Training strategy:
  - Stage 1: Base layers frozen, train custom classification head
  - Stage 2: Fine-tune the last DenseNet121 block for domain adaptation
- Input size: 224 x 224 x 3 (RGB)
- Loss function: Binary Cross-Entropy
- Optimizer: Adam

---

### 📊 Performance Metrics (held-out test set)
- Accuracy: ~93%
- Precision (Pneumonia): ~0.92
- Recall (Pneumonia): ~0.97
- F1-score: ~0.94

These metrics indicate strong classification performance with high sensitivity toward pneumonia cases, reducing false negatives.

---

## Dataset

This project uses the Chest X-Ray Images (Pneumonia) dataset.
- Source: Kaggle
- Link: https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia
- Classes: NORMAL, PNEUMONIA

---

## 🔬 Heatmap Explanation

The heatmap visualization is generated using **Occlusion Sensitivity**, a model explainability technique.

It highlights the regions of the X-ray image that most influenced the model’s prediction by systematically masking parts of the image and observing changes in output.

### 🎯 How to interpret the heatmap:
- 🔴 **Red / Yellow regions** → High influence on prediction  
- 🟢 **Green regions** → Moderate influence  
- 🔵 **Blue regions** → Low influence  

The overlay visualization combines the original X-ray with the heatmap to provide better insight into the model’s focus areas.

⚠️ This visualization is intended for interpretability only.

---

## API Endpoints

- GET / : Health check
- POST /predict/ : Accepts a chest X-ray image (multipart/form-data) and returns the classification result (NORMAL or PNEUMONIA) with confidence
- POST /explain/ : Accepts an image, generates an occlusion sensitivity map, and returns the path to the explanatory image

---

## ⚙️ Installation and Setup

Follow the steps below to run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Pneumonia-Detection.git
cd Pneumonia-Detection
```

### 2️⃣ Backend Setup (FastAPI and ML)

Ensure you have Python 3.8+ installed.

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Create a .env file inside the backend directory:

```env
FRONTEND_URL=http://localhost:3000
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend URL: http://localhost:8000

### 3️⃣ Frontend Setup (Next.js)

Ensure you have Node.js 18+ installed.

```bash
# In a new terminal
cd frontend

# Install dependencies
npm install
```

Create a .env.local file inside the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

Frontend URL: http://localhost:3000



