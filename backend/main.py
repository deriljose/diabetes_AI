from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib  # Add this import
import warnings
import traceback

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to ["http://localhost:5173"] to restrict to your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Try to load your model and scaler, handle errors gracefully
model = None
scaler = None
load_error = None
try:
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        model = joblib.load("diabetes_model.joblib")  # Changed from .pkl to .joblib
    scaler = joblib.load("scaler.joblib")  # Changed from .pkl to .joblib
except Exception as e:
    load_error = str(e)
    print(f"Model/scaler load error: {load_error}")  # Print error for debugging

# Define the expected input data structure
class DiabetesInput(BaseModel):
    pregnancies: int
    glucose: float
    blood_pressure: float
    skin_thickness: float
    insulin: float
    bmi: float
    diabetes_pedigree: float
    age: int

@app.post("/predict")
def predict(data: DiabetesInput):
    if load_error is not None:
        print(f"Model load error: {load_error}")  # Debug print
        raise HTTPException(status_code=500, detail=f"Model load error: {load_error}")
    try:
        X = np.array([[data.pregnancies, data.glucose, data.blood_pressure, data.skin_thickness,
                       data.insulin, data.bmi, data.diabetes_pedigree, data.age]])
        print(f"Input: {X}")  # Debug print
        X_scaled = scaler.transform(X)
        print(f"Scaled: {X_scaled}")  # Debug print
        prediction = model.predict(X_scaled)[0]
        print(f"Prediction: {prediction}")  # Debug print
        result = "Diabetic" if prediction == 1 else "Not Diabetic"
        return {"result": result}
    except Exception as e:
        tb = traceback.format_exc()
        print(f"Prediction error: {e}\n{tb}")  # Debug print
        raise HTTPException(status_code=500, detail=f"{e}\n{tb}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)