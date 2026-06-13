"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  X, 
  Building2, 
  HardHat, 
  Maximize2,
  DollarSign,
  Activity,
  ChevronRight
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import { fetchProjects, Project } from "../lib/dbHelper";
import styles from "./projects.module.css";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const filteredProjects = projects.filter(project =>
    filter === "All" || project.category === filter
  );

  return (
    <div className={styles.projectsPage}>
      <Header />

      {/* Page Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Our Engineering Portfolio</h1>
          <p className={styles.heroSubtitle}>
            Review our diverse projects spanning skyscrapers, heavy transit flyovers, and custom residential zones.
          </p>
        </div>
        <div className={styles.heroBgPattern}></div>
      </section>

      {/* Portfolio Section */}
      <section className={styles.portfolioSection}>
        <div className="container">
          
          {/* Filters */}
          <ScrollReveal direction="down">
            <div className={styles.filterBar}>
              {["All", "Commercial", "Residential", "Infrastructure"].map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${filter === cat ? styles.filterBtnActive : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <ScrollReveal 
                key={`${project.id}-${filter}`} // Re-trigger reveal when filter changes!
                direction="scale" 
                delay={index * 80}
              >
                <div 
                  className={styles.projectCard}
                  onClick={() => setActiveProject(project)}
                  id={`projects-card-${project.id}`}
                >
                  <div className={styles.imageWrapper}>
                    <div className={styles.projectBadge}>{project.category}</div>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className={styles.projectImage}
                      unoptimized
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.cardTop}>
                      <h3>{project.title}</h3>
                      <div className={styles.cardMeta}>
                        <span className={styles.metaItem}>
                          <MapPin size={14} /> {project.location}
                        </span>
                        <span className={styles.metaItem}>
                          <Calendar size={14} /> Completed {project.year}
                        </span>
                      </div>
                      <p className={styles.cardDesc}>
                        {project.description.slice(0, 110)}...
                      </p>
                    </div>
                    <span className={styles.cardLink}>
                      View Detailed Case Study <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Case Study Modal Overlay */}
      {activeProject && (
        <div 
          className={styles.modalOverlay} 
          onClick={() => setActiveProject(null)}
          id="project-modal-overlay"
        >
          <div 
            className={styles.modalContainer} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={styles.modalCloseBtn}
              onClick={() => setActiveProject(null)}
              aria-label="Close modal"
              id="project-modal-close"
            >
              <X size={20} />
            </button>

            {/* Modal Header/Banner */}
            <div className={styles.modalHero}>
              <Image 
                src={activeProject.image} 
                alt={activeProject.title}
                fill
                style={{ objectFit: "cover" }}
                unoptimized
              />
              <div className={styles.modalHeroOverlay}>
                <span className={styles.modalCategory}>{activeProject.category}</span>
                <h2 className={styles.modalTitle}>{activeProject.title}</h2>
              </div>
            </div>

            {/* Modal Content */}
            <div className={styles.modalBody}>
              <div className={styles.modalGrid}>
                
                {/* Left: Description */}
                <div className={styles.modalDescription}>
                  <h4>Project Overview</h4>
                  <p>{activeProject.description}</p>
                  <p>
                    During development, Balkapso Constructions prioritized structural safety protocols and structural integrity checks. This architectural design stands as a testament to our team's standard of precision engineering and general contracting values.
                  </p>
                </div>

                {/* Right: Technical Specs */}
                <div className={styles.modalSpecs}>
                  <h4>Technical Specifications</h4>
                  <ul className={styles.specList}>
                    
                    <li className={styles.specItem}>
                      <span className={styles.specLabel}>Client / Developer</span>
                      <span className={styles.specValue}>{activeProject.specs.client}</span>
                    </li>

                    <li className={styles.specItem}>
                      <span className={styles.specLabel}>Approximate Budget</span>
                      <span className={styles.specValue}>{activeProject.specs.budget}</span>
                    </li>

                    <li className={styles.specItem}>
                      <span className={styles.specLabel}>Project Scale</span>
                      <span className={styles.specValue}>{activeProject.specs.size}</span>
                    </li>

                    <li className={styles.specItem}>
                      <span className={styles.specLabel}>Core Materials Sourced</span>
                      <span className={styles.specValue}>{activeProject.specs.materials}</span>
                    </li>

                    <li className={styles.specItem}>
                      <span className={styles.specLabel}>Safety Standard Milestone</span>
                      <span className={styles.specValue}>{activeProject.specs.safetyRecord}</span>
                    </li>

                    <li className={styles.specItem}>
                      <span className={styles.specLabel}>Construction Duration</span>
                      <span className={styles.specValue}>{activeProject.specs.duration}</span>
                    </li>

                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
