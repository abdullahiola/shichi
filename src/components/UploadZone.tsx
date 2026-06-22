"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  previewUrl: string | null;
}

export default function UploadZone({ onImageSelect, previewUrl }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const url = URL.createObjectURL(file);
      onImageSelect(file, url);
    },
    [onImageSelect]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      className={`drop-zone ${isDragging ? "dragover" : ""}`}
      style={{ minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
    >
      {/* Hidden native file input — triggered by the label below */}
      <input
        ref={inputRef}
        id="cat-image-input"
        type="file"
        accept="image/*"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            handleFile(f);
            // reset so same file can be re-selected
            e.target.value = "";
          }
        }}
      />

      {previewUrl ? (
        <div style={{ width: "100%" }}>
          <div className="image-container" style={{ height: 200, marginBottom: 10 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Your cat" style={{ objectFit: "contain", background: "rgba(0,0,0,0.4)" }} />
            <span className="image-label">Original</span>
          </div>
          {/* Use a label — guaranteed to open file picker cross-browser */}
          <label
            htmlFor="cat-image-input"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              textAlign: "center",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              background: "rgba(255,255,255,0.05)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              transition: "all 0.2s",
              fontFamily: "var(--font-outfit), system-ui, sans-serif",
            }}
          >
            🔄 Change Photo
          </label>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 56, marginBottom: 16, animation: "float 3s ease-in-out infinite", display: "block", lineHeight: 1 }}>
            🐱
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            Drop your cat photo here
          </p>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>
            or click to browse · PNG, JPG, WEBP
          </p>
          {/* Label is the most reliable way to trigger file input */}
          <label
            htmlFor="cat-image-input"
            style={{
              display: "inline-block",
              padding: "11px 28px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.04)",
              color: "var(--text)",
              fontSize: 14,
              fontWeight: 700,
              border: "1px solid var(--border-accent)",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "var(--font-outfit), system-ui, sans-serif",
            }}
          >
            📂 Choose Photo
          </label>
        </div>
      )}
    </div>
  );
}
