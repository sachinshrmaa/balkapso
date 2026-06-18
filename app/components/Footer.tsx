"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HardHat, ArrowRight } from "lucide-react";
import { fetchSocialLinks, SocialLinks } from "../lib/dbHelper";
import styles from "../page.module.css";

export default function Footer() {
  const [socials, setSocials] = useState<SocialLinks>({
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    instagram: "#"
  });

  useEffect(() => {
    fetchSocialLinks().then(setSocials);
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerGrid} container`}>
        
        <div className={styles.footerColLogo}>
          <Link href="/" className={`${styles.logo} ${styles.logoFooter}`}>
            <div className={`${styles.logoSymbol} ${styles.logoSymbolFooter}`} style={{ overflow: "hidden", position: "relative" }}>
              <Image 
                src="/logo.png" 
                alt="Balkapso Logo" 
                fill 
                sizes="38px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <span className={styles.logoText} style={{ color: "var(--color-text-white)" }}>
              Balkapso<span className={styles.logoDot}>.</span>
            </span>
          </Link>
          <p className={styles.footerDesc}>
            BALKAPSO is a niche structural engineering consultancy based in Sikkim. Designing safe, resilient structures and strengthening ageing or distressed buildings through research-backed solutions.
          </p>
          <div className={styles.socialIcons}>
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.footerColTitle}>Engineering Services</h4>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLinkItem}><Link href="/services/structural-design">Structural Design</Link></li>
            <li className={styles.footerLinkItem}><Link href="/services/structural-retrofitting">Retrofitting & Rehabilitation</Link></li>
            <li className={styles.footerLinkItem}><Link href="/services/structural-assessment">Structural Assessment & NDT</Link></li>
            <li className={styles.footerLinkItem}><Link href="/services/structural-design">Peer Review & Verification</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.footerColTitle}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLinkItem}><Link href="/about">About BALKAPSO</Link></li>
            <li className={styles.footerLinkItem}><Link href="/projects">Featured Projects</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#why-us">Why Us</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#contact">Contact Engineering Desk</Link></li>
          
          </ul>
        </div>

        <div>
          <h4 className={styles.footerColTitle}>Newsletter Sign-up</h4>
          <p className={styles.newsletterDesc}>
            Subscribe to receive updates on modern materials, Indian Standards building regulations, and project case studies.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className={styles.newsletterForm}>
            <input 
              type="email" 
              className={styles.newsletterInput} 
              placeholder="news@example.com" 
              required
            />
            <button type="submit" className={styles.newsletterBtn} aria-label="Subscribe">
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

      </div>

      <div className="container">
        <div className={styles.footerDivider}></div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} BALKAPSO Construction. All rights reserved. Designing the Future. Strengthening the Existing. Designed and Developed by Stipill Solutions and Services</p>
          <div className={styles.footerBottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
