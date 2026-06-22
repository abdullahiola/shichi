"use client";
import { useState } from "react";

export default function Navbar() {
  const [copied, setCopied] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <a className="nav-logo" href="#">
        🐱 $SHICHI
      </a>
      <div className="nav-links">
        <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
        <button className="nav-link" onClick={() => scrollTo("tokenomics")}>Tokenomics</button>
        <button className="nav-link" onClick={() => scrollTo("community")}>Community</button>
        <button className="nav-link" onClick={() => scrollTo("generator")}>Dress Shichi</button>
        <button
          className="btn-nav"
          onClick={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? "✓ Copied!" : "Buy $SHICHI"}
        </button>
      </div>
    </nav>
  );
}
