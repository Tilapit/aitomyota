import React, { useEffect, useState } from "react";
import Logo from "./Logo";

interface NavbarProps {
  onOpenQuiz: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 60px",
        background: scrolled ? "rgba(250,246,240,0.95)" : "rgba(250,246,240,0.15)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(196,103,74,0.1)"
          : "1px solid rgba(250,246,240,0.2)",
        transition: "background 0.4s",
      }}
    >
      <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        <Logo />
      </a>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "32px",
          alignItems: "center",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <a
            href="#how"
            style={{
              textDecoration: "none",
              color: "var(--ink)",
              fontSize: "14px",
              fontWeight: 600,
              opacity: 0.85,
              transition: "color 0.2s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = "var(--terra)";
              event.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "var(--ink)";
              event.currentTarget.style.opacity = "0.85";
            }}
          >
            How it works
          </a>
        </li>
        <li>
          <a
            href="#therapists"
            style={{
              textDecoration: "none",
              color: "var(--ink)",
              fontSize: "14px",
              fontWeight: 600,
              opacity: 0.85,
              transition: "color 0.2s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.color = "var(--terra)";
              event.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.color = "var(--ink)";
              event.currentTarget.style.opacity = "0.85";
            }}
          >
            Therapists
          </a>
        </li>
        <li>
          <button
            onClick={onOpenQuiz}
            style={{
              background: "var(--terra)",
              color: "white",
              border: "none",
              borderRadius: "100px",
              padding: "10px 22px",
              fontFamily: "Nunito, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 3px 14px rgba(196,103,74,0.35)",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "var(--terra-mid)";
              event.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "var(--terra)";
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Start matching
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
