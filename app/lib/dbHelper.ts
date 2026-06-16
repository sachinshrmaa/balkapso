import { db } from "./firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  writeBatch,
  getDoc,
  setDoc
} from "firebase/firestore";


export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  year: string;
  description: string;
  specs: {
    client: string;
    budget: string;
    size: string;
    materials: string;
    safetyRecord: string;
    duration: string;
  };
}

// Fallback showcase projects in case Firestore collection is empty or fails
const FALLBACK_PROJECTS = [
  {
    title: "Sikkim State Secretariat Seismic Evaluation",
    category: "Assessment & NDT",
    image: "/images/placeholder.svg",
    location: "Gangtok, East Sikkim",
    year: "2024",
    description: "Comprehensive seismic vulnerability assessment of the multi-story Sikkim State Secretariat block. Utilized NDT techniques including Rebound Hammer testing and Ultrasonic Pulse Velocity (UPV) to determine concrete quality and map sub-surface distress. The technical reporting formed the basis for subsequent rehabilitation planning.",
    specs: {
      client: "Sikkim Public Works Department (PWD)",
      budget: "₹18.5 Lakhs",
      size: "85,000 Sq. Ft.",
      materials: "Reinforced Concrete Frame, Rebar Detection Scanners, UPV Tester",
      safetyRecord: "Zero Incident Site Milestones",
      duration: "3 Months"
    }
  },
  {
    id: "2",
    title: "Teesta Stage-V Infrastructure Rehabilitation",
    category: "Retrofitting & Rehab",
    image: "/images/placeholder.svg",
    location: "Singtam, East Sikkim",
    year: "2025",
    description: "Structural rehabilitation and CFRP (Carbon Fiber Reinforced Polymer) strengthening of distress-prone auxiliary structures at the Teesta hydro station. Undertook RCC jacketing and epoxy injection of structural cracks to restore structural load capacity, resisting seismic movements and high vibrations.",
    specs: {
      client: "NHPC Limited",
      budget: "₹1.4 Crores",
      size: "Auxiliary Complex",
      materials: "CFRP Sheets, High-strength Epoxy Grout, Micro-concrete Jacketing",
      safetyRecord: "100% Safety Compliance Award",
      duration: "8 Months"
    }
  },
  {
    title: "Namchi Multi-Level Institutional Block",
    category: "Structural Design",
    image: "/images/placeholder.svg",
    location: "Namchi, South Sikkim",
    year: "2025",
    description: "Complete structural engineering design of a new five-story institutional building incorporating earthquake-resistant RCC frame technology. Design compliant with Indian Standards IS 1893 (Seismic Design Criteria) and IS 13920 (Ductile Detailing), taking into account steep slope foundations and soft soil configurations.",
    specs: {
      client: "Sikkim Education Department",
      budget: "₹8.2 Crores",
      size: "65,000 Sq. Ft.",
      materials: "Grade M30 Concrete, Fe 500D TMT Steel Reinforcements, Pile Foundations",
      safetyRecord: "Zero Incident Site Milestones",
      duration: "14 Months"
    }
  },
  {
    title: "Jorethang Market Plaza Peer Review",
    category: "Structural Design",
    image: "/images/placeholder.svg",
    location: "Jorethang, South Sikkim",
    year: "2024",
    description: "Independent structural peer review and design verification of the composite steel and concrete commercial plaza in Jorethang. Conducted detailed computational frame analysis to verify wind and seismic load resistance, suggesting key foundation adjustments for slope stability.",
    specs: {
      client: "Urban Development Department",
      budget: "₹4.5 Crores (Project Value)",
      size: "45,000 Sq. Ft.",
      materials: "E250 Structural Steel, Composite Slab Decking, Design Verification Software",
      safetyRecord: "Zero Incidents Award",
      duration: "2 Months"
    }
  },
  {
    title: "Gangtok Commercial Hotel Retrofitting",
    category: "Retrofitting & Rehab",
    image: "/images/placeholder.svg",
    location: "Deorali, Gangtok",
    year: "2026",
    description: "Seismic retrofitting design and implementation for an existing six-story hospitality structure. The structure was reinforced using steel braced frames and concrete jacketing of the weak columns, improving building ductility and stability without altering architectural functionality.",
    specs: {
      client: "Summit Hospitality Group",
      budget: "₹65 Lakhs",
      size: "30,000 Sq. Ft.",
      materials: "IS 2062 Mild Steel Bracings, Self-Compacting Concrete, Epoxy Anchors",
      safetyRecord: "Zero Accidents Milestone",
      duration: "6 Months"
    }
  },
  {
    title: "Rangpo High-Rise Distress Audit",
    category: "Assessment & NDT",
    image: "/images/placeholder.svg",
    location: "Rangpo, East Sikkim",
    year: "2026",
    description: "Non-destructive testing and technical interpretation of concrete degradation in a high-rise industrial facility near the border. Investigations included rebar cover depth assessment, carbonation depth tests, and core pull-out tests to establish safe residual service life and plan strengthening phases.",
    specs: {
      client: "Alkem Laboratories Complex",
      budget: "₹12.0 Lakhs",
      size: "120,000 Sq. Ft.",
      materials: "Proceq Covermeter, Carbonation Indicators, Concrete Core Drills",
      safetyRecord: "OSHA & PWD Standard Compliant",
      duration: "1.5 Months"
    }
  }
];

