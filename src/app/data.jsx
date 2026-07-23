import {
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  ClipboardCheck,
  Clock,
  FileCheck,
  GraduationCap,
  HeartHandshake,
  ImageIcon,
  ListChecks,
  MapPin,
  Megaphone,
  Phone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  UsersRound,
  Wrench
} from "lucide-react";

export const contact = {
  address: "120, Mirpara Road, Bhattanagar, Liluah, Howrah - 711203",
  phones: ["033 02645 6223", "033 2645 2005", "8902737058"],
  note: "Hostel facility available for both boys and girls."
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/inquiry", label: "Inquiry" },
  { href: "/admission", label: "Admission" },
  { href: "/result", label: "Result" },
  { href: "/event", label: "Event" }
];

export const courses = [
  {
    name: "Fitter (ITI)",
    duration: "2 Years",
    eligibility: "Class X pass, age 15-25",
    certificate: "DB SERI & ITI (NCVT, Delhi)",
    starts: "July"
  },
  {
    name: "Draughtsman Civil (ITI)",
    duration: "2 Years",
    eligibility: "Class X pass, age 15-25",
    certificate: "DB SERI & ITI (NCVT, Delhi)",
    starts: "July"
  },
  {
    name: "Refrigeration & Air Conditioning",
    duration: "6 Months",
    eligibility: "Class X pass, age 18-25",
    certificate: "DB SERI / WBSCTE",
    starts: "January & July"
  },
  {
    name: "Electrical & Solar - PV",
    duration: "6 Months",
    eligibility: "Class X pass, age 18-25",
    certificate: "DB SERI / WBSCTE",
    starts: "January & July"
  },
  {
    name: "Beautician's Course",
    duration: "6 Months",
    eligibility: "Class VIII, age 16 and above",
    certificate: "DB SERI",
    starts: "January & July"
  },
  {
    name: "Tailoring",
    duration: "6 Months",
    eligibility: "Class VIII, age 16 and above",
    certificate: "DB SERI",
    starts: "January & July"
  }
];

export const highlights = [
  {
    icon: GraduationCap,
    title: "Trade-focused training",
    text: "Courses are built around practical skills students can use for employment and self-employment."
  },
  {
    icon: ShieldCheck,
    title: "Recognised pathways",
    text: "Certificate pathways include DB SERI, WBSCTE, and NCVT Delhi for selected courses."
  },
  {
    icon: UsersRound,
    title: "Open to boys and girls",
    text: "The admission notice mentions hostel facility and course availability for both boys and girls."
  }
];

export const programShowcase = [
  {
    icon: Wrench,
    title: "Workshop based learning",
    text: "Placeholder text for workshop rooms, tools, safety practice, and supervised training activity.",
    image: "/images/studentsss.jpeg",
    tone: "surface-peach"
  },
  {
    icon: Target,
    title: "Career direction",
    text: "Placeholder text for placement support, career counselling, interview preparation, and job readiness.",
    image: "/images/studentss.jpeg",
    tone: "surface-mint"
  },
  {
    icon: Building2,
    title: "Campus facility",
    text: "Placeholder text for classrooms, labs, hostel support, student services, and campus environment.",
    image: "/images/students.jpeg",
    tone: "surface-yellow"
  },
  {
    icon: BookOpen,
    title: "Student support",
    text: "Placeholder text for mentoring, attendance guidance, parent communication, and academic help.",
    image: "/images/students.jpeg",
    tone: "surface-cream"
  }
];

export const journeySteps = [
  
  {
    label: "01",
    title: "Inquiry & Counseling",
    text: "Students interact with admissions officers to understand career options, course outcomes, and select the right program."
  },
  {
    label: "02",
    title: "Admission & Enrollment",
    text: "Verification of documents, eligibility review, fee guidance, and batch/schedule allocation."
  },
  {
    label: "03",
    title: "Core Training & Practical Labs",
    text: "Hands-on classroom sessions, lab exercises, tool usage, regular attendance, and skill assessments."
  },
  {
    label: "04",
    title: "Guest Lectures & Expert Interaction",
    text: "Special masterclasses and interactive sessions led by industry professionals to share market trends and real-world insights."
  },
  {
    label: "05",
    title: "Industrial Visit & Field Exposure",
    text: "On-site visits to operational plants, workshops, and facilities to witness industry workflows in real time."
  },
  {
    label: "06",
    title: "Certification & Placement Assistance",
    text: "Final evaluation, certificate issuance, resume preparation, and interview/placement drives with partner companies."
  }

];

export const campusStats = [
  { value: "06", label: "Trade courses", text: "Replace with final course count." },
  { value: "02", label: "Intake seasons", text: "January and July as shown in the notice." },
  { value: "03", label: "Contact numbers", text: "Replace or add official contact channels." },
  { value: "01", label: "Howrah campus", text: "Replace with real campus highlights." }
];

export const inquiryFields = [
  "Student name",
  "Phone number",
  // "Preferred course",
  "Last class passed"
];

export const inquiryTopics = [
  {
    icon: Phone,
    title: "Course selection",
    text: "Placeholder text for helping students compare ITI, technical, solar, beauty, and tailoring options."
  },
  {
    icon: CalendarDays,
    title: "Batch timing",
    text: "Placeholder text for admission windows, class start dates, office hours, and counselling slots."
  },
  {
    icon: HeartHandshake,
    title: "Hostel and support",
    text: "Placeholder text for hostel availability, support services, and parent visit information."
  }
];

