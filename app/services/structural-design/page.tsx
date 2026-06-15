"use client";

import Link from "next/link";
import { 
  Building, 
  Layers, 
  Activity, 
  Anchor, 
  ClipboardCheck, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  FileText,
  FileCheck
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import styles from "../services.module.css";

export default function StructuralDesignPage() {
  return (
    <div className={styles.servicePage}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbActive}>Structural Design</span>
          </div>
          <h1 className={styles.heroTitle}>Structural Design Consultancy</h1>
          <p className={styles.heroSubtitle}>
            Structural Design That Balances Safety, Functionality, and Practical Construction.
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
                <li className={`${styles.sidebarListItem} ${styles.sidebarListItemActive}`}>
                  <ShieldCheck size={18} className={styles.sidebarListIcon} />
                  <span>Structural Design</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <Link href="/services/structural-retrofitting" className={styles.sidebarListItem}>
                    <ChevronRight size={16} className={styles.sidebarListIcon} />
                    <span>Retrofitting & Rehab</span>
                  </Link>
                </li>
                <li className={styles.sidebarListItem}>
                  <Link href="/services/structural-assessment" className={styles.sidebarListItem}>
                    <ChevronRight size={16} className={styles.sidebarListIcon} />
                    <span>Assessment & NDT</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Indian Standards (IS)</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-gray)", marginBottom: "12px" }}>
                Our designs strictly comply with Bureau of Indian Standards guidelines:
              </p>
              <div className={styles.standardsGrid}>
                <span className={styles.standardsBadge}>IS 456 (Concrete)</span>
                <span className={styles.standardsBadge}>IS 800 (Steel)</span>
                <span className={styles.standardsBadge}>IS 1893 (Seismic)</span>
                <span className={styles.standardsBadge}>IS 13920 (Ductile)</span>
                <span className={styles.standardsBadge}>IS 875 (Wind & Loads)</span>
              </div>
            </div>

            <div className={styles.contactBox}>
              <h4>Need a Design Review?</h4>
              <p>Get in touch with our engineering team for design consultation, drawings verification, or slope analysis.</p>
              <Link href="/#contact">
                <button className={styles.contactBoxBtn}>Request Consultation</button>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            <div>
              <h2 className={styles.sectionHeader}>Engineering Structures That Perform for Generations</h2>
              <p className={styles.bodyText}>
                At BALKAPSO, we deliver structural design solutions compliant with Indian Standards while considering construction realities, cost, and long-term performance. We understand that in mountainous terrains like Sikkim, structural engineering requires a specialized understanding of soil-structure interaction, steep slope stability, and high-seismic zone detailing.
              </p>
            </div>

            <div className={styles.servicesStack}>
              {/* Service 1 */}
              <ScrollReveal direction="up" delay={0} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Building size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>RCC Structural Design</h3>
                  <p>
                    Designing durable reinforced concrete structures from residential frames to institutional blocks. We specialize in optimization of columns, shear walls, and beams to ensure optimal load distribution under gravity and earthquake forces.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 2 */}
              <ScrollReveal direction="up" delay={100} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Layers size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Steel Structure Design</h3>
                  <p>
                    Efficient design of composite structures, industrial steel trusses, portal frames, and architectural steel elements. Our solutions provide high strength-to-weight ratios, easing material transport and assembly in difficult mountain passes.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 3 */}
              <ScrollReveal direction="up" delay={200} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Activity size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Earthquake Resistant Design</h3>
                  <p>
                    Sikkim lies in Seismic Zone V, requiring maximum seismic precautions. We implement rigorous structural analysis to design ductile RCC detailing compliant with IS 13920, ensuring building safety against lateral tectonic accelerations.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 4 */}
              <ScrollReveal direction="up" delay={300} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Anchor size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Foundation Design</h3>
                  <p>
                    Designing foundations tailored to steep slopes, soft soil profiles, and heavy water table conditions. Options include isolated footings, combined rafts, and deep pile systems designed alongside structural retaining walls for landslide protection.
                  </p>
                </div>
              </ScrollReveal>

              {/* Service 5 */}
              <ScrollReveal direction="up" delay={400} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <ClipboardCheck size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Peer Review & Design Verification</h3>
                  <p>
                    Third-party validation of structural drawings, calculations, and computational models. We run independent structural simulations to locate design redundancies, safety gaps, or opportunities for cost optimization before site excavation.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className={styles.alertBox}>
              <h4 className={styles.alertBoxTitle}>
                <FileCheck size={20} /> Practical Engineering Focus
              </h4>
              <p className={styles.alertBoxText}>
                We believe drawings must translate cleanly to site realities. Our engineers spend time at the construction site to ensure concrete grades, steel configurations, and ductile detailing are executed precisely as drafted.
              </p>
            </div>
          </main>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Start Your Structural Design Project</h2>
          <p className={styles.ctaText}>
            Consult with our registered structural consultants in Sikkim to ensure safety, durability, and Indian Standards compliance.
          </p>
          <Link href="/#contact">
            <button className={styles.ctaBtn}>Request Consultation Now</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
