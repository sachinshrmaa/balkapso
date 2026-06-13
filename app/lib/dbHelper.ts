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
    title: "The Vertex Corporate Tower",
    category: "Commercial",
    image: "/images/project_commercial.png",
    location: "Metro Downtown",
    year: "2025",
    description: "A state-of-the-art 42-story skyscraper serving as the regional headquarters for Vertex Group. The structure features high-strength concrete core stabilization, sustainable energy captures, and a modular low-emissivity glass curtain wall. Balkapso Constructions managed the design-build cycle from foundation drafting to high-end interior finishes.",
    specs: {
      client: "Vertex Development Partners",
      budget: "$82.4 Million",
      size: "340,000 Sq. Ft.",
      materials: "Grade 80 Reinforced Concrete, Structural Steel Core, Smart Double-Glazed Facade",
      safetyRecord: "OSHA Star Certified, Zero Accident Incidents",
      duration: "22 Months"
    }
  },
  {
    id: "2",
    title: "AeroView Cable Bridge",
    category: "Infrastructure",
    image: "/images/project_infrastructure.png",
    location: "Coastal Bypass Route 9",
    year: "2024",
    description: "A critical 1.2-mile municipal transport project consisting of a high-tension cable-stayed bridge spanning the eastern shipping bay. Engineered with marine-grade anti-corrosive concrete pilings and prestressed high-tensile steel cables to withstand severe seismology and coastal wind sheer. Completed under budget and three months ahead of schedule.",
    specs: {
      client: "State Department of Transportation",
      budget: "$120.0 Million",
      size: "1.2 Mile Span",
      materials: "Marine Grade concrete, Post-Tensioned Cable stays, Caisson Foundations",
      safetyRecord: "100% Safety Compliance Audit Award",
      duration: "32 Months"
    }
  },
  {
    title: "LuxeHorizon Modern Estates",
    category: "Residential",
    image: "/images/project_residential.png",
    location: "Hillside Crest",
    year: "2025",
    description: "A luxury enclave consisting of 18 high-end custom architectural villas. Designed with modern minimalist lines, solar slate roofing, smart home automations, and geothermal heating loops. Sourced from local limestone quarries to match natural landscaping contours while ensuring maximum residential structural durability.",
    specs: {
      client: "LuxeHorizon Communities Inc.",
      budget: "$45.0 Million",
      size: "18 Villas (9,500 Sq. Ft. Avg)",
      materials: "Natural Limestone, Premium Eco-Timber, Smart Solar Roof Slates",
      safetyRecord: "Zero Incident Site Milestones",
      duration: "18 Months"
    }
  },
  {
    title: "Solis Smart Residential Cluster",
    category: "Residential",
    image: "/images/project_residential.png",
    location: "East Valley Expansion",
    year: "2026",
    description: "An energy-independent residential housing project incorporating structural insulation panel cores, solar micro-grids, and decentralized greywater filtration. Balkapso is managing complete land grading, pipeline utility grids, and building assemblies to meet LEED Platinum parameters.",
    specs: {
      client: "GreenSpaces Residential Ltd",
      budget: "$38.0 Million",
      size: "12 Buildings (120 Apartments)",
      materials: "Thermal Insulated Panels, Greywater Filtration Grid, Geothermal Loops",
      safetyRecord: "OSHA Merit Award Project",
      duration: "24 Months Scheduled"
    }
  },
  {
    title: "Nexus Commerce Hub & Plaza",
    category: "Commercial",
    image: "/images/hero_building.png",
    location: "North Transit Zone",
    year: "2024",
    description: "A mixed-use commercial center including outdoor retail corridors, office suites, and underground transit integration. Engineered utilizing a composite steel deck structure and architectural polished concrete pillars. Includes modern ventilation grids to optimize building-wide energy performance.",
    specs: {
      client: "Nexus Corp Development",
      budget: "$60.0 Million",
      size: "220,000 Sq. Ft.",
      materials: "Polished Concrete Pillars, Low-E Glazed Envelope, Composite Steel Decks",
      safetyRecord: "Zero Injuries Award",
      duration: "18 Months"
    }
  },
  {
    title: "Oceanfront Concrete Expressway",
    category: "Infrastructure",
    image: "/images/project_infrastructure.png",
    location: "Bay Terminal Link",
    year: "2026",
    description: "A complex coastal highway elevation project aimed at reducing transit congestion near the shipping port. Features marine-grade caissons, anti-corrosive epoxy reinforcing bars, and prestressed structural bridge arches designed for high-density heavy vehicle weights.",
    specs: {
      client: "State Port & Highways Authority",
      budget: "$95.0 Million",
      size: "4.5 Elevated Miles",
      materials: "Epoxy Reinforcing Bars, Marine Grade Caissons, Prestressed Arches",
      safetyRecord: "Full Marine-Work Safety Compliant",
      duration: "28 Months Scheduled"
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
        name: "Jonathan Hughes",
        email: "j.hughes@example.com",
        phone: "+1 (555) 321-9876",
        service: "Commercial Construction",
        message: "We are interested in contracting Balkapso for our upcoming 5-story office annex in downtown. Looking for cost estimation details.",
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
