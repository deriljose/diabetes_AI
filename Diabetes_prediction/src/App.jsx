import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    pregnancies: "",
    glucose: "",
    blood_pressure: "",
    skin_thickness: "",
    insulin: "",
    bmi: "",
    diabetes_pedigree: "",
    age: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregnancies: Number(form.pregnancies),
          glucose: Number(form.glucose),
          blood_pressure: Number(form.blood_pressure),
          skin_thickness: Number(form.skin_thickness),
          insulin: Number(form.insulin),
          bmi: Number(form.bmi),
          diabetes_pedigree: Number(form.diabetes_pedigree),
          age: Number(form.age),
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Prediction failed");
      }
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="root">
      <h1>Diabetes Prediction</h1>
      <form onSubmit={handleSubmit} className="card">
        <div>
          <label>
            Pregnancies:
            <input
              type="number"
              name="pregnancies"
              value={form.pregnancies}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Glucose:
            <input
              type="number"
              name="glucose"
              value={form.glucose}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Blood Pressure:
            <input
              type="number"
              name="blood_pressure"
              value={form.blood_pressure}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Skin Thickness:
            <input
              type="number"
              name="skin_thickness"
              value={form.skin_thickness}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Insulin:
            <input
              type="number"
              name="insulin"
              value={form.insulin}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            BMI:
            <input
              type="number"
              step="any"
              name="bmi"
              value={form.bmi}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Diabetes Pedigree:
            <input
              type="number"
              step="any"
              name="diabetes_pedigree"
              value={form.diabetes_pedigree}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>
      {result && (
        <div className="result">
          <h2>Result: {result}</h2>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default App;
