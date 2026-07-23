"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Pin, 
  Bell, 
  Calendar, 
  Tag, 
  Download, 
  ChevronRight, 
  AlertCircle, 
  X, 
  Share2, 
  Check 
} from "lucide-react";

// Sample Notice Data
const SAMPLE_NOTICES = [
  {
    id: 1,
    title: "Urgent: Final Examination Schedule Released for Spring 2026",
    content: "The official timetable for the Spring 2026 semester final examinations is now published. All students are requested to check their respective course schedules and note down exam venues.",
    category: "Academic",
    date: "July 22, 2026",
    isPinned: true,
    isUrgent: true,
    attachments: [{ name: "Exam_Schedule_Spring2026.pdf", size: "2.4 MB" }],
    tags: ["Exams", "Schedule", "Spring2026"]
  },
  {
    id: 2,
    title: "Annual Tech Fest & Skill Exhibition Registration Open",
    content: "Registrations are now open for the annual institute exhibition. Categories include Robotics, Software Development, EV Innovation, and Vocational Showcase. Cash prizes worth ₹50,000 to be won!",
    category: "Events",
    date: "July 18, 2026",
    isPinned: true,
    isUrgent: false,
    attachments: [{ name: "TechFest_Guidelines.pdf", size: "1.1 MB" }],
    tags: ["TechFest", "Competition", "Innovation"]
  },
  {
    id: 3,
    title: "Admissions Open for 45-Day Digital Mitra & Skill Courses",
    content: "Applications are invited for short-term certification modules in Data Entry, Office Automation, and Technical Fundamentals. Limited seats available for the upcoming batch starting next month.",
    category: "General",
    date: "July 15, 2026",
    isPinned: false,
    isUrgent: false,
    attachments: [{ name: "Course_Brochure.pdf", size: "3.8 MB" }],
    tags: ["Admissions", "DigitalMitra", "SkillDevelopment"]
  },
  {
    id: 4,
    title: "Campus Wi-Fi & Server Maintenance Downtime",
    content: "Please note that the central network infrastructure will undergo scheduled routine maintenance this Saturday from 11:00 PM to 4:00 AM. Portal services will be temporarily unavailable.",
    category: "Urgent",
    date: "July 10, 2026",
    isPinned: false,
    isUrgent: true,
    attachments: [],
    tags: ["ITSupport", "Maintenance"]
  }
];

const CATEGORIES = ["All", "Academic", "Events", "Urgent", "General"];

