"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { type Costume } from "@/lib/costumes";
import CostumePicker from "@/components/CostumePicker";
import UploadZone from "@/components/UploadZone";
import GeneratingScreen from "@/components/GeneratingScreen";

type AppState = "idle" | "generating" | "done" | "error";

export default function CatGenApp() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedCostume, setSelectedCostume] = useState<Costume | null>(null);
  const [appState, setAppState] = useState<AppState>("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleImageSelect = useCallback((file: File, url: string) => {
    setImageFile(file);
    setPreviewUrl(url);
    setResultUrl(null);
    setAppState("idle");
    setErrorMsg(null);
  }, []);

  const startProgress = useCallback(() => {
    setProgress(0);
    let v = 0;
    progressRef.current = setInterval(() => {
      v += Math.random() * 2.2;
      if (v >= 92) { v = 92; clearInterval(progressRef.current!); }
      setProgress(v);
    }, 600);
  }, []);

  const stopProgress = useCallback((ok: boolean) => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(ok ? 100 : 0);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!imageFile || !selectedCostume) return;
    setAppState("generating");
    setResultUrl(null);
    setErrorMsg(null);
    startProgress();
    try {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("prompt", selectedCostume.prompt);
      form.append("costumeId", selectedCostume.id);
      const res = await fetch("/api/generate", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Generation failed");
      stopProgress(true);
      setResultUrl(data.imageUrl);
      setAppState("done");
    } catch (err) {
      stopProgress(false);
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setAppState("error");
    }
  }, [imageFile, selectedCostume, startProgress, stopProgress]);

  const handleDownload = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `shichi-${selectedCostume?.id ?? "costume"}-${Date.now()}.png`;
    a.click();
  }, [resultUrl, selectedCostume]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const canGenerate = !!imageFile && !!selectedCostume && appState !== "generating";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 24,
        alignItems: "start",
      }}
    >
      {/* ── Grid 1: Controls ── */}
      <div className="glass-card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Upload */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 12 }}>
            01 — Upload Photo
          </p>
          <UploadZone onImageSelect={handleImageSelect} previewUrl={previewUrl} />
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)" }} />

        {/* Costume picker */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 12 }}>
            02 — Pick Costume
          </p>
          <CostumePicker selected={selectedCostume} onSelect={setSelectedCostume} />
        </div>

        {/* Generate button */}
        <button
          className="btn-primary"
          disabled={!canGenerate}
          onClick={handleGenerate}
          id="generate-btn"
        >
          {appState === "generating" ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span className="spin">⚙️</span> Generating...
            </span>
          ) : (
            "✨ Generate Costume"
          )}
        </button>
      </div>

      {/* ── Grid 2: Result ── */}
      <div className="glass-card" style={{ padding: 28, minHeight: 560 }}>

        {/* Idle */}
        {appState === "idle" && (
          <div style={{ height: "100%", minHeight: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center" }}>
            <div style={{ fontSize: 72, animation: "float 3s ease-in-out infinite" }}>🎨</div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 10 }}>
                Your creation appears here
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 260, lineHeight: 1.6 }}>
                Upload a cat photo, pick a costume, hit generate ✨
              </p>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
              {["🦾 Iron Man", "🍜 Naruto", "⚡ Thor", "🧙 Wizard"].map((t) => (
                <span key={t} className="badge badge-purple">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Generating */}
        {appState === "generating" && selectedCostume && (
          <GeneratingScreen
            costumeName={selectedCostume.name}
            costumeEmoji={selectedCostume.emoji}
            accentColor={selectedCostume.accent}
            progress={progress}
          />
        )}

        {/* Error */}
        {appState === "error" && (
          <div className="fade-in-up" style={{ height: "100%", minHeight: 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center" }}>
            <span style={{ fontSize: 56 }}>😿</span>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#f87171", marginBottom: 10 }}>Something went wrong</h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", padding: "10px 16px", background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, maxWidth: 300 }}>
                {errorMsg}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ padding: "12px 24px", fontSize: 14 }} onClick={handleGenerate}>🔄 Retry</button>
              <button className="btn-secondary" style={{ padding: "12px 24px", fontSize: 14 }} onClick={() => setAppState("idle")}>Reset</button>
            </div>
          </div>
        )}

        {/* Done */}
        {appState === "done" && resultUrl && selectedCostume && previewUrl && (
          <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{selectedCostume.emoji}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>{selectedCostume.name} Shichi!</h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>AI generation complete</p>
              </div>
              <span className="badge badge-gold">✓ Done</span>
            </div>

            {/* Before / After */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div className="image-container" style={{ height: 200 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Original" style={{ objectFit: "cover" }} />
                <span className="image-label">Before</span>
              </div>
              <div className="image-container" style={{ height: 200 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultUrl} alt="Result" style={{ objectFit: "cover" }} />
                <span className="image-label">After ✨</span>
              </div>
            </div>

            {/* Full result */}
            <div className="image-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resultUrl} alt={`Shichi as ${selectedCostume.name}`} style={{ maxHeight: 320, objectFit: "contain", background: "rgba(0,0,0,0.4)" }} />
            </div>

            {/* Actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button className="btn-gold" style={{ padding: "13px", fontSize: 15, borderRadius: 12 }} onClick={handleDownload} id="download-btn">
                ⬇️ Download
              </button>
              <button className="btn-secondary" style={{ padding: "13px", fontSize: 15 }} onClick={() => { setAppState("idle"); setResultUrl(null); }}>
                🎭 Try Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
