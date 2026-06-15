"use client";

import Link from "next/link";
import { 
  Eye, 
  Activity, 
  Cpu, 
  Scan, 
  HelpCircle, 
  FileText, 
  ChevronRight, 
  ShieldCheck, 
  Info,
  Award
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import styles from "../services.module.css";

export default function StructuralAssessmentPage() {
  return (
    <div className={styles.servicePage}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbActive}>Structural Assessment & NDT</span>
          </div>
          <h1 className={styles.heroTitle}>Structural Assessment & NDT</h1>
          <p className={styles.heroSubtitle}>
            Before You Repair a Structure, Understand the Problem.
          </p>
        </div>
        <div className={styles.heroBgPattern}></div>
      </section>

      {/* Content Grid */}
      <section className={`${styles.contentSection} container`}>
        <div className={styles.grid}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Niche Services</h3>
              <ul className={styles.sidebarList}>
                <li className={styles.sidebarListItem}>
                  <Link href="/services/structural-design" className={styles.sidebarListItem}>
                    <ChevronRight size={16} className={styles.sidebarListIcon} />
                    <span>Structural Design</span>
                  </Link>
                </li>
                <li className={styles.sidebarListItem}>
                  <Link href="/services/structural-retrofitting" className={styles.sidebarListItem}>
                    <ChevronRight size={16} className={styles.sidebarListIcon} />
                    <span>Retrofitting & Rehab</span>
                  </Link>
                </li>
                <li className={`${styles.sidebarListItem} ${styles.sidebarListItemActive}`}>
                  <ShieldCheck size={18} className={styles.sidebarListIcon} />
                  <span>Assessment & NDT</span>
                </li>
              </ul>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Testing Equipment</h3>
              <ul className={styles.sidebarList}>
                <li className={styles.sidebarListItem}>
                  <Info size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Digital Rebound Hammers</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <Info size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Ultrasonic Pulse Velocity Scanners</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <Info size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Electromagnetic Rebar Locators</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <Info size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Core Extraction Drills</span>
                </li>
              </ul>
            </div>

            <div className={styles.contactBox}>
              <h4>Need an NDT Scan?</h4>
              <p>Book an electromagnetic rebar locator or ultrasonic pulse velocity scan for your building concrete structures.</p>
              <Link href="/#contact">
                <button className={styles.contactBoxBtn}>Schedule NDT Scan</button>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            <div>
              <h2 className={styles.sectionHeader}>Investigations Combining Engineering Judgement and NDT</h2>
              <p className={styles.bodyText}>
                Repairing a structure without diagnosing the underlying cause is a temporary fix. At BALKAPSO, we execute rigorous in-situ investigations combining experienced engineering judgement with advanced Non-Destructive Testing (NDT) to locate honeycomb cavities, rebar corrosion, and concrete cracks.
              </p>
            </div>

            <div className={styles.servicesStack}>
              {/* Service 1 */}
              <ScrollReveal direction="up" delay={0} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Eye size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Visual Inspection</h3>
                  <p>
                    A comprehensive walk-through audit checking for structural cracks, settlement symptoms, water ingress, concrete spalling, and load deflection in beams, columns, and slabs.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 2 */}
              <ScrollReveal direction="up" delay={100} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Activity size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Rebound Hammer Testing</h3>
                  <p>
                    Utilizing Schmidt Rebound Hammers to determine the surface hardness and estimate the compressive strength of the concrete in columns, retaining walls, and decks.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 3 */}
              <ScrollReveal direction="up" delay={200} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Cpu size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Ultrasonic Pulse Velocity Testing</h3>
                  <p>
                    Measuring the travel time of ultrasonic pulses through concrete structures. Used to evaluate concrete homogeneity, locate internal honeycomb cavities, voids, and verify depth of cracks.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 4 */}
              <ScrollReveal direction="up" delay={300} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Scan size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Rebar Detection & Cover Surveys</h3>
                  <p>
                    Electromagnetic rebar scans to map the exact location, spacing, and size of reinforcing steel bars inside concrete, ensuring adequate concrete cover against corrosion.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 5 */}
              <ScrollReveal direction="up" delay={400} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <HelpCircle size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Technical Interpretation</h3>
                  <p>
                    Synthesizing raw rebound values and scan graphs into engineering insight, verifying whether concrete has degraded due to weathering, carbonation, or seismic overload.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 6 */}
              <ScrollReveal direction="up" delay={500} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <FileText size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Reporting</h3>
                  <p>
                    Filing rigorous structural fitness certificates, distress maps, concrete grade reports, and step-by-step remediation suggestions for homeowners and PWD clients.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className={styles.alertBox}>
              <h4 className={styles.alertBoxTitle}>
                <Award size={20} /> Why Choose BALKAPSO
              </h4>
              <p className={styles.alertBoxText}>
                <strong>Machines generate readings. Engineers interpret what those readings mean.</strong> Our team combines sophisticated testing tools with rich experience in Himalayan seismology to deliver accurate, actionable diagnostics.
              </p>
            </div>
          </main>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Understand the Condition of Your Building</h2>
          <p className={styles.ctaText}>
            Get a comprehensive structural audit and Non-Destructive Testing performed by licensed structural engineers.
          </p>
          <Link href="/#contact">
            <button className={styles.ctaBtn}>Schedule Structural Assessment</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
