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
                src="/images/logo.png" 
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
            A pioneer in safe, reliable, and energy-conscious constructions. Leading projects from vision to architectural landmark.
          </p>
          <div className={styles.socialIcons}>
            <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIconBtn} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className={styles.footerColTitle}>Construction Sectors</h4>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLinkItem}><Link href="/#services">Corporate Headquarters</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#services">Smart Residential Villas</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#services">Municipal Flyovers</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#services">Seismic Strengthening</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#services">LEED Sustainable Planning</Link></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.footerColTitle}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li className={styles.footerLinkItem}><Link href="/about">About Our Company</Link></li>
            <li className={styles.footerLinkItem}><Link href="/projects">Featured Projects</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#why-us">Why Choose Balkapso</Link></li>
            <li className={styles.footerLinkItem}><Link href="/#contact">Contact Estimates Desk</Link></li>
            <li className={styles.footerLinkItem}><a href="#">Company Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.footerColTitle}>Newsletter Sign-up</h4>
          <p className={styles.newsletterDesc}>
            Subscribe to receive updates on modern materials, building regulations, and quarterly portfolios.
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
          <p>&copy; {new Date().getFullYear()} Balkapso Constructions Inc. All rights reserved. Built to last.</p>
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
