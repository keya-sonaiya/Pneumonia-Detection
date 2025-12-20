"use client";

import { useState } from "react";

export default function FileUpload({ onFile, fileName }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFile(file);
    }
  };

  return (
    <div>
      <label className="upload-label" htmlFor="file-input">
        Chest X-ray Image
      </label>
      
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      
      <label 
        htmlFor="file-input" 
        className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="file-upload-icon">📁</div>
        <div className="file-upload-text">
          {fileName || "Click to upload or drag and drop"}
        </div>
        <div className="file-upload-hint">
          PNG, JPG or JPEG (max 10MB)
        </div>
      </label>
    </div>
  );
}