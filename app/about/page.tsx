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
    title: "Firm Established",
    text: "BALKAPSO was established in Gangtok, Sikkim, with a focus on local terrain structural drafting, design verification, and site inspections."
  },
  {
    year: "2015",
    title: "Structural Design Focus",
    text: "Expanded services into full RCC structural design consultancy for multi-level buildings under steep Himalayan slope configurations."
  },
  {
    year: "2019",
    title: "Seismic Retrofitting Pioneering",
    text: "Pioneered specialized CFRP strengthening and RCC jacketing details for distressed institutional complexes in East Sikkim."
  },
  {
    year: "2022",
    title: "NDT Infrastructure Scaling",
    text: "Acquired advanced Non-Destructive Testing (NDT) gear, standardizing Rebound Hammer, UPV, and rebar detection cover surveys."
  },
  {
    year: "2025",
    title: "Leading Regional Specialists",
    text: "Established as the go-to niche structural engineering and rehabilitation consultancy in the region, completing over 150 evaluations."
  }
];

// Leadership Data
const LEADERS = [
  {
    name: "Tashi Namgyal",
    role: "Founder & Managing Director",
    bio: "Tashi has over 25 years of structural development experience in the Himalayan region, specializing in retrofitting existing masonry and RCC buildings.",
    avatar: "/images/project_commercial.png"
  },
  {
    name: "David Lepcha",
    role: "Lead Structural Engineer",
    bio: "David is a registered structural consultant with 18 years of experience in landslide-prone foundation designs and seismic ductile detailing.",
    avatar: "/images/project_infrastructure.png"
  },
  {
    name: "Elena Rai",
    role: "Head of NDT & Assessment",
    bio: "Elena leads our Non-Destructive Testing division. She is a specialist in concrete diagnostics and distress assessment interpretation.",
    avatar: "/images/hero_building.png"
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
          <h1 className={styles.heroTitle}>Designing the Future. Strengthening the Existing.</h1>
          <p className={styles.heroSubtitle}>
            Learn how BALKAPSO Construction has built a reputation in Sikkim through research-backed structural engineering and rehabilitation.
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
              <h2>Seismic Safety & Structural Endurance in the Himalayas</h2>
              <p>
                BALKAPSO was built on a simple promise: help homeowners, institutions, businesses, and government agencies design safer structures and strengthen ageing or distressed buildings through practical, research-backed engineering solutions.
              </p>
              <p>
                What started as a specialized detailing office in Gangtok has expanded into a leading regional structural engineering consultancy. Today, our multidisciplinary team of registered engineers and diagnostics technicians coordinate to deliver state-of-the-art earthquake resistant designs, distress audits, and building retrofits.
              </p>
              <p>
                Few organisations understand both how to design new structures efficiently and how to diagnose and strengthen existing ones when they begin to fail. That intersection is where BALKAPSO has built its reputation.
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
              <h2 style={{ fontSize: "2rem", color: "var(--color-text-dark)", marginTop: "8px" }}>The Values Driving Our Solutions</h2>
            </div>
          </ScrollReveal>

          <div className={styles.valuesGrid}>
            <ScrollReveal direction="up" delay={0} className={styles.valueCard}>
              <ShieldCheck className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Absolute Safety</h3>
              <p className={styles.valueText}>
                We prioritize the security of human lives by designing structures strictly compliant with Indian Standards seismic criteria and ductile detailing codes.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150} className={styles.valueCard}>
              <Award className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Quality Engineering</h3>
              <p className={styles.valueText}>
                Leveraging state-of-the-art design verification and Non-Destructive Testing to guarantee the stability and endurance of every project.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300} className={styles.valueCard}>
              <Clock className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Milestone Integrity</h3>
              <p className={styles.valueText}>
                Respecting timelines and providing prompt assessment, verification, and retrofitting plans to reduce repair complexity.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={450} className={styles.valueCard}>
              <HardHat className={styles.valueIcon} size={36} />
              <h3 className={styles.valueTitle}>Practical Solutions</h3>
              <p className={styles.valueText}>
                We design structural solutions that balance safety, functionality, and practical construction realities under mountainous constraints.
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
              <h2 style={{ fontSize: "2rem", color: "var(--color-text-dark)", marginTop: "8px" }}>Our Engineering Team</h2>
              <p style={{ color: "var(--color-text-gray)", maxWidth: "600px", margin: "10px auto 0" }}>
                Meet our team of registered structural consultants and concrete diagnostics experts coordinating our engineering evaluations.
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
            <h2 className={styles.ctaTitle}>Ensure the Safety & Stability of Your Structures</h2>
            <p className={styles.ctaText}>
              Our engineering team is equipped to perform seismic evaluations, NDT testing, and design verification for your buildings.
            </p>
            <Link href="/#contact">
              <button className={styles.ctaBtn}>Consult With Our Engineers</button>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
}
