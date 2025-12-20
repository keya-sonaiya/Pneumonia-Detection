"use client";

import { useState, useRef, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import PredictionResult from "../components/PredictionResult";
import Loader from "../components/Loader";
import { callPredict, callOcclusion } from "../utils/api";

export default function Page() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [heatmapUrl, setHeatmapUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const overlayRef = useRef(null);

  /* Handle file upload */
  const onFile = (f) => {
    setFile(f);
    setResult(null);
    setHeatmapUrl(null);

    const previewUrl = URL.createObjectURL(f);
    setPreview(previewUrl);
  };

  /* Prediction */
  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const res = await callPredict(file);
      setResult(res);
    } catch (err) {
      alert("Prediction failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  /* Occlusion Heatmap */
  const handleExplain = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const res = await callOcclusion(file);

      if (!res.occlusion_image) {
        alert("Heatmap not returned from backend");
        return;
      }

      // backend returns /static/xxx.png
      setHeatmapUrl(`http://localhost:8000${res.occlusion_image}`);
    } catch (err) {
      alert("Explainability failed: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  /* Clear everything */
  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setHeatmapUrl(null);

    const ctx = overlayRef.current?.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
  };

  /* OVERLAY CANVAS */
  useEffect(() => {
    if (!preview || !heatmapUrl || !overlayRef.current) return;

    const canvas = overlayRef.current;
    const ctx = canvas.getContext("2d");

    const baseImg = new Image();
    const heatImg = new Image();

    baseImg.crossOrigin = "anonymous";
    heatImg.crossOrigin = "anonymous";

    baseImg.src = preview;
    heatImg.src = heatmapUrl;

    baseImg.onload = () => {
      heatImg.onload = () => {
        
        const displayWidth = 400;
        const displayHeight = 320;
        
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        // Calculate scaling to fit image inside canvas while maintaining aspect ratio
        const imgAspect = baseImg.width / baseImg.height;
        const canvasAspect = displayWidth / displayHeight;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgAspect > canvasAspect) {
          // Image is wider - fit to width
          drawWidth = displayWidth;
          drawHeight = displayWidth / imgAspect;
          offsetX = 0;
          offsetY = (displayHeight - drawHeight) / 2;
        } else {
          // Image is taller - fit to height
          drawHeight = displayHeight;
          drawWidth = displayHeight * imgAspect;
          offsetX = (displayWidth - drawWidth) / 2;
          offsetY = 0;
        }

        // Clear canvas
        ctx.clearRect(0, 0, displayWidth, displayHeight);
        
        // Draw original image scaled to fit
        ctx.drawImage(baseImg, offsetX, offsetY, drawWidth, drawHeight);

        // Blend heatmap on top with same scaling
        ctx.globalAlpha = 0.45;
        ctx.drawImage(heatImg, offsetX, offsetY, drawWidth, drawHeight);
        ctx.globalAlpha = 1.0;
      };
    };
  }, [preview, heatmapUrl]);

  return (
    <div className="page-container">
      {/* Upload Section */}
      <div className="card upload-section">
        <h2 className="section-title">Upload & Analyze</h2>
        
        <FileUpload onFile={onFile} fileName={file?.name} />
        
        <div className="button-group">
          <button
            className="btn-primary"
            onClick={handlePredict}
            disabled={!file || loading}
          >
            ⚡ Analyze X-ray
          </button>

          <button
            className="btn-secondary"
            onClick={handleExplain}
            disabled={!file || loading}
          >
            🔬 Generate Heatmap
          </button>

          <button
            className="btn-outline"
            onClick={handleClear}
            disabled={loading}
          >
            ✕ Clear
          </button>
        </div>

        {loading && <Loader />}
      </div>

      {/* Results Section */}
      {result && (
        <div className="card results-section">
          <PredictionResult result={result} />
        </div>
      )}

      {/* Visualization Section */}
      {(preview || heatmapUrl) && (
        <>
          <div className="card visualization-section">
            <h2 className="section-title">Visual Analysis</h2>
            
            <div className="visual-grid-horizontal">
              {/* Original */}
              <div className="visual-item">
                <div className="visual-label">Original Image</div>
                <div className="visual-content">
                  {preview ? (
                    <img src={preview} alt="Original X-ray" />
                  ) : (
                    <div className="empty-state">No image uploaded</div>
                  )}
                </div>
              </div>

              {/* Heatmap */}
              <div className="visual-item">
                <div className="visual-label">Attention Heatmap</div>
                <div className="visual-content">
                  {heatmapUrl ? (
                    <img src={heatmapUrl} alt="Heatmap" />
                  ) : (
                    <div className="empty-state">Generate heatmap</div>
                  )}
                </div>
              </div>

              {/* Overlay */}
              <div className="visual-item">
                <div className="visual-label">Overlay Visualization</div>
                <div className="visual-content">
                  <canvas ref={overlayRef} className="overlay-canvas" />
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Card */}
          {heatmapUrl && (
            <div className="card explain-card">
              <h3>How to read the heatmap</h3>
              <p>
                Warmer colors indicate regions that had a stronger influence on the model's prediction
                when parts of the image were occluded.
              </p>
              <div className="legend">
                <div className="legend-item">
                  <span className="color red"></span> Red / Yellow → High influence
                </div>
                <div className="legend-item">
                  <span className="color green"></span> Green → Moderate influence
                </div>
                <div className="legend-item">
                  <span className="color blue"></span> Blue → Low influence
                </div>
              </div>
              <p className="note">
                This visualization explains model behavior and is not a medical diagnosis.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}