// Helper to check if Firebase is correctly configured
const isFirebaseReady = () => {
  return !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
};

// Seed initial projects collection
export async function seedInitialProjects() {
  if (!isFirebaseReady()) return;
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    if (querySnapshot.empty) {
      console.log("Firestore projects collection is empty. Auto-seeding default items...");
      const batch = writeBatch(db);
      FALLBACK_PROJECTS.forEach((project) => {
        const docRef = doc(collection(db, "projects"));
        batch.set(docRef, project);
      });
      await batch.commit();
      console.log("Auto-seeding complete!");
    }
  } catch (err) {
    console.error("Auto-seeding check failed:", err);
  }
}

// Fetch all projects
export async function fetchProjects(): Promise<Project[]> {
  if (!isFirebaseReady()) {
    return FALLBACK_PROJECTS.map((p, idx) => ({ ...p, id: String(idx + 1) }));
  }

  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    if (querySnapshot.empty) {
      // Seed dynamically and return the fallbacks in the meantime
      await seedInitialProjects();
      const refetched = await getDocs(collection(db, "projects"));
      return refetched.docs.map(d => ({ ...d.data(), id: d.id } as Project));
    }
    return querySnapshot.docs.map(d => ({ ...d.data(), id: d.id } as Project));
  } catch (err) {
    console.error("Failed to fetch projects from Firestore, falling back to static database:", err);
    return FALLBACK_PROJECTS.map((p, idx) => ({ ...p, id: String(idx + 1) }));
  }
}

// Add a project
export async function addProject(projectData: Omit<Project, "id">): Promise<string | null> {
  if (!isFirebaseReady()) return null;
  try {
    const docRef = await addDoc(collection(db, "projects"), projectData);
    return docRef.id;
  } catch (err) {
    console.error("Failed to write project doc to Firestore:", err);
    return null;
  }
}

// Edit a project
export async function editProject(id: string, projectData: Partial<Omit<Project, "id">>): Promise<boolean> {
  if (!isFirebaseReady()) return false;
  try {
    const docRef = doc(db, "projects", id);
    await updateDoc(docRef, projectData);
    return true;
  } catch (err) {
    console.error(`Failed to edit project doc ${id} in Firestore:`, err);
    return false;
  }
}

// Delete a project
export async function removeProject(id: string): Promise<boolean> {
  if (!isFirebaseReady()) return false;
  try {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(`Failed to delete project doc ${id} from Firestore:`, err);
    return false;
  }
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
}

// Fetch all inquiries from Firestore
export async function fetchInquiries(): Promise<Inquiry[]> {
  if (!isFirebaseReady()) {
    // Return mock inquiries if Firebase is not configured
    return [
      {
        id: "mock-1",
        name: "Karma Gyatso",
        email: "karma.g@example.com",
        phone: "+91 98320 12345",
        service: "Structural Retrofitting & Rehabilitation",
        message: "We have noticed vertical cracks in our institutional building columns in Gangtok. We need a distress assessment and retrofitting plan.",
        timestamp: new Date().toISOString()
      }
    ];
  }

  try {
    const querySnapshot = await getDocs(collection(db, "inquiries"));
    const data = querySnapshot.docs.map(d => ({ ...d.data(), id: d.id } as Inquiry));
    // Sort inquiries by timestamp descending
    return data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (err) {
    console.error("Failed to fetch inquiries from Firestore:", err);
    return [];
  }
}

// Add an inquiry submission
export async function addInquiry(inquiryData: Omit<Inquiry, "id">): Promise<string | null> {
  if (!isFirebaseReady()) return "mock-id";
  try {
    const docRef = await addDoc(collection(db, "inquiries"), inquiryData);
    return docRef.id;
  } catch (err) {
    console.error("Failed to save inquiry to Firestore:", err);
    return null;
  }
}

// Delete an inquiry
export async function removeInquiry(id: string): Promise<boolean> {
  if (!isFirebaseReady()) return true;
  try {
    const docRef = doc(db, "inquiries", id);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(`Failed to delete inquiry doc ${id} from Firestore:`, err);
    return false;
  }
}

export interface SocialLinks {
  facebook: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

const FALLBACK_SOCIALS: SocialLinks = {
  facebook: "https://facebook.com/Balkapso",
  linkedin: "https://linkedin.com/company/Balkapso",
  twitter: "https://twitter.com/Balkapso",
  instagram: "https://instagram.com/Balkapso"
};

// Fetch social links
export async function fetchSocialLinks(): Promise<SocialLinks> {
  if (!isFirebaseReady()) return FALLBACK_SOCIALS;
  try {
    const docRef = doc(db, "settings", "socials");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SocialLinks;
    } else {
      // Create the initial socials document
      await setDoc(docRef, FALLBACK_SOCIALS);
      return FALLBACK_SOCIALS;
    }
  } catch (err) {
    console.error("Failed to fetch socials, returning fallbacks:", err);
    return FALLBACK_SOCIALS;
  }
}

// Update social links
export async function updateSocialLinks(links: SocialLinks): Promise<boolean> {
  if (!isFirebaseReady()) return false;
  try {
    const docRef = doc(db, "settings", "socials");
    await setDoc(docRef, links, { merge: true });
    return true;
  } catch (err) {
    console.error("Failed to update socials in Firestore:", err);
    return false;
  }
}
