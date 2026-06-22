"use client";

import { useState } from "react";
import { COSTUMES, COSTUME_CATEGORIES, type Costume } from "@/lib/costumes";

interface CostumePickerProps {
  selected: Costume | null;
  onSelect: (costume: Costume) => void;
}

export default function CostumePicker({ selected, onSelect }: CostumePickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered =
    activeCategory === "all"
      ? COSTUMES
      : COSTUMES.filter((c) => c.category === activeCategory);

  return (
    <div>
      {/* Category tabs */}
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 20,
          padding: "4px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 12,
          border: "1px solid var(--border)",
        }}
      >
        {COSTUME_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`tab-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: 10,
          maxHeight: 420,
          overflowY: "auto",
          paddingRight: 4,
        }}
      >
        {filtered.map((costume) => (
          <button
            key={costume.id}
            className={`costume-card ${selected?.id === costume.id ? "selected" : ""}`}
            style={{ padding: "14px 10px", textAlign: "center", width: "100%" }}
            onClick={() => onSelect(costume)}
            id={`costume-${costume.id}`}
          >
            {/* Color dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: costume.accent,
                margin: "0 auto 8px",
                boxShadow: `0 0 8px ${costume.accent}80`,
              }}
            />
            <div style={{ fontSize: 30, marginBottom: 8, lineHeight: 1 }}>
              {costume.emoji}
            </div>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: 4,
                lineHeight: 1.2,
              }}
            >
              {costume.name}
            </p>
            <p
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                lineHeight: 1.3,
              }}
            >
              {costume.description}
            </p>
          </button>
        ))}
      </div>

      {/* Selected info strip */}
      {selected && (
        <div
          className="fade-in-up"
          style={{
            marginTop: 16,
            padding: "12px 16px",
            borderRadius: 12,
            background: `rgba(${hexToRgb(selected.accent)}, 0.08)`,
            border: `1px solid ${selected.accent}40`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 22 }}>{selected.emoji}</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
              {selected.name} selected
            </p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              {selected.description}
            </p>
          </div>
          <span
            className="badge badge-purple"
            style={{ marginLeft: "auto", fontSize: 11 }}
          >
            {selected.category}
          </span>
        </div>
      )}
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "139, 92, 246";
}
