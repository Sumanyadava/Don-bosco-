"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Images, Search, ChevronLeft, ChevronRight, X, Calendar, Tag, Sparkles } from "lucide-react";
import { FeatureGrid, FinalCta, Hero, PlaceholderVisual, SectionIntro } from "../components/PageParts";
import BannerPlaceholder from "../components/BannerPlaceholder";
import { eventCalendar, events as staticEvents, eventStories } from "../data";
import { getStoredEvents, subscribeEvents } from "../helper/eventStorage";
import { useRouter } from "next/navigation";

export default function EventPage() {
  const router = useRouter();
  const [eventList, setEventList] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setEventList(getStoredEvents());
    const unsubscribe = subscribeEvents((updated) => setEventList(updated));
    return () => unsubscribe();
  }, []);

  const publishedEvents = eventList.filter((e) => e.status === "Published" || !e.status);

  const filteredEvents = publishedEvents.filter((evt) => {
    const matchesCategory = activeCategory === "All" || evt.category === activeCategory;
    const matchesSearch =
      evt.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const navigateToEvent = (evt) => {
    router.push(`/event/${evt.id}`);
  };

  const closeLightbox = () => {
    setSelectedEvent(null);
    setActiveImageIndex(0);
  };


  const nextImage = () => {
    if (!selectedEvent || !selectedEvent.images) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
  };

  const prevImage = () => {
    if (!selectedEvent || !selectedEvent.images) return;
    setActiveImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
  };

  return (
    <main className="min-h-screen bg-base-100">
      <Hero
        eyebrow="Event Gallery & Campus Moments"
        title="Campus events, counselling, and live training moments."
        text="Explore stories, workshops, certificate ceremonies, and practical trade activities from Don Bosco SERI Liluah."
        primaryHref="/contact"
        primaryLabel="Ask About Events"
        secondaryHref="/courses"
        secondaryLabel="Explore Courses"
        visualLabel="Don Bosco Campus Event Gallery"
      />
      <BannerPlaceholder />

      {/* Main Interactive Event Gallery Section */}
      <section className="py-16 px-5 md:px-10 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="badge badge-primary badge-outline text-xs uppercase tracking-widest px-4 py-2 font-semibold">
            Campus Memory Feed
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-base-content tracking-tight">
            Latest Events & Highlights
          </h2>
          <p className="text-base-content/70 text-base md:text-lg">
            Stay updated with recent workshops, admissions drives, industrial visits, and student celebrations.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-base-200/50 p-4 md:p-6 rounded-3xl border border-base-300">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {["All", "Workshop", "Counselling", "Academic", "Cultural", "Sports"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm md:btn-md rounded-full transition-all duration-300 font-medium ${
                  activeCategory === cat
                    ? "btn-primary shadow-md shadow-primary/20 scale-105"
                    : "btn-ghost hover:bg-base-300 text-base-content/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={18} />
            <input
              type="text"
              placeholder="Search events & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered pl-11 rounded-full w-full bg-base-100 focus:outline-primary transition-all text-sm shadow-inner"
            />
          </div>
        </div>

        {/* Dynamic Card Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-base-200/30 rounded-3xl border border-dashed border-base-300">
            <Images size={48} className="mx-auto text-base-content/30 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-base-content/70">No campus events match your selection</h3>
            <p className="text-sm text-base-content/50 mt-2">Try clearing your search query or selecting another category.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredEvents.map((evt) => (
                <motion.article
                  key={evt.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigateToEvent(evt)}
                  className="card bg-base-100 border border-base-200 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    {/* Event Cover Image Container */}
                    <div className="relative h-60 w-full overflow-hidden bg-base-200">
                      {evt.images && evt.images.length > 0 ? (
                        <img
                          src={evt.images[0]}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-base-content/40 bg-gradient-to-br from-primary/10 to-secondary/10 font-medium">
                          Campus Memory Photo
                        </div>
                      )}

                      {/* Overlaid Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="badge badge-primary font-semibold text-xs py-2 shadow-sm">
                          {evt.category || "Event"}
                        </span>
                      </div>

                      {evt.images && evt.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 bg-neutral/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Images size={13} />
                          +{evt.images.length - 1} photos
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="card-body p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-primary mb-2">
                        <Calendar size={14} />
                        <span>{evt.date}</span>
                      </div>

                      <h3 className="card-title text-xl font-bold text-base-content group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {evt.title}
                      </h3>

                      <p className="text-sm text-base-content/70 leading-relaxed mt-2 line-clamp-3">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="px-6 pb-6 pt-0 flex justify-between items-center text-xs font-semibold text-primary">
                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View Gallery & Details &rarr;
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox / Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-base-100 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-base-300 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header & Close Button */}
              <button
                onClick={closeLightbox}
                className="btn btn-sm btn-circle btn-neutral absolute top-4 right-4 z-20 shadow-md"
              >
                <X size={18} />
              </button>

              {/* Main Image Slider View */}
              {selectedEvent.images && selectedEvent.images.length > 0 && (
                <div className="relative w-full h-[320px] md:h-[420px] bg-black flex items-center justify-center overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedEvent.images[activeImageIndex]}
                    alt={selectedEvent.title}
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                  />

                  {/* Navigation Arrows */}
                  {selectedEvent.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="btn btn-circle btn-sm md:btn-md bg-neutral/60 hover:bg-neutral text-white border-none absolute left-4 top-1/2 -translate-y-1/2 z-10"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="btn btn-circle btn-sm md:btn-md bg-neutral/60 hover:bg-neutral text-white border-none absolute right-4 top-1/2 -translate-y-1/2 z-10"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Counter overlay */}
                  <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-mono">
                    {activeImageIndex + 1} / {selectedEvent.images.length}
                  </div>
                </div>
              )}

              {/* Thumbnail Strip */}
              {selectedEvent.images && selectedEvent.images.length > 1 && (
                <div className="flex gap-2 p-4 bg-base-200/60 overflow-x-auto border-b border-base-300">
                  {selectedEvent.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx ? "border-primary scale-105 shadow-md" : "border-transparent opacity-60"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Event Content Details */}
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="badge badge-primary font-bold text-xs py-2 px-3">
                    <Tag size={12} className="mr-1 inline" />
                    {selectedEvent.category}
                  </span>
                  <span className="text-xs font-semibold text-base-content/60 flex items-center gap-1">
                    <Calendar size={14} />
                    {selectedEvent.date}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-base-content leading-snug">
                  {selectedEvent.title}
                </h2>

                <div className="divider my-2"></div>

                <p className="text-base text-base-content/80 leading-relaxed whitespace-pre-line">
                  {selectedEvent.description}
                </p>

                <div className="pt-6 flex justify-end">
                  <button onClick={closeLightbox} className="btn btn-primary rounded-full px-8">
                    Close Gallery
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static Highlights and Calendar Sections */}
      <section className="section bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Key Highlights"
            title="Institute activity areas for students and parents."
            text="Explore ongoing trade activities, practical workshops, and formal ceremonies."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {staticEvents.map((event) => (
              <article key={event.title} className={`demo-card min-h-[300px] ${event.tone} hover:shadow-lg transition`}>
                <CalendarCheck size={28} />
                <p className="caption mt-8">{event.month}</p>
                <h3 className="mt-4 text-2xl font-normal leading-tight text-[var(--ink)]">{event.title}</h3>
                <p className="mt-5 text-sm leading-6 text-[var(--body)]">{event.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Event stories"
            title="Use these cards for galleries, campus stories, and notice-board updates."
          />
          <FeatureGrid items={eventStories} columns="md:grid-cols-2 xl:grid-cols-4" />
        </div>
      </section>

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro eyebrow="Calendar schedules" title="Upcoming campus calendar dates and notice points." />
          <FeatureGrid items={eventCalendar} columns="md:grid-cols-2 xl:grid-cols-4" />
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