export const faqItems = [
  {
    question: "What documents should I bring?",
    answer: "Placeholder answer for class certificate, age proof, identity proof, photographs, and any institute-specific forms."
  },
  {
    question: "Can I ask about course fees?",
    answer: "Placeholder answer directing students to the office for updated fee structure and payment schedule."
  },
  {
    question: "How do I confirm seat availability?",
    answer: "Placeholder answer explaining phone confirmation, office visit, and current batch availability."
  },
  {
    question: "Is hostel support available?",
    answer: "Placeholder answer based on the admission notice, with room for final hostel rules and availability."
  }
];

export const admissionSteps = [
  {
    icon: ClipboardCheck,
    title: "Choose a trade",
    text: "Review eligibility, duration, certificate, and starting month before applying."
  },
  {
    icon: Award,
    title: "Prepare documents",
    text: "Keep class certificate, age proof, identity proof, and recent photographs ready."
  },
  {
    icon: Phone,
    title: "Confirm at office",
    text: "Call or visit the institute to confirm seat availability and admission dates."
  }
];

export const admissionChecklist = [
  "Replace with required academic documents",
  "Replace with identity and age proof details",
  "Replace with photograph and application form notes",
  "Replace with fee confirmation and office timing",
  "Replace with guardian visit or signature requirement"
];

export const admissionNotices = [
  {
    title: "ITI admission notice",
    text: "Placeholder notice for Fitter and Draughtsman Civil admission, eligibility, batch dates, and certificate details."
  },
  {
    title: "Six-month course notice",
    text: "Placeholder notice for refrigeration, electrical, solar, beautician, and tailoring class schedules."
  },
  {
    title: "Hostel facility notice",
    text: "Placeholder notice for hostel contact, availability, rules, and office verification."
  }
];

export const resultRows = [
  {
    batch: "ITI Trades",
    status: "Result notice",
    detail: "Contact the office for Fitter and Draughtsman Civil result updates."
  },
  {
    batch: "Six-month Technical Courses",
    status: "Certificate update",
    detail: "Refrigeration, air conditioning, electrical, and solar students can check by phone."
  },
  {
    batch: "Skill Courses",
    status: "Office verification",
    detail: "Beautician and tailoring course results are available through institute confirmation."
  }
];

export const resultCards = [
  {
    icon: SearchCheck,
    title: "Search result notice",
    text: "Placeholder text for a future result lookup area using roll number, registration number, or course name."
  },
  {
    icon: FileCheck,
    title: "Certificate status",
    text: "Placeholder text for certificate distribution dates, verification status, and collection instructions."
  },
  {
    icon: Trophy,
    title: "Achievement board",
    text: "Placeholder text for student achievements, pass percentage, trade awards, and batch highlights."
  }
];

export const resultTimeline = [
  "Placeholder: internal assessment completed",
  "Placeholder: practical verification completed",
  "Placeholder: office result notice prepared",
  "Placeholder: certificate distribution scheduled"
];

export const events = [
  {
    title: "Admission Counselling",
    month: "Jan & Jul",
    text: "Guidance for students choosing ITI, technical, and short-term skill courses.",
    tone: "bg-[var(--signature-cream)] text-[var(--ink)]"
  },
  {
    title: "Workshop Practice Week",
    month: "Training",
    text: "Hands-on practical sessions for workshop, electrical, cooling, and trade skills.",
    tone: "bg-[var(--signature-mint)] text-[var(--ink)]"
  },
  {
    title: "Certificate Distribution",
    month: "After course",
    text: "A formal moment for students completing their training and institute requirements.",
    tone: "bg-[var(--signature-peach)] text-[var(--ink)]"
  }
];

export const eventStories = [
  {
    title: "Workshop day gallery",
    tag: "Gallery",
    text: "Placeholder text for workshop images, hands-on sessions, and instructor-led practice."
  },
  {
    title: "Counselling session",
    tag: "Admission",
    text: "Placeholder text for student orientation, parent interaction, and course guidance."
  },
  {
    title: "Campus notice board",
    tag: "Notice",
    text: "Placeholder text for upcoming events, holidays, batch timings, and institute announcements."
  },
  {
    title: "Student showcase",
    tag: "Training",
    text: "Placeholder text for student work, projects, completed assignments, and skill demonstrations."
  }
];

export const eventCalendar = [
  { icon: Megaphone, month: "January", title: "Admission orientation", text: "Placeholder event details." },
  { icon: ImageIcon, month: "March", title: "Campus gallery update", text: "Placeholder event details." },
  { icon: ListChecks, month: "July", title: "New batch welcome", text: "Placeholder event details." },
  { icon: Clock, month: "December", title: "Certificate follow-up", text: "Placeholder event details." }
];

export const quickFacts = [
  { icon: CalendarDays, label: "Class starts", value: "January & July" },
  { icon: Wrench, label: "Course types", value: "ITI and 6-month trades" },
  { icon: HeartHandshake, label: "Facility", value: "Hostel available" },
  { icon: MapPin, label: "Location", value: "Liluah, Howrah" },
  // { icon: Sparkles, label: "Admission", value: "Going on" }
];

export const testimonials = [
  {
    quote: "Placeholder testimonial from a student about training, workshop practice, and career confidence.",
    name: "Student Name",
    course: "Course name placeholder"
  },
  {
    quote: "Placeholder testimonial from a parent about guidance, hostel support, and office communication.",
    name: "Parent Name",
    course: "Relation placeholder"
  },
  {
    quote: "Placeholder testimonial from an instructor about practical learning and classroom discipline.",
    name: "Instructor Name",
    course: "Department placeholder"
  }
];

export const footerCtas = [
  { icon: Star, title: "Replace with institute promise", text: "Placeholder line for a strong final brand message." },
  { icon: Award, title: "Replace with certificate proof", text: "Placeholder line for certification and recognition." },
  { icon: UsersRound, title: "Replace with student life", text: "Placeholder line for student support and community." }
];
