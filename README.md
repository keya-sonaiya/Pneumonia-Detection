# 🫁 Pneumonia Detection System with Explainable AI

A deep learning–based web application for **pneumonia detection from chest X-ray images**.  
The system integrates **Explainable AI (XAI)** using **occlusion sensitivity maps** to provide visual insights into model predictions.

This project follows an **end-to-end ML deployment pipeline**, featuring a **FastAPI backend** for inference and a **Next.js frontend** for interactive visualization, ensuring both performance and transparency.


## 🚀 Features

- 🧠 DenseNet121-based CNN for pneumonia classification from chest X-ray images  
- 🩻 Supports real-time image upload and prediction  
- 🔍 Explainable AI using occlusion sensitivity maps  
- 📊 Visual interpretation of model decisions  
- ⚡ Fast and lightweight FastAPI backend  
- 🌐 Modern and responsive Next.js frontend  
- 🔐 Clean API-based communication between frontend and backend  


## 🧪 Model Details

- **Architecture**: DenseNet121 (pretrained on ImageNet)

- **Training Strategy**:
  - **Stage 1**: Base DenseNet121 layers frozen, training only the custom classification head
  - **Stage 2**: Fine-tuning of the last DenseNet121 layers for improved domain adaptation

- **Input Size**: 224 × 224 × 3 (RGB)

- **Loss Function**: Binary Cross-Entropy

- **Optimizer**: Adam

- **Task**: Binary Classification  
  - Normal  
  - Pneumonia

- **Explainability Method**: Occlusion Sensitivity (patch-based masking to analyze prediction influence)


## 📈 Performance

The model was evaluated on a held-out test dataset to measure generalization performance.

- **Accuracy**: ~93%
- **Precision (Pneumonia)**: ~0.92
- **Recall (Pneumonia)**: ~0.97
- **F1-score**: ~0.94

These results indicate strong classification performance with high sensitivity toward pneumonia cases.


## 🛠️ Tech Stack

### 🔹 Machine Learning
- TensorFlow / Keras  
- NumPy  
- OpenCV  

### 🔹 Backend
- FastAPI  
- Uvicorn  

### 🔹 Frontend
- Next.js  
- Tailwind CSS  


## ⚙️ Installation & Setup

Follow the steps below to run the project locally.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/keya-sonaiya/Pneumonia-Detection
cd Pneumonia-Detection
```

### 2️⃣ Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend will be available at:
```bash
http://localhost:8000
```

Create a `.env` file inside the `backend` directory:
```env
FRONTEND_URL=http://localhost:3000
```


### 3️⃣ Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the frontend development server:
````bash
npm run dev
```

The frontend will be available at:
```bash
http://localhost:3000
```

## 🏗️ System Architecture

The application is designed using a modular client–server architecture that separates model inference from user interaction.

```text
User (Web Browser)
        ↓
Next.js Frontend
        ↓  (REST API)
FastAPI Backend
        ↓
Deep Learning Model (CNN)
        ↓
Prediction + Occlusion Sensitivity Map
        ↓
Frontend Visualization
