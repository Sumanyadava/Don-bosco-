// Helper for managing persistent storage of campus events in localStorage

const STORAGE_KEY = "db_seri_events";
const EVENT_CHANGE_EVENT = "db_seri_events_updated";

const INITIAL_EVENTS = [
  {
    id: "EVT-101",
    title: "Annual Vocational Trade & Skill Exhibition 2026",
    category: "Workshop",
    date: "July 20, 2026",
    status: "Published",
    description: `Don Bosco Technical Institute Liluah organized its flagship Annual Trade & Skill Exhibition 2026 across our Howrah campus. 

Traversing through the workshop labs, visitors and parents witnessed live practical demonstrations created entirely by student trainees. Fitter and Machining trade trainees demonstrated high-precision lathe operation, metal fitting, and gear fabrication techniques under expert instructor supervision.

In the Electrical & Solar Energy zone, students demonstrated rooftop Solar PV grid-tie setups, industrial motor control panels, and automated relay systems. Meanwhile, the Refrigeration and Air Conditioning department presented energy-efficient split AC troubleshooting, compressor overhaul procedures, and HVAC ducting models.

The event concluded with an interactive award presentation recognizing the top 3 innovative practical project models built during the academic term.`,
    images: [
      "/images/studentsss.jpeg",
      "/images/studentss.jpeg",
      "/images/students.jpeg"
    ]
  },
  {
    id: "EVT-102",
    title: "Free Admission Counselling & Technical Career Orientation",
    category: "Counselling",
    date: "July 12, 2026",
    status: "Published",
    description: `To assist prospective Class VIII and Class X passed candidates in choosing fulfilling career pathways, DB SERI hosted a comprehensive Career Guidance and Admission Counselling Session.

Principal and Senior Instructors delivered insights on NCVT Delhi, WBSCTE, and DB SERI vocational certification pathways. Industry experts joined to highlight the surging demand for certified Fitters, Solar Technicians, HVAC mechanics, Draughtsmen, and Beauticians in both domestic and international markets.

Parents and applicants toured the institute's modern classrooms, machine shops, electrical labs, and hostel accommodation facilities. Over 150 student aspirants registered for counselling and document verification on the spot.`,
    images: [
      "/images/studentss.jpeg",
      "/images/students.jpeg",
      "/images/studentsss.jpeg"
    ]
  },
  {
    id: "EVT-103",
    title: "Grand Certificate Distribution Ceremony & Campus Placement Drive",
    category: "Academic",
    date: "June 28, 2026",
    status: "Published",
    description: `A momentous occasion was celebrated at the Auditorium as Don Bosco SERI held its Certificate Distribution Ceremony for the graduating batch of 2025-2026.

Distinguished industrial delegates from leading manufacturing, HVAC engineering, and solar energy firms attended as Guests of Honor. Over 200 trainees across NCVT ITI Fitter, Civil Draughtsman, RAC, Electrical Solar PV, Beautician, and Tailoring received their official passing certificates and transcripts.

Concurrent with the ceremony, a campus placement recruitment drive was conducted, resulting in job offers and apprenticeship letters extended to over 85% of eligible graduates.`,
    images: [
      "/images/students.jpeg",
      "/images/studentsss.jpeg",
      "/images/studentss.jpeg"
    ]
  },
  {
    id: "EVT-104",
    title: "Beautician & Fashion Garment Design Live Skill Showcase",
    category: "Cultural",
    date: "June 15, 2026",
    status: "Published",
    description: `Trainees from the 6-month Beautician and Tailoring departments presented a vibrant live skill showcase highlighting fashion garment creation and cosmetology techniques.

The tailoring exhibition featured hand-crafted ethnic wear, precision pattern cutting, embroidery, and modern stitching projects designed by female trainees preparing for self-employment. 

In the beautician section, students conducted live demonstrations of bridal makeup, skincare therapies, hair styling, and salon safety procedures. Representatives from regional beauty chains praised the high standards of practical training maintained at Don Bosco.`,
    images: [
      "/images/studentsss.jpeg",
      "/images/studentss.jpeg"
    ]
  },
  {
    id: "EVT-105",
    title: "Industrial Safety Awareness & Fire Safety Workshop",
    category: "Workshop",
    date: "May 30, 2026",
    status: "Published",
    description: `Ensuring workplace safety is a core pillar of technical training at Don Bosco. A full-day Safety Awareness & Emergency Preparedness Workshop was conducted for all engineering and trade batch trainees.

Certified safety officers conducted practical drills on personal protective equipment (PPE) usage, electrical hazard mitigation, first aid protocols, and industrial machine emergency stops. Fire safety officers conducted live fire extinguisher operations in the open quadrangle, allowing every student hands-on experience in controlling controlled fires.`,
    images: [
      "/images/studentss.jpeg",
      "/images/students.jpeg"
    ]
  },
  {
    id: "EVT-106",
    title: "Annual Campus Sports & Athletic Meet",
    category: "Sports",
    date: "May 10, 2026",
    status: "Published",
    description: `The spirit of camaraderie and physical fitness took center stage at the Don Bosco SERI Annual Campus Sports Meet held at the institute playfields.

Students from all trade sections competed enthusiastically across 100m sprint, relay races, football tournament matches, volleyball, chess, and tug-of-war. The Fitter section won the coveted Overall Champions Trophy after a thrilling final football match.

Fr. Rector praised the sportsmanship of all participants and presented trophies, medals, and certificates during the closing retreat.`,
    images: [
      "/images/students.jpeg",
      "/images/studentsss.jpeg"
    ]
  }
];

export function getStoredEvents() {
  if (typeof window === "undefined") return INITIAL_EVENTS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    const parsed = JSON.parse(data);
    // If stored array is empty or lacks rich text, combine or refresh with initial events
    if (!parsed || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    return parsed;
  } catch (err) {
    console.error("Error reading events from storage", err);
    return INITIAL_EVENTS;
  }
}

export function saveStoredEvents(events) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new CustomEvent(EVENT_CHANGE_EVENT, { detail: events }));
  } catch (err) {
    console.error("Error saving events to storage", err);
  }
}

export function addEvent(eventData) {
  const events = getStoredEvents();
  const newEvent = {
    id: `EVT-${Date.now().toString().slice(-4)}`,
    title: eventData.title || "Untitled Event",
    category: eventData.category || "General",
    date: eventData.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    status: eventData.status || "Published",
    description: eventData.description || "",
    images: eventData.images && eventData.images.length > 0 ? eventData.images : ["/images/students.jpeg"]
  };
  const updated = [newEvent, ...events];
  saveStoredEvents(updated);
  return newEvent;
}

export function updateEvent(id, updatedFields) {
  const events = getStoredEvents();
  const updated = events.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveStoredEvents(updated);
  return updated;
}

export function deleteEvent(id) {
  const events = getStoredEvents();
  const updated = events.filter((item) => item.id !== id);
  saveStoredEvents(updated);
  return updated;
}

export function subscribeEvents(callback) {
  if (typeof window === "undefined") return () => {};
  const handler = (e) => callback(e.detail || getStoredEvents());
  window.addEventListener(EVENT_CHANGE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_CHANGE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