export default function NoticePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeNotice, setActiveNotice] = useState(null);
  const [copied, setCopied] = useState(false);

  // Filter logic
  const filteredNotices = useMemo(() => {
    return SAMPLE_NOTICES.filter((notice) => {
      const matchesSearch = 
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === "All" || notice.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const pinnedNotices = useMemo(() => filteredNotices.filter(n => n.isPinned), [filteredNotices]);
  const regularNotices = useMemo(() => filteredNotices.filter(n => !n.isPinned), [filteredNotices]);

  const handleShare = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/notice#${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-base-300 text-base-content pb-20 selection:bg-primary selection:text-primary-content">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12">
        
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-10">
          <div className="badge badge-primary badge-outline gap-2 p-3 font-semibold uppercase tracking-wider mb-4">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            Official Bulletin & Updates
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Notice Board
          </h1>
          <p className="text-base-content/70 text-base sm:text-lg">
            Stay updated with the latest institutional announcements, academic schedules, circulars, and events.
          </p>
        </header>

        {/* Search & Category Filter Controls */}
        <div className="card bg-base-100 shadow-xl border border-base-200 mb-10">
          <div className="card-body p-4 sm:p-6 space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, keyword, or tag..."
                className="input input-bordered w-full pl-10 focus:input-primary text-sm"
              />
            </div>

            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`btn btn-sm text-xs rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "btn-primary"
                      : "btn-ghost bg-base-200 hover:bg-base-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notice Board List */}
        <div className="space-y-8">
          {/* Pinned Notices Section */}
          {pinnedNotices.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-warning font-bold text-xs uppercase tracking-wider">
                <Pin className="w-4 h-4" />
                Pinned Announcements
              </div>
              <div className="grid gap-4">
                {pinnedNotices.map((notice) => (
                  <NoticeCard 
                    key={notice.id} 
                    notice={notice} 
                    onClick={() => setActiveNotice(notice)} 
                  />
                ))}
              </div>
            </section>
          )}

          {/* Regular Notices Section */}
          <section className="space-y-4">
            {pinnedNotices.length > 0 && (
              <div className="text-base-content/60 text-xs font-bold uppercase tracking-wider pt-2">
                Recent Notices
              </div>
            )}

            {regularNotices.length > 0 ? (
              <div className="grid gap-4">
                {regularNotices.map((notice) => (
                  <NoticeCard 
                    key={notice.id} 
                    notice={notice} 
                    onClick={() => setActiveNotice(notice)} 
                  />
                ))}
              </div>
            ) : (
              pinnedNotices.length === 0 && (
                <div className="card bg-base-100 border border-base-200 text-center py-12">
                  <div className="card-body items-center">
                    <AlertCircle className="w-10 h-10 text-base-content/40 mb-2" />
                    <p className="text-base-content/70 text-sm font-medium">
                      No notices found matching your criteria.
                    </p>
                    <button 
                      onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                      className="btn btn-link btn-sm text-primary p-0"
                    >
                      Reset Search & Filters
                    </button>
                  </div>
                </div>
              )
            )}
          </section>
        </div>
      </div>

      {/* DaisyUI Notice Detail Modal */}
      <div className={`modal ${activeNotice ? "modal-open" : ""}`} role="dialog">
        {activeNotice && (
          <div className="modal-box max-w-2xl bg-base-100 p-0 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-base-100 border-b border-base-200 p-6 flex items-start justify-between gap-4 z-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CategoryBadge category={activeNotice.category} />
                  {activeNotice.isUrgent && (
                    <span className="badge badge-error badge-sm font-semibold">
                      Urgent
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-base-content leading-snug">
                  {activeNotice.title}
                </h2>
              </div>
              <button 
                onClick={() => setActiveNotice(null)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center gap-4 text-xs text-base-content/60 border-b border-base-200 pb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-base-content/40" />
                  Published {activeNotice.date}
                </span>
              </div>

              <div className="text-base-content/80 text-sm leading-relaxed whitespace-pre-line">
                {activeNotice.content}
              </div>

              {/* Attachments Section */}
              {activeNotice.attachments.length > 0 && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">
                    Attachments ({activeNotice.attachments.length})
                  </p>
                  <div className="space-y-2">
                    {activeNotice.attachments.map((file, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-base-200 border border-base-300 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <Download className="w-4 h-4 text-primary group-hover:scale-110 transition" />
                          <div>
                            <p className="text-xs font-medium text-base-content">{file.name}</p>
                            <p className="text-[10px] text-base-content/60">{file.size}</p>
                          </div>
                        </div>
                        <button className="btn btn-xs btn-primary btn-outline">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeNotice.tags.map((tag, i) => (
                  <span key={i} className="badge badge-ghost badge-sm gap-1 text-xs text-base-content/70">
                    <Tag className="w-3 h-3 text-base-content/40" />
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-action border-t border-base-200 p-4 bg-base-200/50 flex justify-between items-center m-0">
              <button
                onClick={() => handleShare(activeNotice.id)}
                className="btn btn-ghost btn-sm gap-1.5 text-xs text-base-content/70"
              >
                {copied ? <Check className="w-4 h-4 text-success" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Link Copied!" : "Share Link"}
              </button>

              <button
                onClick={() => setActiveNotice(null)}
                className="btn btn-primary btn-sm rounded-xl"
              >
                Close Notice
              </button>
            </div>
          </div>
        )}
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setActiveNotice(null)}>close</button>
        </form>
      </div>
    </div>
  );
}

// Subcomponent: Notice Card
function NoticeCard({ notice, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`card bg-base-100 hover:shadow-xl transition-all duration-200 cursor-pointer border ${
        notice.isPinned 
          ? "border-warning/50 shadow-md shadow-warning/5" 
          : "border-base-200 hover:border-base-300"
      }`}
    >
      <div className="card-body p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
          <div className="flex items-center flex-wrap gap-2">
            <CategoryBadge category={notice.category} />
            {notice.isUrgent && (
              <span className="badge badge-error badge-sm font-semibold">
                Urgent
              </span>
            )}
            {notice.isPinned && (
              <span className="badge badge-warning badge-sm gap-1 font-semibold">
                <Pin className="w-3 h-3 fill-warning" /> Pinned
              </span>
            )}
          </div>

          <span className="text-xs text-base-content/60 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-base-content/40" />
            {notice.date}
          </span>
        </div>

        <h3 className="card-title text-base sm:text-lg font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2">
          {notice.title}
        </h3>

        <p className="text-base-content/70 text-xs sm:text-sm line-clamp-2 leading-relaxed">
          {notice.content}
        </p>

        <div className="flex items-center justify-between pt-3 mt-2 border-t border-base-200">
          <div className="flex items-center gap-3 text-xs text-base-content/60">
            {notice.attachments.length > 0 && (
              <span className="flex items-center gap-1 text-base-content/80">
                <Download className="w-3.5 h-3.5 text-primary" />
                {notice.attachments.length} {notice.attachments.length === 1 ? "File" : "Files"}
              </span>
            )}
          </div>

          <span className="text-xs font-semibold text-primary flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Read Notice <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

// Category Badge Helper
function CategoryBadge({ category }) {
  switch (category) {
    case "Academic":
      return <span className="badge badge-primary badge-sm font-semibold">{category}</span>;
    case "Events":
      return <span className="badge badge-secondary badge-sm font-semibold">{category}</span>;
    case "Urgent":
      return <span className="badge badge-error badge-sm font-semibold">{category}</span>;
    default:
      return <span className="badge badge-accent badge-sm font-semibold">{category}</span>;
  }
}