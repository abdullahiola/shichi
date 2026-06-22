"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import CatGenApp from "@/components/CatGenApp";

const CONTRACT = "SHiCH1...pump";

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero section" id="hero">
        {/* Cat mascot */}
        <div className="hero-cat-wrap">
          <div className="hero-cat-ring" />
          <div className="hero-cat-ring-2" />
          <Image
            src="/shichi.png"
            alt="Shichi the cat - $SHICHI mascot"
            width={380}
            height={380}
            className="hero-cat"
            priority
          />
          <span className="hero-cat-badge pulse-ring">🚀 To the moon</span>
        </div>

        <div className="hero-badge">🐱 Introducing the next big meme coin</div>

        <h1 className="hero-title">
          Meet Shichi
          <br />
          <span className="hero-ticker">$SHICHI</span>
        </h1>

        <p className="hero-sub">
          The <strong>cutest cat in crypto.</strong> Shichi went from a yellow litter box to the
          blockchain — and she&apos;s bringing her whole army of holders with her. 🌕
        </p>

        <div className="hero-ctas">
          <button className="btn-gold" onClick={scrollToGenerator}>
            🎨 Dress Shichi →
          </button>
          <button className="btn-outline">📊 View Chart</button>
          <button className="btn-outline">🐦 Twitter / X</button>
        </div>

        {/* Live stats bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-value">$0.0042</span>
            <span className="stat-label">Price</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">1B</span>
            <span className="stat-label">Total Supply</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">$4.2M</span>
            <span className="stat-label">Market Cap</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">14.2K</span>
            <span className="stat-label">Holders</span>
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="marquee-wrap section" style={{ position: "relative", zIndex: 1 }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, i) =>
            ["$SHICHI", "🐱", "TO THE MOON", "💜", "COMMUNITY DRIVEN", "⚡", "MEME COIN", "🚀", "BUY NOW", "🌕", "SHICHI IS LIFE", "💎", "HOLD STRONG", "🔥"].map((t, j) => (
              <span key={`${i}-${j}`} className={`marquee-item ${["🐱","💜","⚡","🚀","🌕","💎","🔥"].includes(t) ? "marquee-dot" : ""}`}>{t}</span>
            ))
          )}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="about-section section" id="about">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label">About the project</div>
          <h2 className="section-title">
            Not just a cat.<br />
            <span>A movement.</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              Shichi is a <strong>real fluffy grey-and-white kitten</strong> who became famous for
              standing in her yellow litter box with both paws raised — looking like she owns the
              whole world. Because honestly? She does.
            </p>
            <p>
              <strong>$SHICHI</strong> is a community-driven meme token built on Solana, inspired by
              the most iconic cat pose on the internet. No VCs, no insiders, no pre-mine — just Shichi,
              the blockchain, and an army of degens who believe in a cat.
            </p>
            <p>
              The <strong>CatGen AI Studio</strong> below lets you dress Shichi up in anything —
              Avengers armor, anime uniforms, fantasy robes — and share her with the world. Because
              why hold a boring token when you can hold one with a cat in an Iron Man suit?
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
              <span className="badge badge-gold">✓ Community Owned</span>
              <span className="badge badge-purple">✓ Solana Chain</span>
              <span className="badge badge-cyan">✓ No Presale</span>
              <span className="badge badge-gold">✓ LP Burned</span>
            </div>
          </div>

          <div className="feature-cards">
            {[
              { icon: "🔥", title: "Liquidity Burned", desc: "LP tokens permanently burned. Nobody rugging this ship." },
              { icon: "🐱", title: "Real Cat Mascot", desc: "Shichi is a real cat with a real personality and real paw energy." },
              { icon: "🎨", title: "AI Costume Studio", desc: "Dress Shichi in any costume using AI — the first meme coin with an AI art tool." },
              { icon: "💎", title: "Diamond Paws", desc: "Built for holders. Long-term vision with a community that doesn't sleep." },
              { icon: "🚀", title: "Fair Launch", desc: "No team allocation. No VC bags. 100% community from day one." },
              { icon: "🌕", title: "Moon Roadmap", desc: "CEX listings, merch, IRL Shichi events, and beyond." },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-card-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOKENOMICS ── */}
      <section style={{ position: "relative", zIndex: 1 }} id="tokenomics">
        <div className="tokenomics-section">
          <div className="tokenomics-inner">
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div className="section-label">Token details</div>
              <h2 className="section-title">
                Tokenomics so simple<br />
                <span>even your cat gets it</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
                No funny business. No hidden wallets. Just vibes and cat energy.
              </p>
            </div>

            <div className="tokenomics-grid">
              {[
                { icon: "🏦", value: "1,000,000,000", label: "Total Supply", sub: "One billion $SHICHI tokens" },
                { icon: "🔥", value: "100%", label: "LP Burned", sub: "Liquidity locked forever" },
                { icon: "👥", value: "0%", label: "Team Tokens", sub: "Community owns everything" },
                { icon: "💸", value: "5%", label: "Buy/Sell Tax", sub: "3% marketing · 2% dev" },
              ].map((t) => (
                <div key={t.label} className="token-card">
                  <div className="token-card-icon">{t.icon}</div>
                  <span className="token-card-value">{t.value}</span>
                  <span className="token-card-label">{t.label}</span>
                  <p className="token-card-sub">{t.sub}</p>
                </div>
              ))}
            </div>

            {/* Contract */}
            <div className="contract-box">
              <span className="contract-label">CA</span>
              <span className="contract-addr" title={CONTRACT}>{CONTRACT}</span>
              <button className="contract-copy" onClick={copy} id="copy-contract-btn">
                {copied ? "✓ Copied" : "📋 Copy"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY ── */}
      <section className="community-section section" id="community">
        <div className="section-label">Join the army</div>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          The Shichi Army is<br />
          <span>waiting for you 🐾</span>
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 440, margin: "16px auto 0" }}>
          Join tens of thousands of holders who believe in the power of a fluffy cat with her paws up.
        </p>

        <div className="social-cards">
          {[
            { icon: "🐦", name: "Twitter / X", handle: "@ShichiToken", href: "#" },
            { icon: "💬", name: "Telegram", handle: "t.me/ShichiToken", href: "#" },
            { icon: "🎮", name: "Discord", handle: "discord.gg/shichi", href: "#" },
            { icon: "📊", name: "DexScreener", handle: "Chart →", href: "#" },
          ].map((s) => (
            <a key={s.name} href={s.href} className="social-card">
              <span className="social-icon">{s.icon}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.handle}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Meme placeholder */}
        <div
          style={{
            marginTop: 60,
            padding: "40px",
            background: "rgba(245,158,11,0.04)",
            border: "1px solid rgba(245,158,11,0.15)",
            borderRadius: 20,
            textAlign: "center",
            maxWidth: 600,
            margin: "60px auto 0",
          }}
        >
          <p style={{ fontSize: 48, marginBottom: 12 }}>😹</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: "var(--gold-light)", marginBottom: 8 }}>
            &ldquo;I don&apos;t always hold meme coins...&rdquo;
          </p>
          <p style={{ fontSize: 16, color: "var(--text-muted)" }}>
            &ldquo;...but when I do, I hold $SHICHI&rdquo;
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <span className="badge badge-gold">🐱 Shichi Approved</span>
            <span className="badge badge-purple">💜 Community Meme</span>
          </div>
        </div>
      </section>

      {/* ── GENERATOR ── */}
      <section style={{ position: "relative", zIndex: 1 }} id="generator">
        <div className="generator-section">
          <div className="generator-inner">
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label">AI-Powered Studio</div>
              <h2 className="section-title">
                Dress Shichi in<br />
                <span>any costume 🎭</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 480, margin: "12px auto 0" }}>
                Upload a photo of your cat (or Shichi!) and transform them into Iron Man, Naruto,
                a Jedi Master — over 20 costumes powered by Stable Diffusion XL.
              </p>
            </div>

            <CatGenApp />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer section">
        <p style={{ fontSize: 20, marginBottom: 12 }}>🐱</p>
        <p>
          <strong>$SHICHI</strong> — The cat that raised her paws and went to the moon.
        </p>
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.5 }}>
          © 2024 $SHICHI · Not financial advice · Always DYOR · Shichi is a real cat and she is perfect.
        </p>
      </footer>
    </>
  );
}
