"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  previewUrl: string | null;
}

export default function UploadZone({ onImageSelect, previewUrl }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

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
      style={{
        /* Square: 1:1 aspect ratio so it's always a box */
        aspectRatio: "1 / 1",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        position: "relative",
      }}
      onDrop={onDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
    >
      {/* Hidden file input */}
      <input
        id="cat-image-input"
        type="file"
        accept="image/*"
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) { handleFile(f); e.target.value = ""; }
        }}
      />

      {previewUrl ? (
        /* Preview fills the square */
        <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Your cat"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Overlay button */}
          <label
            htmlFor="cat-image-input"
            style={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              display: "inline-block",
              padding: "8px 20px",
              borderRadius: 99,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-outfit), system-ui, sans-serif",
            }}
          >
            🔄 Change Photo
          </label>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12, animation: "float 3s ease-in-out infinite" }}>🐱</div>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            Drop photo here
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.4 }}>
            or click to browse
          </p>
          <label
            htmlFor="cat-image-input"
            style={{
              display: "inline-block",
              padding: "10px 22px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              color: "var(--text)",
              fontSize: 13,
              fontWeight: 700,
              border: "1px solid var(--border-accent)",
              cursor: "pointer",
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
