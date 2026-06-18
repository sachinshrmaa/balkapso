"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  HardHat,
  PencilRuler,
  Wrench,
  Search,
  Activity
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import AnimatedCounter from "./components/AnimatedCounter";
import { fetchProjects, addInquiry, Project } from "./lib/dbHelper";
import styles from "./page.module.css";

// Testimonials Data
const TESTIMONIALS = [
  {
    id: 1,
    quote: "Balkapso Constructions delivered our 42-story office tower 3 months ahead of schedule. Their attention to structural safety, meticulous budget control, and modern engineering standards is unmatched in the industry.",
    author: "Sarah Jenkins",
    role: "CEO",
    company: "Vertex Group",
    initials: "SJ"
  },
  {
    id: 2,
    quote: "The structural craftsmanship and responsive management of the Balkapso team were exceptional. They transformed our vision of a premium smart-villa estate into a high-end, breathtaking reality.",
    author: "Marcus Vance",
    role: "Managing Director",
    company: "LuxeHorizon Estates",
    initials: "MV"
  },
  {
    id: 3,
    quote: "Managing municipal infrastructure requires extreme reliability and strict timeline adherence. Balkapso proved to be an outstanding partner in constructing the AeroView bridge safely and under budget.",
    author: "Director David K.",
    role: "Chairperson",
    company: "State Infrastructure Commission",
    initials: "DK"
  }
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectFilter, setProjectFilter] = useState("All");
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Structural Design Consultancy",
    message: ""
  });

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  // Filter projects
  const filteredProjects = projects.filter(project => 
    projectFilter === "All" || project.category === projectFilter
  );

  // Handle Carousel navigation
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Form submission
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      try {
        await addInquiry({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "",
          service: formData.service,
          message: formData.message,
          timestamp: new Date().toISOString()
        });
        setFormSubmitted(true);
      } catch (err) {
        console.error("Failed to submit inquiry to Firestore:", err);
        // Fallback to local success state
        setFormSubmitted(true);
      }
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={styles.heroSection} id="home">
        <div className={`${styles.heroGrid} container`}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <ShieldCheck size={16} /> Sikkim's Structural Specialists
            </div>
            <h1 className={styles.heroTitle}>
              Specialists in <span className={styles.heroTitleHighlight}>Structural Design</span> and Retrofitting of Existing Buildings.
            </h1>
            <p className={styles.heroDescription}>
              BALKAPSO Construction is a niche structural engineering consultancy based in Sikkim, helping homeowners, institutions, businesses, and government agencies design safer structures and strengthen ageing or distressed buildings through practical, research-backed engineering solutions.
            </p>
            <div style={{ marginBottom: "24px", color: "var(--color-primary-dark)", fontWeight: "600", fontSize: "1.05rem" }}>
              Designing the Future. Strengthening the Existing. Trust is what we build well.
            </div>
            <div className={styles.heroCtas}>
              <a href="#services">
                <button className={styles.primaryBtn}>
                  Our Services <ArrowRight size={18} />
                </button>
              </a>
              <a href="#contact">
                <button className={styles.secondaryBtn}>
                  Consultation
                </button>
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/images/placeholder.svg" 
                alt="Balkapso Constructions Skyscraper Landmark" 
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className={styles.visualBgDecoration}></div>
            <div className={styles.visualFloatingCard} id="hero-floating-card">
              <div className={styles.floatingCardIcon}>
                <Building2 size={24} />
              </div>
              <div className={styles.floatingCardText}>
                <h4>ISO Certified</h4>
                <p>Safety & Construction standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <ScrollReveal direction="scale">
            <div className={styles.statsBar}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  <AnimatedCounter target={150} />
                  <span className={styles.statNumberAccent}>+</span>
                </span>
                <span className={styles.statLabel}>Completed Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  <AnimatedCounter target={10} />
                  <span className={styles.statNumberAccent}>+</span>
                </span>
                <span className={styles.statLabel}>Years of Integrity</span>
              </div>
             
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about">
        <div className={`${styles.aboutGrid} container`}>
          
          <ScrollReveal direction="left" className={styles.aboutVisual}>
            <div className={styles.aboutImageCol}>
              <div className={styles.aboutImgWrapper}>
                <Image 
                  src="/images/placeholder.svg" 
                  alt="Modern Construction Site Commercial" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.aboutImgWrapper}>
                <Image 
                  src="/images/placeholder.svg" 
                  alt="High-grade Infrastructure Site" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={`${styles.aboutImageCol} ${styles.aboutImageColDown}`}>
              <div className={styles.aboutImgWrapper} style={{ height: "350px" }}>
                <Image 
                  src="/images/placeholder.svg" 
                  alt="Luxury Residence Engineering" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={styles.aboutExperienceBadge}>
              <span className={styles.aboutExperienceYears}>
                <AnimatedCounter target={15} />+
              </span>
              <span className={styles.aboutExperienceText}>Years of Trust</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.aboutContent}>
            <div className={styles.aboutHeader}>
              <span className={styles.sectionSubtitle}>Why This Focus Matters</span>
              <h2 className={styles.sectionTitle}>Intersection of Design & Retrofitting</h2>
            </div>
            <p className={styles.aboutDescription}>
              Few organisations understand both how to design new structures efficiently and how to diagnose and strengthen existing ones when they begin to fail. That intersection is where BALKAPSO has built its reputation.
            </p>
            <div className={styles.aboutChecklist}>
              <div className={styles.checkItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <div>
                  <h4 className={styles.checkTitle}>1. Structural Design</h4>
                  <p className={styles.checkText}>Designing Structures That Perform for Generations. RCC Design, Steel Design, Earthquake Resistant Design, Foundation Design, Water Retaining Structures, Peer Review.</p>
                </div>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <div>
                  <h4 className={styles.checkTitle}>2. Structural Retrofitting</h4>
                  <p className={styles.checkText}>Strengthening Existing Structures with Confidence. RCC Jacketing, CFRP Strengthening, Epoxy Injection & Grouting, Rehabilitation Planning, Strengthening Design, Distress Assessment.</p>
                </div>
              </div>
            </div>
            <Link href="/about">
              <button className={styles.primaryBtn}>
                Learn More About Us <ArrowRight size={18} />
              </button>
            </Link>
          </ScrollReveal>

        </div>
      </section>

      {/* Services Section */}
      <section className={`${styles.servicesSection} section`} id="services">
        <div className="container">
          
          <ScrollReveal direction="down">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Our Niche Services</span>
              <h2 className={styles.sectionTitle}>Specialised Structural Solutions</h2>
              <p className={styles.sectionDescription}>
                Providing research-backed structural engineering design, building rehabilitation, and non-destructive testing tailored to Sikkim's complex seismic realities.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.servicesGrid}>
            
            {/* Service 1 */}
            <ScrollReveal direction="up" delay={0} className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <PencilRuler size={30} />
              </div>
              <h3 className={styles.serviceTitle}>Structural Design Consultancy</h3>
              <p className={styles.serviceText}>
                Structural design solutions compliant with Indian Standards (IS Codes) while balancing safety, functionality, practical construction, cost, and long-term performance.
              </p>
              <Link href="/services/structural-design" className={styles.serviceLink}>
                Explore Service <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            {/* Service 2 */}
            <ScrollReveal direction="up" delay={150} className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <Wrench size={30} />
              </div>
              <h3 className={styles.serviceTitle}>Structural Retrofitting & Rehabilitation</h3>
              <p className={styles.serviceText}>
                Niche expertise in structural retrofitting and rehabilitation that restores safety, improves performance, and extends the service life of existing structures.
              </p>
              <Link href="/services/structural-retrofitting" className={styles.serviceLink}>
                Explore Service <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

            {/* Service 3 */}
            <ScrollReveal direction="up" delay={300} className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <Search size={30} />
              </div>
              <h3 className={styles.serviceTitle}>Structural Assessment & NDT</h3>
              <p className={styles.serviceText}>
                Before you repair, understand the problem. Comprehensive investigations combining rigorous engineering judgement and Non-Destructive Testing.
              </p>
              <Link href="/services/structural-assessment" className={styles.serviceLink}>
                Explore Service <ArrowRight size={16} />
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={`${styles.projectsSection} section`} id="projects">
        <div className="container">
          
          <ScrollReveal direction="down">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Case Studies</span>
              <h2 className={styles.sectionTitle}>Our Featured Projects</h2>
              <p className={styles.sectionDescription}>
                Explore our diverse portfolio of award-winning structures constructed with accuracy, green materials, and premium engineering layouts.
              </p>
            </div>
          </ScrollReveal>

          {/* Filtering Bar */}
          <ScrollReveal direction="scale" delay={100}>
            <div className={styles.filterBar}>
              {["All", "Structural Design", "Retrofitting & Rehab", "Assessment & NDT"].map((cat) => (
                <button 
                  key={cat}
                  className={`${styles.filterBtn} ${projectFilter === cat ? styles.filterBtnActive : ""}`}
                  onClick={() => setProjectFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <ScrollReveal 
                key={project.id} 
                direction="scale" 
                delay={index * 80}
              >
                <div className={styles.projectCard} id={`project-${project.id}`}>
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                  <div className={styles.projectOverlay}>
                    <div className={styles.projectDetails}>
                      <span className={styles.projectCategory}>{project.category}</span>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", marginBottom: "16px" }}>
                        <MapPin size={14} style={{ display: "inline", marginRight: "4px" }} /> {project.location}
                      </p>
                      <span className={styles.projectBtn}>
                        View Case Study <ArrowRight size={16} className={styles.projectBtnIcon} />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={`${styles.whySection} section`} id="why-us">
        <div className={`${styles.whyGrid} container`}>
          
          <ScrollReveal direction="left" className={styles.whyContent}>
            <div>
              <span className={styles.sectionSubtitle}>Our Advantage</span>
              <h2 className={`${styles.sectionTitle} ${styles.whyTitle}`}>Why Partner with BALKAPSO</h2>
              <p className={styles.whyDescription}>
                We combine technical rigor, Indian Standards compliance, and local geographical expertise to design safer structures and rehabilitate existing buildings in high-seismic zones.
              </p>
              
              <div className={styles.whyFeaturesGrid}>
                <div className={styles.whyCard}>
                  <ShieldCheck className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Earthquake & Seismic Rigor</h4>
                  <p className={styles.whyCardText}>Expertise in IS 1893, IS 13920, and specialized seismic retrofitting details.</p>
                </div>

                <div className={styles.whyCard}>
                  <Activity className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Interpretation Over Readings</h4>
                  <p className={styles.whyCardText}>Machines generate readings. Our experienced engineers interpret what those readings mean.</p>
                </div>

                <div className={styles.whyCard}>
                  <Users className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Licensed Consultants</h4>
                  <p className={styles.whyCardText}>Registered and licensed structural engineers specializing in mountainous terrains.</p>
                </div>

                <div className={styles.whyCard}>
                  <Building2 className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Practical Construction</h4>
                  <p className={styles.whyCardText}>We design structural solutions that take into account local site realities and costs.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.whyVisual}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image 
                src="/images/placeholder.svg" 
                alt="High-end commercial architecture building under blue sky" 
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`${styles.testimonialSection} section`}>
        <div className="container">
          
          <ScrollReveal direction="down">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Client Reviews</span>
              <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
              <p className={styles.sectionDescription}>
                Read how we assist developers, municipal agencies, and residential associations in building trust.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={150}>
            <div className={styles.carouselContainer}>
              <div className={styles.testimonialCard} id="testimonial-card">
                <Quote className={styles.quoteIcon} size={50} />
                
                <div className={styles.starRating}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#ffb800" stroke="none" />
                  ))}
                </div>

                <p className={styles.testimonialQuote}>
                  "{TESTIMONIALS[testimonialIndex].quote}"
                </p>

                <div className={styles.authorMeta}>
                  <div className={styles.authorAvatar}>
                    {TESTIMONIALS[testimonialIndex].initials}
                  </div>
                  <div className={styles.authorDetails}>
                    <h4 className={styles.authorName}>{TESTIMONIALS[testimonialIndex].author}</h4>
                    <p className={styles.authorCompany}>
                      {TESTIMONIALS[testimonialIndex].role}, {TESTIMONIALS[testimonialIndex].company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Navigation */}
              <div className={styles.carouselNav}>
                <button 
                  className={styles.carouselBtn} 
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  id="testimonial-prev-btn"
                >
                  <ChevronLeft size={22} />
                </button>
                <button 
                  className={styles.carouselBtn} 
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  id="testimonial-next-btn"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Contact Section */}
      <section className={`${styles.contactSection} section`} id="contact">
        <div className={`${styles.contactGrid} container`}>
          
          <ScrollReveal direction="left" className={styles.contactInfoColumn}>
            <div>
              <div className={styles.contactHeading}>
                <span className={styles.sectionSubtitle}>Get In Touch</span>
                <h2 className={styles.sectionTitle}>Ready to build your next project? Let's discuss details.</h2>
                <p style={{ color: "var(--color-text-gray)", fontSize: "1.05rem" }}>
                  Send us your design blueprints, project dimensions, or general inquiries. Our engineering department will evaluate and follow up in 24 hours.
                </p>
              </div>

              <div className={styles.contactMethods}>
                
                <div className={styles.contactCard}>
                  <div className={styles.contactIconContainer}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className={styles.contactCardTitle}>Call Us Directly</h4>
                    <p className={styles.contactCardText}>Engineering Desk: <a href="tel:+917076219337" className={styles.contactLink}>+917076219337</a></p>
                    <p className={styles.contactCardText}>Support Desk: <a href="tel:+917076219337" className={styles.contactLink}>+917076219337</a></p>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIconContainer}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className={styles.contactCardTitle}>Email Inquiries</h4>
                    <p className={styles.contactCardText}>General: <a href="mailto:contact@balkapso.com" className={styles.contactLink}>contact@balkapso.com</a></p>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIconContainer}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className={styles.contactCardTitle}>Sikkim HQ Office</h4>
                    <p className={styles.contactCardText}>NH-10, Deorali</p>
                    <p className={styles.contactCardText}>Gangtok, Sikkim 737102</p>
                  </div>
                </div>

              </div>

              <div className={styles.mapPlaceholder}>
                <MapPin size={32} color="var(--color-primary-light)" />
                <div>
                  <strong style={{ display: "block", color: "var(--color-text-dark)" }}>Interactive Office Location Map</strong>
                  <span>Gangtok Headquarters (Open: Mon - Sat: 9:00 AM - 5:00 PM)</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.contactFormContainer}>
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className={styles.formCard} id="contact-form">
                <h3 className={styles.formTitle}>Request a Free Quote</h3>
                <p className={styles.formSubtitle}>Provide project details below to receive a cost estimation blueprint.</p>
                
                <div className={styles.formGroupRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Your Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      className={styles.formInput} 
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={styles.formInput} 
                      placeholder="jane@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className={styles.formGroupRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className={styles.formInput} 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="service" className={styles.formLabel}>Engineering Service</label>
                    <select 
                      id="service" 
                      className={`${styles.formInput} ${styles.formSelect}`}
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="Structural Design Consultancy">Structural Design Consultancy</option>
                      <option value="Structural Retrofitting & Rehabilitation">Structural Retrofitting & Rehabilitation</option>
                      <option value="Structural Assessment & NDT">Structural Assessment & NDT</option>
                      <option value="Peer Review & Design Verification">Peer Review & Design Verification</option>
                    </select>
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.formGroupLast}`}>
                  <label htmlFor="message" className={styles.formLabel}>Project Details & Scope *</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className={styles.formInput} 
                    placeholder="Briefly describe your project details, location, structural timeline, and approximate square feet dimensions..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className={styles.formSubmitBtn} id="contact-submit-btn">
                  Submit Estimate Request <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className={styles.formCard} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "450px" }}>
                <div className={styles.formSuccess} id="form-success-card">
                  <CheckCircle2 className={styles.formSuccessIcon} size={64} />
                  <h3 className={styles.formSuccessTitle}>Inquiry Submitted Successfully</h3>
                  <p style={{ color: "var(--color-text-gray)" }}>
                    Thank you, <strong>{formData.name}</strong>. We have received your query regarding <strong>{formData.service}</strong>.
                  </p>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginTop: "12px" }}>
                    A senior estimating manager will review your submission and contact you at <strong>{formData.email}</strong> within 1 business day.
                  </p>
                  <button 
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", service: "Commercial Construction", message: "" });
                    }}
                    className={styles.secondaryBtn}
                    style={{ margin: "24px auto 0", fontSize: "0.9rem", padding: "10px 20px" }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            )}
          </ScrollReveal>

        </div>
      </section>

      <Footer />
    </div>
  );
}
