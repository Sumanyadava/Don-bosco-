"use client";

import { useState, useMemo } from "react";
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  IndianRupee, 
  GraduationCap, 
  Wrench, 
  Scissors, 
  Laptop, 
  Award, 
  X,
  ArrowRight,
  Zap
} from "lucide-react";

const COURSES_DATA = [
  // --- FORMAL EDUCATION ---
  {
    id: 1,
    title: "ITI - Electrician Trade",
    category: "Formal",
    price: 60000,
    isFree: false,
    duration: "2 Years",
    icon: GraduationCap,
    badgeColor: "badge-primary",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    description: "NCVT recognized industrial training covering electrical wiring, power transformers, motor controls, safety standards, and industrial automation.",
    features: ["NCVT Recognized Certificate", "Industrial Workshop Training", "Placement Support"]
  },
  {
    id: 2,
    title: "Fitter Trade",
    category: "Formal",
    price: 60000,
    isFree: false,
    duration: "2 Years",
    icon: Wrench,
    badgeColor: "badge-primary",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    description: "Hands-on mechanical engineering training on lathe machines, precision fitting, blueprint reading, and industrial machinery assembly.",
    features: ["Heavy Lathe & Bench Work", "Plant Safety Standards", "Manufacturing Job Placement"]
  },
  {
    id: 3,
    title: "Refrigeration & AC (RAC)",
    category: "Formal",
    price: 60000,
    isFree: false,
    duration: "2 Years",
    icon: Wrench,
    badgeColor: "badge-primary",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800",
    description: "Specialized vocational course covering domestic & commercial AC installation, HVAC central plants, compressor repair, and gas charging.",
    features: ["HVAC System Diagnostics", "Commercial Repair Practice", "High Demand Field"]
  },

  // --- NON-FORMAL EDUCATION ---
  {
    id: 4,
    title: "Beautician & Wellness",
    category: "Non-Formal",
    price: 30000,
    isFree: false,
    duration: "3 to 6 Months",
    icon: Scissors,
    badgeColor: "badge-secondary",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    description: "Professional beauty culture course covering skincare, hair styling, bridal makeup, salon hygiene, and cosmetic techniques.",
    features: ["Professional Beauty Kit", "Self-Employment Guidance", "Salon Internship"]
  },
  {
    id: 5,
    title: "Tailoring & Garment Making",
    category: "Non-Formal",
    price: 30000,
    isFree: false,
    duration: "3 to 6 Months",
    icon: Scissors,
    badgeColor: "badge-secondary",
    image: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&q=80&w=800",
    description: "Comprehensive apparel training in pattern drafting, modern stitching techniques, boutique design, alterations, and garment assembly.",
    features: ["Pattern Cutting Mastery", "Boutique Business Setup", "Hands-on Sewing Machines"]
  },

  // --- DB TECH (FREE COURSES) ---
  {
    id: 6,
    title: "Graphic Design",
    category: "DB Tech",
    price: 0,
    isFree: true,
    duration: "45 - 55 Days",
    icon: Laptop,
    badgeColor: "badge-accent",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    description: "Learn modern visual design principles, vector creation, poster editing, branding tools, and portfolio building.",
    features: ["100% Free Training", "Software Lab Access", "Certificate Provided"]
  },
  {
    id: 7,
    title: "Basic Computer & Digital Literacy",
    category: "DB Tech",
    price: 0,
    isFree: true,
    duration: "45 Days",
    icon: Laptop,
    badgeColor: "badge-accent",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    description: "Essential computer training including MS Office (Word, Excel, PowerPoint), internet navigation, email communications, and digital skills.",
    features: ["100% Free Training", "Data Entry Practice", "Digital Mitra Ready"]
  },
  {
    id: 8,
    title: "Kitchen Training & Hospitality",
    category: "DB Tech",
    price: 0,
    isFree: true,
    duration: "45 Days",
    icon: Award,
    badgeColor: "badge-accent",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    description: "Professional culinary and kitchen operational training covering food hygiene, prep techniques, quick service, and commercial kitchen safety.",
    features: ["100% Free Training", "Commercial Kitchen Exposure", "Hotel Industry Placement"]
  },
  {
    id: 9,
    title: "Multi-Skill Technician",
    category: "DB Tech",
    price: 0,
    isFree: true,
    duration: "55 Days",
    icon: Wrench,
    badgeColor: "badge-accent",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800",
    description: "Multi-disciplinary practical training in home appliance repair, basic electrical wiring, plumbing fundamentals, and facility maintenance.",
    features: ["100% Free Training", "Multi-Trade Skills", "Immediate Job Readiness"]
  },
];

