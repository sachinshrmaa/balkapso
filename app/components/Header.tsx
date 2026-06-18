"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HardHat, Menu, X } from "lucide-react";
import styles from "../page.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolledHeader : ""}`} id="header">
      <div className={`${styles.navContainer} container`}>
        <Link href="/" className={styles.logo} id="nav-logo">
          <div className={styles.logoSymbol} style={{ overflow: "hidden", position: "relative" }}>
            <Image 
              src="/logo.png" 
              alt="Balkapso Logo" 
              fill 
              sizes="38px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className={styles.logoText}>
            Balkapso<span className={styles.logoDot}>.</span>
          </span>
        </Link>

        {/* Desktop Nav Menu */}
        <nav className={styles.navMenu}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/#services" className={styles.navLink}>Services</Link>
          <Link href="/projects" className={styles.navLink}>Projects</Link>
          <Link href="https://brdi.balkapso.com/" className={styles.navLink}>BRDI</Link>
          <Link href="/#contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.navActions}>
          <div className={styles.contactInfoMini}>
            <span>Engineering Desk</span>
            <span className={styles.phoneNumber}>+91 94340 12345</span>
          </div>
          <Link href="/#contact">
            <button className={styles.quoteBtn}>Get a Quote</button>
          </Link>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`} id="mobile-menu">
        <Link href="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link href="/about" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>About Us</Link>
        <Link href="/#services" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Services</Link>
        <Link href="/projects" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Our Projects</Link>
        <Link href="/#why-us" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Why Balkapso</Link>
        <Link href="/#contact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
        <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-gray)" }}>Call: +91 94340 12345</span>
          <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
            <button className={styles.quoteBtn} style={{ width: "100%" }}>Get a Quote</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
