"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Award,
  Users,
  Building2,
  HardHat,
  Compass,
  CheckCircle2
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import styles from "./about.module.css";

// Timeline Data
const TIMELINE = [
  {
    year: "2011",
    title: "Company Founded",
    text: "Balkapso Constructions was established in Chicago with a focus on local masonry, structural contracting, and architectural restoration."
  },
  {
    year: "2015",
    title: "Entering Commercial Skyways",
    text: "Successfully completed our first 15-story corporate headquarters plaza, establishing our name in mid-rise structural engineering."
  },
  {
    year: "2019",
    title: "Infrastructure Expansion",
    text: "Awarded our first municipal contract for the AeroView Cable Bridge bypass, scaling our workforce with heavy concrete machinery."
  },
  {
    year: "2022",
    title: "Carbon-Neutral Commitment",
    text: "Pioneered sustainable concrete structures and standardized solar installations, receiving the regional LEED Gold Alliance Award."
  },
  {
    year: "2025",
    title: "National Heavy Contractor",
    text: "Commenced high-density smart residential zones and high-rise developments nationally, marking over 150 project completions."
  }
];

// Leadership Data
const LEADERS = [
  {
    name: "Arthur Pendelton",
    role: "President & CEO",
    bio: "Arthur has over 25 years of structural development experience. He oversees national corporate relations and safety policies.",
    avatar: "/images/project_commercial.png"
  },
  {
    name: "Elena Rostova",
    role: "Chief Architect & Designer",
    bio: "Elena holds a Master's in Urban Architecture from MIT. She leads the blueprint planning and sustainable designs division.",
    avatar: "/images/hero_building.png"
  },
  {
    name: "David Vance",
    role: "Head of Structural Engineering",
    bio: "David is a licensed structural engineer with 18 years of experience in high-rise steel reinforcing and seismology compliance.",
    avatar: "/images/project_infrastructure.png"
  }
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;

      const parent = sectionRef.current;
      const timeline = timelineRef.current;

      if (window.innerWidth <= 768) {
        setTranslateX(0);
        return;
      }

      const parentRect = parent.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const parentTop = parentRect.top + window.scrollY;
      const parentHeight = parentRect.height;
      const scrollY = window.scrollY;

      const startScroll = parentTop;
      const endScroll = parentTop + parentHeight - viewportHeight;

      let progress = 0;
      if (scrollY >= startScroll && scrollY <= endScroll) {
        const currentScroll = scrollY - startScroll;
        const totalScroll = endScroll - startScroll;
        progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      } else if (scrollY > endScroll) {
        progress = 1;
      }

      const scrollableWidth = timeline.scrollWidth - window.innerWidth;
      if (scrollableWidth > 0) {
        setTranslateX(progress * scrollableWidth);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className={styles.aboutPage}>
      <Header />

      {/* Page Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Precision Engineering, Concrete Trust</h1>
          <p className={styles.heroSubtitle}>
            Learn how Balkapso Constructions has spent over 15 years building landmarks and resilient public structures safely.
          </p>
        </div>
        <div className={styles.heroBgPattern}></div>
      </section>

      {/* Our Story Section */}
      <section className={styles.storySection}>
        <div className={`${styles.storyGrid} container`}>
          <ScrollReveal direction="left" className={styles.storyContent}>
            <div>
              <span>ESTABLISHED 2011</span>
              <h2>A Legacy of Innovation & Structural Excellence</h2>
              <p>
                Balkapso Constructions was built on a simple promise: construct structures that endure for generations, safely, on schedule, and with transparent budget allocations.
              </p>
              <p>
                What started as a boutique design-build group in Illinois has expanded into a premier national engineering contractor. Today, our multidisciplinary team of licensed architects, structural managers, and concrete technicians coordinate to deliver state-of-the-art skyscrapers, municipal bridges, and smart residential clusters.
              </p>
              <p>
                We prioritize strict compliance with ISO safety guidelines and sources local materials to reduce structural carbon footprint.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.storyVisual}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src="/images/hero_building.png"
                alt="High rise landmark architecture representing Balkapso legacy"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <ScrollReveal direction="down">
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span style={{ color: "var(--color-primary-light)", fontWeight: "700", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.08em" }}>Our Pillars</span>
              <h2 style={{ fontSize: "2rem", color: "var(--color-text-dark)", marginTop: "8px" }}>The Values Driving Our Projects</h2>
            </div>
          </ScrollReveal>

          <div className={styles.valuesGrid}>
            <ScrollReveal direction="up" delay={0} className={styles.valueCard}>
              <ShieldCheck className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Absolute Safety</h3>
              <p className={styles.valueText}>
                We maintain zero-accident workplace milestones through regular OSHA training, safety gear compliance, and strict structural checks.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150} className={styles.valueCard}>
              <Award className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Quality Engineering</h3>
              <p className={styles.valueText}>
                Using grade-A raw concrete, premium steel framing, and sound seismic designs to guarantee stability and structural endurance.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300} className={styles.valueCard}>
              <Clock className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Milestone Integrity</h3>
              <p className={styles.valueText}>
                We respect our developers' timelines. Active management and agile supply networks ensure we deliver on or ahead of schedule.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={450} className={styles.valueCard}>
              <Compass className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Green Innovation</h3>
              <p className={styles.valueText}>
                Standardizing thermal insulation, smart ventilation grids, and local materials to deliver LEED certified properties.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section ref={sectionRef} className={styles.timelineSection}>
        <div className={styles.stickyTrack}>
          <div className="container">
            <ScrollReveal direction="down">
              <div className={styles.timelineHeader}>
                <span style={{ color: "var(--color-primary-light)", fontWeight: "700", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.08em" }}>Our History</span>
                <h2 style={{ fontSize: "2.2rem", color: "var(--color-text-dark)", marginTop: "8px" }}>The Growth of Balkapso</h2>
              </div>
            </ScrollReveal>

            <div className={styles.horizontalTimelineWrapper}>
              <div
                ref={timelineRef}
                className={styles.horizontalTimeline}
                style={{
                  transform: `translateX(-${translateX}px)`,
                  transition: "transform 0.1s ease-out"
                }}
              >
                <div className={styles.timelineLine}></div>
                {TIMELINE.map((item, index) => (
                  <div key={item.year} className={styles.horizontalTimelineContainer}>
                    {/* Top Area: Even indices (2011, 2019, 2025) */}
                    <div className={styles.timelineTopArea}>
                      {index % 2 === 0 && (
                        <ScrollReveal direction="up" delay={index * 100}>
                          <div className={styles.timelineContent}>
                            <span className={styles.timelineYear}>{item.year}</span>
                            <h3 className={styles.timelineTitle}>{item.title}</h3>
                            <p className={styles.timelineText}>{item.text}</p>
                          </div>
                        </ScrollReveal>
                      )}
                    </div>

                    {/* Middle Area: horizontal connector node & stems */}
                    <div className={styles.timelineMiddleArea}>
                      <div className={`${styles.timelineStem} ${index % 2 === 0 ? styles.stemAbove : styles.stemBelow}`}></div>
                      <div className={styles.timelineNode}></div>
                    </div>

                    {/* Bottom Area: Odd indices (2015, 2022) */}
                    <div className={styles.timelineBottomArea}>
                      {index % 2 !== 0 && (
                        <ScrollReveal direction="down" delay={index * 100}>
                          <div className={styles.timelineContent}>
                            <span className={styles.timelineYear}>{item.year}</span>
                            <h3 className={styles.timelineTitle}>{item.title}</h3>
                            <p className={styles.timelineText}>{item.text}</p>
                          </div>
                        </ScrollReveal>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className={styles.leadershipSection}>
        <div className="container">
          <ScrollReveal direction="down">
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "var(--color-primary-light)", fontWeight: "700", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.08em" }}>The Specialists</span>
              <h2 style={{ fontSize: "2rem", color: "var(--color-text-dark)", marginTop: "8px" }}>Our Leadership Team</h2>
              <p style={{ color: "var(--color-text-gray)", maxWidth: "600px", margin: "10px auto 0" }}>
                Meet the structural managers, designers, and executives coordinating our national developments.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.teamGrid}>
            {LEADERS.map((leader, index) => (
              <ScrollReveal
                key={leader.name}
                direction="scale"
                delay={index * 150}
                className={styles.teamCard}
              >
                <div>
                  <div className={styles.avatarWrapper}>
                    <div className={styles.avatarIconOnly}>
                      <Users size={72} strokeWidth={1} />
                    </div>
                  </div>
                  <div className={styles.teamInfo}>
                    <h3 className={styles.teamName}>{leader.name}</h3>
                    <span className={styles.teamRole}>{leader.role}</span>
                    <p className={styles.teamBio}>{leader.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <ScrollReveal direction="scale">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Start Constructing Your Vision Today</h2>
            <p className={styles.ctaText}>
              Our engineering team is equipped to evaluate blueplans, layout scopes, and budget guidelines for your next project.
            </p>
            <Link href="/#contact">
              <button className={styles.ctaBtn}>Consult With Our Estimators</button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