const CATEGORIES = ["All", "Formal", "Non-Formal", "DB Tech"];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCourse, setActiveCourse] = useState(null);

  // Filter logic
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesCategory = 
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-base-300 text-base-content pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">

        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Admissions Open 2026
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-base-content">
            Professional & Vocational Courses
          </h1>
          <p className="text-base-content/70 text-sm sm:text-lg">
            Choose from NCVT recognized formal ITI education, skill-building non-formal training, or 100% free DB Tech certification programs.
          </p>
        </div>

        {/* SEARCH & CATEGORY FILTER */}
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course name or skill..."
                className="input input-bordered input-sm sm:input-md w-full pl-10 focus:input-primary"
              />
            </div>

            {/* Filter Tabs */}
            <div className="tabs tabs-boxed bg-base-200 p-1 w-full sm:w-auto overflow-x-auto justify-start sm:justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`tab tab-sm sm:tab-md font-medium transition-all ${
                    selectedCategory === cat ? "tab-active font-bold" : ""
                  }`}
                >
                  {cat === "DB Tech" ? "DB Tech (Free)" : cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* COURSES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const Icon = course.icon;
            return (
              <div 
                key={course.id}
                className="card bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 group overflow-hidden flex flex-col justify-between"
              >
                {/* IMAGE CONTAINER WITH OVERLAYS */}
                <div className="relative aspect-[16/9] overflow-hidden bg-base-300">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-black/30" />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className={`badge ${course.badgeColor} badge-sm font-semibold uppercase tracking-wider shadow-md`}>
                      {course.category}
                    </span>

                    {course.isFree ? (
                      <span className="badge badge-success font-black text-[11px] uppercase shadow-md flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-current" /> Free Course
                      </span>
                    ) : (
                      <span className="badge bg-base-100/90 text-base-content backdrop-blur-md border border-base-200 font-extrabold text-xs shadow-md">
                        <IndianRupee className="w-3 h-3 text-primary inline" />
                        {course.price.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Duration Tag overlay on bottom left */}
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-medium text-white">
                      <Clock className="w-3 h-3 text-primary" />
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="card-body p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="card-title text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 pt-1 border-t border-base-200/60">
                    {course.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-base-content/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CARD FOOTER */}
                <div className="px-6 pb-6 pt-0">
                  <button
                    onClick={() => setActiveCourse(course)}
                    className="btn btn-primary btn-block btn-sm sm:btn-md"
                  >
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-base-100 rounded-3xl border border-base-200 shadow-inner">
            <BookOpen className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
            <p className="text-base-content/70 font-semibold text-lg">No courses found matching your filter.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="btn btn-ghost btn-xs text-primary mt-2"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>

      {/* DAISYUI DETAIL MODAL */}
      {activeCourse && (
        <div className="modal modal-open bg-slate-950/80 backdrop-blur-sm">
          <div className="modal-box max-w-xl bg-base-100 border border-base-200 relative p-0 overflow-hidden shadow-2xl">
            
            {/* Modal Image Header */}
            <div className="relative aspect-video w-full">
              <img 
                src={activeCourse.image} 
                alt={activeCourse.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-black/40" />
              
              <button 
                onClick={() => setActiveCourse(null)}
                className="btn btn-sm btn-circle bg-black/60 border-none text-white hover:bg-black absolute right-3 top-3 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className={`badge ${activeCourse.badgeColor} badge-sm uppercase font-semibold mb-2`}>
                  {activeCourse.category} Course
                </span>
                <h3 className="text-2xl font-black text-white drop-shadow-md">
                  {activeCourse.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-base-200 text-sm">
                <div className="flex items-center gap-1.5 font-extrabold text-primary">
                  {activeCourse.isFree ? (
                    <span className="text-success uppercase font-black flex items-center gap-1">
                      <Zap className="w-4 h-4 fill-current" /> 100% Free Course
                    </span>
                  ) : (
                    <>
                      <IndianRupee className="w-4 h-4" />
                      <span>{activeCourse.price.toLocaleString("en-IN")} Total Fee</span>
                    </>
                  )}
                </div>
                <div className="text-base-content/70 font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  {activeCourse.duration}
                </div>
              </div>

              <p className="text-sm text-base-content/80 leading-relaxed">
                {activeCourse.description}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                  Course Highlights & Benefits
                </h4>
                <div className="grid gap-2">
                  {activeCourse.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-base-content/80">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-action pt-4 border-t border-base-200">
                <button 
                  onClick={() => setActiveCourse(null)}
                  className="btn btn-ghost btn-sm"
                >
                  Close
                </button>
                <a 
                  href="/contact"
                  className="btn btn-primary btn-sm px-6"
                >
                  Apply / Enroll Now
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}