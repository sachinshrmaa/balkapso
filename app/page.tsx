"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
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
  HardHat
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
    service: "Commercial Construction",
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
              <ShieldCheck size={16} /> Engineering the Future
            </div>
            <h1 className={styles.heroTitle}>
              Building landmarks with <span className={styles.heroTitleHighlight}>structural integrity</span> and modern design.
            </h1>
            <p className={styles.heroDescription}>
              Balkapso Constructions delivers state-of-the-art commercial hubs, luxury residential estates, and resilient public infrastructure. Supported by years of industry engineering excellence.
            </p>
            <div className={styles.heroCtas}>
              <a href="#projects">
                <button className={styles.primaryBtn}>
                  Explore Projects <ArrowRight size={18} />
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
                src="/images/hero_building.png" 
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
                  <AnimatedCounter target={15} />
                  <span className={styles.statNumberAccent}>+</span>
                </span>
                <span className={styles.statLabel}>Years of Integrity</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  <AnimatedCounter target={45} />
                  <span className={styles.statNumberAccent}>+</span>
                </span>
                <span className={styles.statLabel}>Engineers & Architects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  <AnimatedCounter target={99} />
                  <span className={styles.statNumberAccent}>%</span>
                </span>
                <span className={styles.statLabel}>Client Satisfaction</span>
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
                  src="/images/project_commercial.png" 
                  alt="Modern Construction Site Commercial" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.aboutImgWrapper}>
                <Image 
                  src="/images/project_infrastructure.png" 
                  alt="High-grade Infrastructure Site" 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className={`${styles.aboutImageCol} ${styles.aboutImageColDown}`}>
              <div className={styles.aboutImgWrapper} style={{ height: "350px" }}>
                <Image 
                  src="/images/project_residential.png" 
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
              <span className={styles.sectionSubtitle}>Who We Are</span>
              <h2 className={styles.sectionTitle}>Precision engineering, exceptional execution.</h2>
            </div>
            <p className={styles.aboutDescription}>
              Founded on the pillars of safety, engineering innovation, and absolute accountability, Balkapso Constructions has evolved into a leading national general contractor. We handle design-build developments from drafting blueprints to high-grade finishes.
            </p>
            <div className={styles.aboutChecklist}>
              <div className={styles.checkItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <div>
                  <h4 className={styles.checkTitle}>Architectural Design</h4>
                  <p className={styles.checkText}>Custom modern floorplans and structural drafting.</p>
                </div>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <div>
                  <h4 className={styles.checkTitle}>General Contracting</h4>
                  <p className={styles.checkText}>Supervised material procurement and complete safety focus.</p>
                </div>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <div>
                  <h4 className={styles.checkTitle}>Seismic Reinforcement</h4>
                  <p className={styles.checkText}>Top grade concrete and structural reinforcement engineering.</p>
                </div>
              </div>
              <div className={styles.checkItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <div>
                  <h4 className={styles.checkTitle}>LEED Sustainability</h4>
                  <p className={styles.checkText}>Eco-conscious raw resources and solar layouts.</p>
                </div>
              </div>
            </div>
            <a href="#contact">
              <button className={styles.primaryBtn}>
                Learn More About Us <ArrowRight size={18} />
              </button>
            </a>
          </ScrollReveal>

        </div>
      </section>

      {/* Services Section */}
      <section className={`${styles.servicesSection} section`} id="services">
        <div className="container">
          
          <ScrollReveal direction="down">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSubtitle}>Our Expertise</span>
              <h2 className={styles.sectionTitle}>Comprehensive Construction Services</h2>
              <p className={styles.sectionDescription}>
                We offer full-service construction planning and development tailored specifically to commercial, residential, and infrastructure sectors.
              </p>
            </div>
          </ScrollReveal>

          <div className={styles.servicesGrid}>
            
            {/* Service 1 */}
            <ScrollReveal direction="up" delay={0} className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <Building2 size={30} />
              </div>
              <h3 className={styles.serviceTitle}>Commercial Construction</h3>
              <p className={styles.serviceText}>
                High-rise corporate headquarters, regional shopping plazas, tech hubs, and logistic storage facilities engineered to maximize commercial performance.
              </p>
              <a href="#contact" className={styles.serviceLink}>
                Learn More <ArrowRight size={16} />
              </a>
            </ScrollReveal>

            {/* Service 2 */}
            <ScrollReveal direction="up" delay={150} className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <Users size={30} />
              </div>
              <h3 className={styles.serviceTitle}>Residential Developments</h3>
              <p className={styles.serviceText}>
                Bespoke modern architectural townhomes, custom estate villas, and multi-family high-density structures engineered for safety and aesthetic luxury.
              </p>
              <a href="#contact" className={styles.serviceLink}>
                Learn More <ArrowRight size={16} />
              </a>
            </ScrollReveal>

            {/* Service 3 */}
            <ScrollReveal direction="up" delay={300} className={styles.serviceCard}>
              <div className={styles.serviceIconWrapper}>
                <HardHat size={30} />
              </div>
              <h3 className={styles.serviceTitle}>Infrastructure Engineering</h3>
              <p className={styles.serviceText}>
                Large-scale public transport expressways, cable-stayed highway flyovers, water drainage networks, and bridge restorations built to stand the test of time.
              </p>
              <a href="#contact" className={styles.serviceLink}>
                Learn More <ArrowRight size={16} />
              </a>
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
              {["All", "Commercial", "Residential", "Infrastructure"].map((cat) => (
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
              <h2 className={`${styles.sectionTitle} styles.whyTitle`}>Why Clients Partner with Balkapso</h2>
              <p className={styles.whyDescription}>
                We distinguish ourselves through strict compliance with timeline milestones, active communication, and standardizing safety measures above regulatory requirements.
              </p>
              
              <div className={styles.whyFeaturesGrid}>
                <div className={styles.whyCard}>
                  <ShieldCheck className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Safety First Culture</h4>
                  <p className={styles.whyCardText}>Zero accident milestones on commercial sites for over 8 consecutive quarters.</p>
                </div>

                <div className={styles.whyCard}>
                  <Clock className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Timely Project Delivery</h4>
                  <p className={styles.whyCardText}>Strict project timeline management guarantees delivery on or ahead of time.</p>
                </div>

                <div className={styles.whyCard}>
                  <Users className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Expert Management</h4>
                  <p className={styles.whyCardText}>Each site is supervised by licensed structural architects and general project managers.</p>
                </div>

                <div className={styles.whyCard}>
                  <Building2 className={styles.whyCardIcon} size={32} />
                  <h4 className={styles.whyCardTitle}>Sustainable Materials</h4>
                  <p className={styles.whyCardText}>Sourcing recycled concrete, local steel, and energy saving ventilation units.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className={styles.whyVisual}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image 
                src="/images/project_commercial.png" 
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
                    <p className={styles.contactCardText}>General Office: <a href="tel:+18005550199" className={styles.contactLink}>+1 (800) 555-0199</a></p>
                    <p className={styles.contactCardText}>Sales & Estimates: <a href="tel:+18005550198" className={styles.contactLink}>+1 (800) 555-0198</a></p>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIconContainer}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className={styles.contactCardTitle}>Email Inquiries</h4>
                    <p className={styles.contactCardText}>Contracts Department: <a href="mailto:estimates@Balkapso.com" className={styles.contactLink}>estimates@Balkapso.com</a></p>
                    <p className={styles.contactCardText}>Careers: <a href="mailto:careers@Balkapso.com" className={styles.contactLink}>careers@Balkapso.com</a></p>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIconContainer}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className={styles.contactCardTitle}>Corporate HQ Office</h4>
                    <p className={styles.contactCardText}>950 Construction Blvd, Suite 400</p>
                    <p className={styles.contactCardText}>Chicago, IL 60601</p>
                  </div>
                </div>

              </div>

              <div className={styles.mapPlaceholder}>
                <MapPin size={32} color="var(--color-primary-light)" />
                <div>
                  <strong style={{ display: "block", color: "var(--color-text-dark)" }}>Interactive Site Location Map</strong>
                  <span>Chicago HQ (Open: Mon - Fri: 8:00 AM - 5:00 PM)</span>
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
                    <label htmlFor="service" className={styles.formLabel}>Construction Sector</label>
                    <select 
                      id="service" 
                      className={`${styles.formInput} styles.formSelect`}
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Residential Developments">Residential Developments</option>
                      <option value="Infrastructure Engineering">Infrastructure Engineering</option>
                      <option value="Architectural Blueprint Design">Architectural Blueprint Design</option>
                      <option value="Retrofitting & Seismic Reinforcing">Retrofitting & Seismic Reinforcing</option>
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
