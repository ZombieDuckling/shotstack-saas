import { useState, useRef } from 'react';
import './UploadForm.css';

interface UploadFormProps {
  onUpload: (file: File) => void;
}

export function UploadForm({ onUpload }: UploadFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    } else if (file) {
      setError('Please drop an image file (PNG, JPG, GIF, etc.)');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (inputRef.current?.files?.[0]) {
      onUpload(inputRef.current.files[0]);
      setPreview(null);
      setFileName('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="upload-form">
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''} ${error ? 'has-error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Upload screenshots. Click or press Enter to browse."
        aria-invalid={error ? 'true' : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          hidden
        />
        {error ? (
          <div className="upload-content">
            <svg className="upload-icon error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="upload-text error-text">{error}</p>
          </div>
        ) : preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <p className="file-name">{fileName}</p>
          </div>
        ) : (
          <div className="upload-content">
            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="upload-text">Drag and drop an image here</p>
            <p className="upload-subtext">or click to browse</p>
          </div>
        )}
      </div>
      {preview && (
        <button className="upload-button" onClick={(e) => { e.stopPropagation(); handleUpload(); }}>
          Upload Screenshot
        </button>
      )}
    </div>
  );
}
