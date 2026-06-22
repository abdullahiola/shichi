"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { COSTUMES, type Costume } from "@/lib/costumes";
import GeneratingScreen from "@/components/GeneratingScreen";
import UploadZone from "@/components/UploadZone";

type AppState = "idle" | "generating" | "done" | "error";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function CatGenApp() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeCostume, setActiveCostume] = useState<Costume | null>(null);
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
    if (!imageFile) return;

    // Pick a random costume every time
    const costume = pickRandom(COSTUMES);
    setActiveCostume(costume);
    setAppState("generating");
    setResultUrl(null);
    setErrorMsg(null);
    startProgress();

    try {
      const form = new FormData();
      form.append("image", imageFile);
      form.append("prompt", costume.prompt);
      form.append("costumeId", costume.id);
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
  }, [imageFile, startProgress, stopProgress]);

  const handleDownload = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `shichi-${activeCostume?.id ?? "costume"}-${Date.now()}.png`;
    a.click();
  }, [resultUrl, activeCostume]);

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const canGenerate = !!imageFile && appState !== "generating";

  return (
    <div className="studio-grid">

      {/* ── Left: Upload + Generate ── */}
      <div className="glass-card studio-left">
        <div>
          <p className="studio-step-label">Upload your cat photo</p>
          <UploadZone onImageSelect={handleImageSelect} previewUrl={previewUrl} />
        </div>

        <button
          className="btn-primary"
          disabled={!canGenerate}
          onClick={handleGenerate}
          id="generate-btn"
        >
          {appState === "generating" ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span className="spin">✦</span> Generating...
            </span>
          ) : (
            "✨ Generate Random Costume"
          )}
        </button>

        {appState === "idle" && imageFile && (
          <p style={{ fontSize: 12, color: "var(--text-light)", textAlign: "center" }}>
            A random costume is picked every time 🎲
          </p>
        )}
      </div>

      {/* ── Right: Result ── */}
      <div className="glass-card studio-right">

        {/* Idle */}
        {appState === "idle" && (
          <div className="studio-placeholder">
            <div style={{ fontSize: 56, animation: "float 3s ease-in-out infinite" }}>🎨</div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>
                Your creation appears here
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 240, lineHeight: 1.6, margin: "0 auto" }}>
                Upload a photo, hit generate — a surprise costume is picked for you ✨
              </p>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
              {["🦾 Iron Man", "🍜 Naruto", "⚡ Thor", "🧙 Wizard", "🚀 Astronaut"].map((t) => (
                <span key={t} className="badge badge-gold" style={{ fontSize: 11 }}>{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Generating */}
        {appState === "generating" && activeCostume && (
          <GeneratingScreen
            costumeName={activeCostume.name}
            costumeEmoji={activeCostume.emoji}
            accentColor={activeCostume.accent}
            progress={progress}
          />
        )}

        {/* Error */}
        {appState === "error" && (
          <div className="studio-placeholder fade-in-up">
            <span style={{ fontSize: 48 }}>😿</span>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "#dc2626", marginBottom: 8 }}>
                Something went wrong
              </h3>
              <p style={{
                fontSize: 13, color: "var(--text-muted)",
                padding: "10px 14px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 10, maxWidth: 280, lineHeight: 1.5,
              }}>
                {errorMsg}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <button className="btn-primary" style={{ padding: "11px 22px", fontSize: 14, width: "auto" }} onClick={handleGenerate}>
                🔄 Try Again
              </button>
              <button className="btn-secondary" style={{ padding: "11px 22px", fontSize: 14 }} onClick={() => setAppState("idle")}>
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Done */}
        {appState === "done" && resultUrl && activeCostume && previewUrl && (
          <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
            {/* Costume label */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{activeCostume.emoji}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>
                  {activeCostume.name} Shichi!
                </h3>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>AI generation complete</p>
              </div>
              <span className="badge badge-gold">✓ Done</span>
            </div>

            {/* Before / After */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div className="image-container" style={{ aspectRatio: "1/1" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Original" style={{ objectFit: "cover" }} />
                <span className="image-label">Before</span>
              </div>
              <div className="image-container" style={{ aspectRatio: "1/1" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resultUrl} alt="Result" style={{ objectFit: "cover" }} />
                <span className="image-label">After ✨</span>
              </div>
            </div>

            {/* Full result */}
            <div className="image-container" style={{ flex: 1, minHeight: 180 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultUrl}
                alt={`Shichi as ${activeCostume.name}`}
                style={{ objectFit: "contain", background: "var(--bg-surface)" }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                className="btn-primary"
                style={{ padding: "13px", fontSize: 14, borderRadius: 12 }}
                onClick={handleDownload}
                id="download-btn"
              >
                ⬇️ Download
              </button>
              <button
                className="btn-secondary"
                style={{ padding: "13px", fontSize: 14 }}
                onClick={handleGenerate}
              >
                🎲 Try Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
