export default function PredictionResult({ result }) {
  if (!result) return null;

  const { predicted_class, probability_normal, probability_pneumonia } = result;
  const isPneumonia = predicted_class === "PNEUMONIA";

  return (
    <div className="result-card">
      <h3 className="result-title">🩺 Diagnosis Result</h3>
      
      <div className={`result-main ${isPneumonia ? 'pneumonia' : 'normal'}`}>
        {predicted_class}
      </div>

      <div className="result-stats">
        <div className="result-stat">
          <span className="result-stat-label">Normal</span>
          <span className="result-stat-value">
            {(probability_normal * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="result-stat">
          <span className="result-stat-label">Pneumonia</span>
          <span className="result-stat-value">
            {(probability_pneumonia * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}