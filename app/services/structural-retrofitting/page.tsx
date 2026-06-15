"use client";

import Link from "next/link";
import { 
  Layers, 
  ShieldAlert, 
  ShieldCheck, 
  Droplet, 
  FileText, 
  PencilRuler, 
  ChevronRight, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import styles from "../services.module.css";

export default function StructuralRetrofittingPage() {
  return (
    <div className={styles.servicePage}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbActive}>Retrofitting & Rehabilitation</span>
          </div>
          <h1 className={styles.heroTitle}>Structural Retrofitting & Rehabilitation</h1>
          <p className={styles.heroSubtitle}>
            Specialised Structural Retrofitting & Rehabilitation Solutions for Existing Buildings.
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
                <li className={`${styles.sidebarListItem} ${styles.sidebarListItemActive}`}>
                  <ShieldCheck size={18} className={styles.sidebarListIcon} />
                  <span>Retrofitting & Rehab</span>
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
              <h3 className={styles.sidebarTitle}>When is it Needed?</h3>
              <ul className={styles.sidebarList}>
                <li className={styles.sidebarListItem}>
                  <ShieldAlert size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Visible column or beam cracks</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <ShieldAlert size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Corroded reinforcing steel bars</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <ShieldAlert size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Building load expansion / addition</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <ShieldAlert size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Post-earthquake structural damage</span>
                </li>
                <li className={styles.sidebarListItem}>
                  <ShieldAlert size={16} style={{ color: "var(--color-primary-light)", flexShrink: 0 }} />
                  <span>Seismic retrofitting requirements</span>
                </li>
              </ul>
            </div>

            <div className={styles.contactBox}>
              <h4>Concerned About Cracks?</h4>
              <p>Schedule an engineer visit to audit concrete degradation, columns cracking, or design retrofits.</p>
              <Link href="/#contact">
                <button className={styles.contactBoxBtn}>Request Distress Assessment</button>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            <div>
              <h2 className={styles.sectionHeader}>Strengthening Existing Structures with Confidence</h2>
              <p className={styles.bodyText}>
                BALKAPSO provides niche expertise in structural retrofitting and rehabilitation that restores safety, improves performance, and extends the service life of existing structures. Ageing concrete, seismic micro-damages, and poor construction details degrade structural load capabilities over time. We engineer targeted repairs that restore stability without complete demolition.
              </p>
            </div>

            <div className={styles.servicesStack}>
              {/* Solution 1 */}
              <ScrollReveal direction="up" delay={0} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Layers size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>RCC Jacketing</h3>
                  <p>
                    Adding an external layer of high-strength reinforced concrete around weak or underdesigned columns and beams. This technique significantly increases compressive load capacity, shear strength, and building ductility.
                  </p>
                </div>
              </ScrollReveal>

              {/* Solution 2 */}
              <ScrollReveal direction="up" delay={100} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <ShieldCheck size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>CFRP Strengthening</h3>
                  <p>
                    Utilizing state-of-the-art Carbon Fiber Reinforced Polymer (CFRP) wrap layouts. Highly effective for flexural and shear reinforcement, CFRP wrapping adds minimal dead weight and thickness while boosting tensile strength.
                  </p>
                </div>
              </ScrollReveal>

              {/* Solution 3 */}
              <ScrollReveal direction="up" delay={200} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <Droplet size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Epoxy Injection & Grouting</h3>
                  <p>
                    Rehabilitating concrete micro-fractures and structural cracks by injecting low-viscosity structural epoxy under pressure. This seals pathways against air/moisture ingress, prevents rebar corrosion, and welds cracks shut.
                  </p>
                </div>
              </ScrollReveal>

              {/* Solution 4 */}
              <ScrollReveal direction="up" delay={300} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <FileText size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Structural Rehabilitation Planning</h3>
                  <p>
                    Developing phased rehabilitation blueprints based on detailed NDT scans, cost constraints, and building occupancy requirements. We map out steps to strengthen structures safely while minimizing operational downtime.
                  </p>
                </div>
              </ScrollReveal>

              {/* Solution 5 */}
              <ScrollReveal direction="up" delay={400} className={styles.detailCard}>
                <div className={styles.detailIconContainer}>
                  <PencilRuler size={24} />
                </div>
                <div className={styles.detailCardContent}>
                  <h3>Specialised Structural Design for Strengthening</h3>
                  <p>
                    Engineering custom design drawings for column-beam connections, seismic shear enhancements, and steel bracket assemblies to safely redirect loads around compromised foundation zones.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className={styles.alertBox}>
              <h4 className={styles.alertBoxTitle}>
                <ShieldAlert size={20} /> Why Early Intervention Matters
              </h4>
              <p className={styles.alertBoxText}>
                Addressing structural distress at the right time reduces repair complexity, prevents compounding degradation, and helps clients make confident decisions while saving substantial reconstruction costs.
              </p>
            </div>
          </main>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Rehabilitate Your Building Safely</h2>
          <p className={styles.ctaText}>
            Consult with our structural retrofitting experts in Sikkim to evaluate cracks, load capacity, and concrete integrity.
          </p>
          <Link href="/#contact">
            <button className={styles.ctaBtn}>Request Retrofitting Evaluation</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
