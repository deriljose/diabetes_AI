# Diabetes Prediction Web App

A full-stack machine learning web application for predicting diabetes using FastAPI (Python backend) and React (frontend). The backend serves a trained XGBoost model and scaler for inference.

---

## Features

- **Frontend:** React + Vite for a fast, modern UI.
- **Backend:** FastAPI for REST API, CORS enabled.
- **Model:** XGBoost classifier, input scaling.
- **Prediction:** Returns "Diabetic" or "Not Diabetic" based on user input.

---


## Getting Started

### Backend (FastAPI)

1. **Install dependencies:**
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

2. **Run the API server:**
    ```sh
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Frontend (React + Vite)

1. **Install dependencies:**
    ```sh
    cd diabetes_AI/Diabetes_prediction
    npm install
    ```

2. **Start the development server:**
    ```sh
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

---

## API Endpoint

- **POST** `/predict`
    - **Request Body:**  
      ```json
      {
        "pregnancies": int,
        "glucose": float,
        "blood_pressure": float,
        "skin_thickness": float,
        "insulin": float,
        "bmi": float,
        "diabetes_pedigree": float,
        "age": int
      }
      ```
    - **Response:**  
      ```json
      { "result": "Diabetic" | "Not Diabetic" }
      ```
