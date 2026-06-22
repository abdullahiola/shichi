"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  { label: "Uploading image", duration: 2000 },
  { label: "Analyzing your cat", duration: 3000 },
  { label: "Applying costume", duration: 8000 },
  { label: "Rendering details", duration: 6000 },
  { label: "Almost ready...", duration: 5000 },
];

interface GeneratingScreenProps {
  costumeName: string;
  costumeEmoji: string;
  accentColor: string;
  progress: number;
}

export default function GeneratingScreen({
  costumeName,
  costumeEmoji,
  accentColor,
  progress,
}: GeneratingScreenProps) {
  const stepIndex = Math.min(
    Math.floor((progress / 100) * STEPS.length),
    STEPS.length - 1
  );
  const currentStep = STEPS[stepIndex];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 280;
    canvas.height = 280;

    let frame = 0;
    const particles: { x: number; y: number; vx: number; vy: number; life: number; size: number; color: string }[] = [];

    const colors = [accentColor, "#8b5cf6", "#06b6d4", "#f59e0b"];

    const addParticle = () => {
      particles.push({
        x: 140 + (Math.random() - 0.5) * 80,
        y: 140 + (Math.random() - 0.5) * 80,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        life: 1,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, 280, 280);

      // Draw spinning ring
      ctx.save();
      ctx.translate(140, 140);
      ctx.rotate((frame * Math.PI) / 90);
      ctx.strokeStyle = accentColor + "60";
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, 90, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Second ring counter-rotating
      ctx.save();
      ctx.translate(140, 140);
      ctx.rotate((-frame * Math.PI) / 60);
      ctx.strokeStyle = "#8b5cf6" + "40";
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 20]);
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Glow center
      const grad = ctx.createRadialGradient(140, 140, 0, 140, 140, 50);
      grad.addColorStop(0, accentColor + "30");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(140, 140, 50, 0, Math.PI * 2);
      ctx.fill();

      // Particles
      if (frame % 3 === 0) addParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      frame++;
    };

    const id = setInterval(animate, 1000 / 60);
    return () => clearInterval(id);
  }, [accentColor]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        gap: 24,
      }}
    >
      {/* Canvas animation */}
      <div style={{ position: "relative" }}>
        <canvas ref={canvasRef} style={{ display: "block" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 48 }}>{costumeEmoji}</span>
          <span style={{ fontSize: 24 }}>🐱</span>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <h3
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          Dressing your cat as {costumeName}
        </h3>
        <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          {currentStep.label}...
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: 320 }}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${accentColor}, #8b5cf6)`,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            fontSize: 12,
            color: "var(--text-secondary)",
          }}
        >
          <span>{currentStep.label}</span>
          <span style={{ color: accentColor, fontWeight: 700 }}>
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              width: i === stepIndex ? 24 : 8,
              height: 8,
              borderRadius: 99,
              background:
                i < stepIndex
                  ? accentColor
                  : i === stepIndex
                  ? `linear-gradient(90deg, ${accentColor}, #8b5cf6)`
                  : "rgba(255,255,255,0.1)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--text-secondary)",
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        This usually takes 20–40 seconds · AI magic in progress ✨
      </p>
    </div>
  );
}
