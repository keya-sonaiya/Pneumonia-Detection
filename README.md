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

