"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Image from "next/image";
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Users, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Search, 
  Globe, 
  LogOut, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Save,
  CheckCircle,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Sun,
  Moon
} from "lucide-react";
import { 
  fetchProjects, 
  addProject, 
  editProject, 
  removeProject, 
  fetchInquiries, 
  removeInquiry, 
  fetchSocialLinks, 
  updateSocialLinks,
  Project, 
  Inquiry, 
  SocialLinks 
} from "../lib/dbHelper";
import styles from "./admin.module.css";

// Inline social media SVG icons
const FacebookIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LinkedinIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);
const TwitterIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const PASSCODE_LENGTH = 6;
const DEFAULT_PASSCODE = "123456";

export default function AdminPage() {
  // Theme Toggle State
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Passcode Security States
  const [passcode, setPasscode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passcodeError, setPasscodeError] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"dashboard" | "inquiries" | "projects" | "settings">("dashboard");

  // Database Data States
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [socials, setSocials] = useState<SocialLinks>({
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: ""
  });
  
  // Loading & Filter States
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Image Uploading States
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Project Modal Form States
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Individual Form Fields for Projects
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Commercial");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [specClient, setSpecClient] = useState("");
  const [specBudget, setSpecBudget] = useState("");
  const [specSize, setSpecSize] = useState("");
  const [specMaterials, setSpecMaterials] = useState("");
  const [specSafety, setSpecSafety] = useState("");
  const [specDuration, setSpecDuration] = useState("");

  // Notification Toast States
  const [toasts, setToasts] = useState<{ id: number; text: string; type: "success" | "error" }[]>([]);

  // Check authentication session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("admin_authenticated");
      if (auth === "true") {
        setIsLoggedIn(true);
      }
      setCheckingAuth(false);
    }
  }, []);

  // Fetch all base data once logged in
  useEffect(() => {
    if (!isLoggedIn) return;

    const loadAllData = async () => {
      setLoading(true);
      try {
        const [fetchedInquiries, fetchedProjects, fetchedSocials] = await Promise.all([
          fetchInquiries(),
          fetchProjects(),
          fetchSocialLinks()
        ]);
        setInquiries(fetchedInquiries);
        setProjects(fetchedProjects);
        setSocials(fetchedSocials);
      } catch (err) {
        showToast("Failed to fetch database data.", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [isLoggedIn]);

  // Toast Helper
  const showToast = (text: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Keyboard support for passcode lock
  useEffect(() => {
    if (isLoggedIn) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        handleKeyPress("back");
      } else if (e.key === "Enter") {
        handleKeyPress("submit");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passcode, isLoggedIn]);

  // Passcode entry keypad handler
  const handleKeyPress = (val: string) => {
    setPasscodeError(false);
    if (val === "clear") {
      setPasscode("");
    } else if (val === "back") {
      setPasscode((prev) => prev.slice(0, -1));
    } else if (val === "submit") {
      verifyPasscode(passcode);
    } else {
      if (passcode.length < PASSCODE_LENGTH) {
        const nextPass = passcode + val;
        setPasscode(nextPass);
        if (nextPass.length === PASSCODE_LENGTH) {
          verifyPasscode(nextPass);
        }
      }
    }
  };

  const verifyPasscode = (code: string) => {
    const requiredPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || DEFAULT_PASSCODE;
    if (code === requiredPasscode) {
      sessionStorage.setItem("admin_authenticated", "true");
      setIsLoggedIn(true);
      showToast("Access Granted. Welcome back, Admin.", "success");
    } else {
      setPasscodeError(true);
      setPasscode("");
      showToast("Invalid passcode sequence.", "error");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsLoggedIn(false);
    setPasscode("");
    showToast("Session ended. Logged out.", "success");
  };

  // Inquiry actions
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this client inquiry?")) return;
    setActionLoading(true);
    try {
      const success = await removeInquiry(id);
      if (success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        showToast("Inquiry deleted successfully.", "success");
      } else {
        showToast("Failed to delete inquiry.", "error");
      }
    } catch (err) {
      showToast("An error occurred.", "error");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Image upload handler (Base64 encoding locally)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Only image files can be uploaded.", "error");
      return;
    }

    // Firestore has a 1MB limit for the entire document.
    // Base64 encoding increases file size by ~33%.
    // So to keep document safely under 1MB, let's limit file size to 750KB.
    const maxSizeBytes = 750 * 1024;
    if (file.size > maxSizeBytes) {
      showToast("Image is too large. Must be smaller than 750 KB to be stored directly.", "error");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    
    // Simulate reader progress
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(Math.round(progress));
      }
    };

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setImage(result);
        setUploadProgress(100);
        showToast("Image processed successfully.", "success");
      } else {
        showToast("Failed to process image file.", "error");
      }
      setIsUploading(false);
    };

    reader.onerror = () => {
      showToast("Error reading image file.", "error");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const removeUploadedImage = () => {
    setImage("");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Project drawer utilities
  const openProjectDrawer = (project: Project | null = null) => {
    if (project) {
      setEditingProject(project);
      setTitle(project.title);
      setCategory(project.category);
      setImage(project.image);
      setLocation(project.location);
      setYear(project.year);
      setDescription(project.description);
      setSpecClient(project.specs?.client || "");
      setSpecBudget(project.specs?.budget || "");
      setSpecSize(project.specs?.size || "");
      setSpecMaterials(project.specs?.materials || "");
      setSpecSafety(project.specs?.safetyRecord || "");
      setSpecDuration(project.specs?.duration || "");
    } else {
      setEditingProject(null);
      setTitle("");
      setCategory("Commercial");
      setImage("");
      setLocation("");
      setYear(new Date().getFullYear().toString());
      setDescription("");
      setSpecClient("");
      setSpecBudget("");
      setSpecSize("");
      setSpecMaterials("");
      setSpecSafety("Zero Incident Site Milestones");
      setSpecDuration("");
    }
    setUploadProgress(0);
    setIsProjectDrawerOpen(true);
  };

  const handleProjectSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !location || !description) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    setActionLoading(true);
    const projectData = {
      title,
      category,
      image: image || "/images/project_commercial.png", // fallback suggestion
      location,
      year,
      description,
      specs: {
        client: specClient,
        budget: specBudget,
        size: specSize,
        materials: specMaterials,
        safetyRecord: specSafety,
        duration: specDuration
      }
    };

    try {
      if (editingProject) {
        const success = await editProject(editingProject.id, projectData);
        if (success) {
          setProjects((prev) =>
            prev.map((p) => (p.id === editingProject.id ? { ...p, ...projectData } : p))
          );
          showToast("Project specifications updated.", "success");
          setIsProjectDrawerOpen(false);
        } else {
          showToast("Failed to update project.", "error");
        }
      } else {
        const newId = await addProject(projectData);
        if (newId) {
          setProjects((prev) => [...prev, { id: newId, ...projectData }]);
          showToast("New project published successfully.", "success");
          setIsProjectDrawerOpen(false);
        } else {
          showToast("Failed to write project to database.", "error");
        }
      }
    } catch (err) {
      showToast("Error saving project record.", "error");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this project case study?")) return;
    setActionLoading(true);
    try {
      const success = await removeProject(id);
      if (success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast("Project removed from showcase.", "success");
      } else {
        showToast("Failed to delete project.", "error");
      }
    } catch (err) {
      showToast("Error deleting project record.", "error");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Social Links settings save
  const handleSaveSocials = async (e: FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const success = await updateSocialLinks(socials);
      if (success) {
        showToast("Social integration links updated.", "success");
      } else {
        showToast("Failed to save settings.", "error");
      }
    } catch (err) {
      showToast("Database settings error.", "error");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}></div>
        <p>Verifying session authority...</p>
      </div>
    );
  }

  // --- FILTERED INQUIRIES ---
  const filteredInquiries = inquiries.filter((inq) => {
    const matchSearch = 
      inq.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "All" || inq.service.includes(categoryFilter);
    return matchSearch && matchCategory;
  });

  // --- FILTERED PROJECTS ---
  const filteredProjects = projects.filter((proj) => {
    const matchSearch = 
      proj.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "All" || proj.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className={`${styles.adminPage} ${!isDarkMode ? styles.lightMode : ""}`}>
      {/* Toast Notification Stack */}
      <div className={styles.toastContainer}>
        {toasts.map((t) => (
          <div key={t.id} className={`${styles.toast} ${t.type === "success" ? styles.toastSuccess : styles.toastError}`}>
            <span className={styles.toastIcon}>
              {t.type === "success" ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
            </span>
            <div className={styles.toastContent}>
              <p className={styles.toastText}>{t.text}</p>
            </div>
            <button className={styles.toastClose} onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {!isLoggedIn ? (
        /* PASSCODE LOCK SCREEN */
        <section className={styles.securitySection}>
          <div className={styles.gateCard}>
            <div className={styles.gateIcon}>
              <Lock size={28} />
            </div>
            <h2 className={styles.gateTitle}>Admin Verification</h2>
            <p className={styles.gateSubtitle}>Provide the authorized 6-digit passcode.</p>

            <div className={`${styles.passcodeDisplay} ${passcodeError ? styles.passcodeDisplayError : ""}`}>
              {Array.from({ length: PASSCODE_LENGTH }).map((_, i) => (
                <span key={i}>{passcode[i] ? "●" : "○"}</span>
              ))}
            </div>

            <div className={styles.keypad}>
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                <button key={num} className={styles.keypadBtn} onClick={() => handleKeyPress(num)}>
                  {num}
                </button>
              ))}
              <button className={`${styles.keypadBtn} ${styles.keypadBtnDanger}`} onClick={() => handleKeyPress("clear")}>
                CLR
              </button>
              <button className={styles.keypadBtn} onClick={() => handleKeyPress("0")}>
                0
              </button>
              <button className={`${styles.keypadBtn} ${styles.keypadBtnSpecial}`} onClick={() => handleKeyPress("back")}>
                DEL
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* DASHBOARD GRID CONTAINER */
        <div className={styles.adminContainer}>
          {/* Left Navigation Sidebar */}
          <aside className={styles.sidebar}>
            <div>
              <div className={styles.sidebarHeader}>
                <div className={styles.sidebarLogoSymbol}>B</div>
                <span className={styles.sidebarTitle}>
                  Balkapso<span className={styles.sidebarTitleDot}>.</span>
                </span>
              </div>
              <nav className={styles.sidebarNav}>
                <div 
                  className={`${styles.sidebarItem} ${activeTab === "dashboard" ? styles.sidebarItemActive : ""}`}
                  onClick={() => { setActiveTab("dashboard"); setSearchQuery(""); setCategoryFilter("All"); }}
                >
                  <Globe size={18} /> Dashboard
                </div>
                <div 
                  className={`${styles.sidebarItem} ${activeTab === "projects" ? styles.sidebarItemActive : ""}`}
                  onClick={() => { setActiveTab("projects"); setSearchQuery(""); setCategoryFilter("All"); }}
                >
                  <Building2 size={18} /> Projects Manager
                </div>
                <div 
                  className={`${styles.sidebarItem} ${activeTab === "inquiries" ? styles.sidebarItemActive : ""}`}
                  onClick={() => { setActiveTab("inquiries"); setSearchQuery(""); setCategoryFilter("All"); }}
                >
                  <Mail size={18} /> Client Inquiries
                </div>
                <div 
                  className={`${styles.sidebarItem} ${activeTab === "settings" ? styles.sidebarItemActive : ""}`}
                  onClick={() => { setActiveTab("settings"); }}
                >
                  <Users size={18} /> Social Integration
                </div>
              </nav>
            </div>
            
            <div className={styles.sidebarFooter}>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <LogOut size={16} /> Logout Session
              </button>
            </div>
          </aside>

          {/* Right Workspace Main Panel */}
          <main className={styles.mainArea}>
            {/* Top Info Bar */}
            <header className={styles.topbar}>
              <div className={styles.pageHeading}>
                <h2>
                  {activeTab === "dashboard" && "Dashboard Metrics"}
                  {activeTab === "projects" && "Portfolio Management"}
                  {activeTab === "inquiries" && "Client Inbox Requests"}
                  {activeTab === "settings" && "Integration Settings"}
                </h2>
                <p>
                  {activeTab === "dashboard" && "Overview of site inquiries, showcases, and db statuses."}
                  {activeTab === "projects" && "Upload, publish, edit, or delete construction case studies."}
                  {activeTab === "inquiries" && "Review incoming structural estimate query logs."}
                  {activeTab === "settings" && "Configure social media link endpoints dynamically."}
                </p>
              </div>
              <div className={styles.topbarActions}>
                {/* Theme Toggle Button */}
                <button 
                  className={styles.themeToggleBtn} 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  title={isDarkMode ? "Toggle Light Theme" : "Toggle Dark Theme"}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <div className={styles.dbStatusPill}>
                  <div className={styles.dbStatusDot}></div>
                  <span>Firestore Connected</span>
                </div>
              </div>
            </header>

            {/* Workspace Content */}
            <div className={styles.contentContainer}>
              
              {/* Tab: Dashboard Metrics */}
              {activeTab === "dashboard" && (
                <div>
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <div className={styles.statCardIcon}>
                        <Building2 size={22} />
                      </div>
                      <div className={styles.statCardInfo}>
                        <span className={styles.statValue}>{projects.length}</span>
                        <span className={styles.statLabel}>Total Projects</span>
                      </div>
                    </div>
                    
                    <div className={styles.statCard}>
                      <div className={styles.statCardIcon}>
                        <Mail size={22} />
                      </div>
                      <div className={styles.statCardInfo}>
                        <span className={styles.statValue}>{inquiries.length}</span>
                        <span className={styles.statLabel}>Quote Inquiries</span>
                      </div>
                    </div>

                    <div className={styles.statCard}>
                      <div className={styles.statCardIcon}>
                        <CheckCircle2 size={22} />
                      </div>
                      <div className={styles.statCardInfo}>
                        <span className={styles.statValue}>Online</span>
                        <span className={styles.statLabel}>Firebase Services</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardPanel}>
                    <h3 className={styles.panelTitle}>Recent Client Inquiries</h3>
                    {loading ? (
                      <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                        <div className={styles.spinner}></div>
                      </div>
                    ) : inquiries.length === 0 ? (
                      <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "30px" }}>No inquiries registered yet.</p>
                    ) : (
                      <div className={styles.inquiriesList}>
                        {inquiries.slice(0, 4).map((inq) => (
                          <div key={inq.id} className={styles.inquiryItem}>
                            <div className={styles.inquiryTop}>
                              <div className={styles.inquirySender}>
                                <span className={styles.senderName}>{inq.name}</span>
                                <span className={styles.senderMeta}>{inq.email} | {inq.phone || "No Phone"}</span>
                              </div>
                              <span className={styles.inquiryTag}>{inq.service}</span>
                            </div>
                            <p className={styles.inquiryMessage}>{inq.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab: Project Manager */}
              {activeTab === "projects" && (
                <div>
                  <div className={styles.controlsRow}>
                    <div className={styles.searchWrapper}>
                      <Search size={18} className={styles.searchIcon} />
                      <input 
                        type="text" 
                        placeholder="Search projects by title..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className={styles.filterWrapper}>
                      <select 
                        className={styles.filterSelect}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option value="All">All Categories</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Residential">Residential</option>
                        <option value="Infrastructure">Infrastructure</option>
                      </select>

                      <button className={styles.addBtn} onClick={() => openProjectDrawer(null)}>
                        <Plus size={16} /> Publish Project
                      </button>
                    </div>
                  </div>

                  {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
                      <div className={styles.spinner}></div>
                    </div>
                  ) : filteredProjects.length === 0 ? (
                    <div className={styles.projectsTableContainer}>
                      <div className={styles.emptyState}>
                        <Building2 size={40} className={styles.emptyStateIcon} />
                        <p>No project records found matching your filters.</p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.projectsTableContainer}>
                      <table className={styles.projectsTable}>
                        <thead>
                          <tr>
                            <th className={styles.th}>Project Showcase</th>
                            <th className={styles.th}>Category</th>
                            <th className={styles.th}>Location / Year</th>
                            <th className={styles.th}>Budget Scale</th>
                            <th className={styles.th} style={{ textAlign: "right" }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProjects.map((proj) => (
                            <tr key={proj.id} className={styles.tr}>
                              <td className={styles.td}>
                                <div className={styles.projectCellInfo}>
                                  <div className={styles.projectThumbnail}>
                                    <img 
                                      src={proj.image} 
                                      alt={proj.title} 
                                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/images/project_commercial.png";
                                      }}
                                    />
                                  </div>
                                  <div className={styles.projectCellText}>
                                    <span className={styles.projectCellTitle}>{proj.title}</span>
                                    <span className={styles.projectCellSubtitle}>{proj.description.slice(0, 75)}...</span>
                                  </div>
                                </div>
                              </td>
                              <td className={styles.td}>
                                <span className={styles.categoryTag}>{proj.category}</span>
                              </td>
                              <td className={styles.td}>
                                {proj.location} ({proj.year})
                              </td>
                              <td className={styles.td}>
                                {proj.specs?.budget || "N/A"}
                              </td>
                              <td className={styles.td} style={{ textAlign: "right" }}>
                                <div className={styles.actionCell} style={{ justifyContent: "flex-end" }}>
                                  <button 
                                    className={styles.actionBtnEdit}
                                    onClick={() => openProjectDrawer(proj)}
                                    title="Edit Project Specs"
                                  >
                                    <Edit3 size={15} />
                                  </button>
                                  <button 
                                    className={styles.actionBtnDelete}
                                    onClick={() => handleDeleteProject(proj.id)}
                                    disabled={actionLoading}
                                    title="Delete Project"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Inquiries Inbox */}
              {activeTab === "inquiries" && (
                <div>
                  <div className={styles.controlsRow}>
                    <div className={styles.searchWrapper}>
                      <Search size={18} className={styles.searchIcon} />
                      <input 
                        type="text" 
                        placeholder="Search sender name or text..."
                        className={styles.searchInput}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className={styles.filterWrapper}>
                      <select 
                        className={styles.filterSelect}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option value="All">All Sectors</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Residential">Residential</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Blueprint">Blueprint Design</option>
                        <option value="Seismic">Seismic Strengthening</option>
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
                      <div className={styles.spinner}></div>
                    </div>
                  ) : filteredInquiries.length === 0 ? (
                    <div className={styles.cardPanel} style={{ textAlign: "center", padding: "60px 20px" }}>
                      <Mail size={40} style={{ color: "var(--text-muted)", marginBottom: "16px" }} />
                      <p style={{ color: "var(--text-secondary)" }}>No client inquiries match the selection criteria.</p>
                    </div>
                  ) : (
                    <div className={styles.inquiriesList}>
                      {filteredInquiries.map((inq) => (
                        <div key={inq.id} className={styles.inquiryItem}>
                          <div className={styles.inquiryTop}>
                            <div className={styles.inquirySender}>
                              <span className={styles.senderName}>{inq.name}</span>
                              <div className={styles.senderMeta}>
                                <span>Email: <a href={`mailto:${inq.email}`}>{inq.email}</a></span>
                                {inq.phone && <span>Phone: <a href={`tel:${inq.phone}`}>{inq.phone}</a></span>}
                              </div>
                            </div>
                            <span className={styles.inquiryTag}>{inq.service}</span>
                          </div>

                          <p className={styles.inquiryMessage}>{inq.message}</p>

                          <div className={styles.inquiryBottom}>
                            <span className={styles.inquiryDate}>
                              <Calendar size={12} style={{ display: "inline", marginRight: "4px" }} />
                              {inq.timestamp ? new Date(inq.timestamp).toLocaleString() : "Timestamp missing"}
                            </span>
                            <button 
                              className={styles.deleteInquiryBtn}
                              onClick={() => handleDeleteInquiry(inq.id)}
                              disabled={actionLoading}
                            >
                              <Trash2 size={13} /> Delete Entry
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Social Settings */}
              {activeTab === "settings" && (
                <div className={styles.settingsCard}>
                  <form onSubmit={handleSaveSocials}>
                    <h3 className={styles.panelTitle}>Social Links Integration</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "24px" }}>
                      Update URLs to dynamically configure client-facing footer linkages.
                    </p>

                    <div className={styles.formField}>
                      <label className={styles.formLabel}>Facebook Profile Link</label>
                      <div className={styles.inputIconWrapper}>
                        <FacebookIcon size={16} className={styles.fieldIcon} />
                        <input 
                          type="url" 
                          placeholder="https://facebook.com/Balkapso" 
                          className={styles.formInputWithIcon}
                          value={socials.facebook}
                          onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.formLabel}>LinkedIn Corporate Link</label>
                      <div className={styles.inputIconWrapper}>
                        <LinkedinIcon size={16} className={styles.fieldIcon} />
                        <input 
                          type="url" 
                          placeholder="https://linkedin.com/company/Balkapso" 
                          className={styles.formInputWithIcon}
                          value={socials.linkedin}
                          onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.formLabel}>Twitter / X Link</label>
                      <div className={styles.inputIconWrapper}>
                        <TwitterIcon size={16} className={styles.fieldIcon} />
                        <input 
                          type="url" 
                          placeholder="https://x.com/Balkapso" 
                          className={styles.formInputWithIcon}
                          value={socials.twitter}
                          onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.formLabel}>Instagram Account Link</label>
                      <div className={styles.inputIconWrapper}>
                        <InstagramIcon size={16} className={styles.fieldIcon} />
                        <input 
                          type="url" 
                          placeholder="https://instagram.com/Balkapso" 
                          className={styles.formInputWithIcon}
                          value={socials.instagram}
                          onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                        />
                      </div>
                    </div>

                    <button type="submit" className={styles.saveSettingsBtn} disabled={actionLoading}>
                      <Save size={16} /> {actionLoading ? "Updating database..." : "Save Configuration"}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </main>
        </div>
      )}

      {/* CENTERED SPECS POPUP MODAL (FORM DIALOG) */}
      {isProjectDrawerOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsProjectDrawerOpen(false)}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <h3 className={styles.drawerTitle}>{editingProject ? "Modify Project Specifications" : "Publish New Showcase"}</h3>
              <button className={styles.closeDrawerBtn} onClick={() => setIsProjectDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className={styles.drawerBody}>
              <div className={styles.modalFormGrid}>
                {/* Left Column: General Details */}
                <div className={styles.modalFormCol}>
                  <h4 className={styles.drawerSectionTitle} style={{ marginTop: 0 }}>General Details</h4>

                  <div className={styles.drawerFormGroup}>
                    <label className={styles.drawerFormLabel}>Project Title *</label>
                    <input 
                      type="text" 
                      className={styles.drawerFormInput}
                      placeholder="The Solis Residential Plaza"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className={styles.drawerFormRow}>
                    <div className={styles.drawerFormGroup}>
                      <label className={styles.drawerFormLabel}>Category Sectors *</label>
                      <select 
                        className={styles.drawerFormInput}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Commercial">Commercial</option>
                        <option value="Residential">Residential</option>
                        <option value="Infrastructure">Infrastructure</option>
                      </select>
                    </div>

                    <div className={styles.drawerFormGroup}>
                      <label className={styles.drawerFormLabel}>Completion Year *</label>
                      <input 
                        type="number" 
                        className={styles.drawerFormInput}
                        required
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.drawerFormGroup}>
                    <label className={styles.drawerFormLabel}>Location City *</label>
                    <input 
                      type="text" 
                      className={styles.drawerFormInput}
                      placeholder="Chicago, IL"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div className={styles.drawerFormGroup} style={{ flexGrow: 1, marginBottom: 0 }}>
                    <label className={styles.drawerFormLabel}>Description Summary *</label>
                    <textarea 
                      className={styles.drawerFormTextarea}
                      rows={8}
                      placeholder="Detailed layout scope and material configurations..."
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ height: "100%", minHeight: "200px", resize: "none" }}
                    />
                  </div>
                </div>

                {/* Right Column: Visuals & Specifications */}
                <div className={styles.modalFormCol}>
                  <h4 className={styles.drawerSectionTitle} style={{ marginTop: 0 }}>Project Visuals</h4>
                  
                  <div className={styles.drawerFormGroup}>
                    {image ? (
                      <div>
                        <div className={styles.uploadPreview}>
                          <img 
                            src={image} 
                            alt="Preview upload" 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <button 
                            type="button" 
                            className={styles.removeImageBtn}
                            onClick={removeUploadedImage}
                            title="Remove Image"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className={styles.uploadZone}>
                          <Upload size={24} className={styles.uploadIcon} />
                          <span className={styles.uploadZoneText}>
                            Drag & Drop or <span className={styles.uploadZoneTextHighlight}>Browse</span> to upload image file
                          </span>
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}

                    {isUploading && (
                      <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <span className={styles.progressText}>Processing image: {uploadProgress}%</span>
                      </div>
                    )}
                    
                    <div style={{ marginTop: "10px" }}>
                      <label className={styles.drawerFormLabel} style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Or paste direct Image URL</label>
                      <input 
                        type="url" 
                        className={styles.drawerFormInput}
                        placeholder="https://example.com/image.png"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        style={{ marginTop: "4px", width: "100%" }}
                      />
                    </div>
                  </div>

                  <h4 className={styles.drawerSectionTitle}>Technical Specifications</h4>

                  <div className={styles.drawerFormRow}>
                    <div className={styles.drawerFormGroup}>
                      <label className={styles.drawerFormLabel}>Client Name</label>
                      <input 
                        type="text" 
                        className={styles.drawerFormInput}
                        placeholder="Vertex Partners"
                        value={specClient}
                        onChange={(e) => setSpecClient(e.target.value)}
                      />
                    </div>

                    <div className={styles.drawerFormGroup}>
                      <label className={styles.drawerFormLabel}>Project Budget</label>
                      <input 
                        type="text" 
                        className={styles.drawerFormInput}
                        placeholder="$82.4 Million"
                        value={specBudget}
                        onChange={(e) => setSpecBudget(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.drawerFormRow}>
                    <div className={styles.drawerFormGroup}>
                      <label className={styles.drawerFormLabel}>Dimensions (Size)</label>
                      <input 
                        type="text" 
                        className={styles.drawerFormInput}
                        placeholder="340,000 Sq. Ft."
                        value={specSize}
                        onChange={(e) => setSpecSize(e.target.value)}
                      />
                    </div>

                    <div className={styles.drawerFormGroup}>
                      <label className={styles.drawerFormLabel}>Construction Duration</label>
                      <input 
                        type="text" 
                        className={styles.drawerFormInput}
                        placeholder="22 Months"
                        value={specDuration}
                        onChange={(e) => setSpecDuration(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.drawerFormGroup}>
                    <label className={styles.drawerFormLabel}>Sourced Materials</label>
                    <input 
                      type="text" 
                      className={styles.drawerFormInput}
                      placeholder="Post-Tensioned Cable, Grade 80 Concrete"
                      value={specMaterials}
                      onChange={(e) => setSpecMaterials(e.target.value)}
                    />
                  </div>

                  <div className={styles.drawerFormGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.drawerFormLabel}>Safety Milestone Record</label>
                    <input 
                      type="text" 
                      className={styles.drawerFormInput}
                      placeholder="OSHA Certified, Zero Site Incidents"
                      value={specSafety}
                      onChange={(e) => setSpecSafety(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>

            <div className={styles.drawerFooter}>
              <button 
                type="button" 
                className={styles.cancelBtn} 
                onClick={() => setIsProjectDrawerOpen(false)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className={styles.submitBtn} 
                onClick={handleProjectSubmit}
                disabled={actionLoading || isUploading}
              >
                {actionLoading ? "Saving specifications..." : editingProject ? "Save Specs" : "Publish Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}