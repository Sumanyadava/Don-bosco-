"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { getStoredEvents } from "@/app/helper/eventStorage";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    const events = getStoredEvents();
    const found = events.find((e) => e.id === id);
    setEvent(found || null);
  }, [id]);

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <button className="btn btn-primary ml-4" onClick={() => window.history.back()}>Back</button>
      </main>
    );
  }

  const nextImage = () => {
    setActiveImgIdx((prev) => (prev + 1) % (event.images?.length || 1));
  };
  const prevImage = () => {
    setActiveImgIdx((prev) => (prev - 1 + (event.images?.length || 1)) % (event.images?.length || 1));
  };

  return (
    <main className="min-h-screen bg-base-100 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => window.history.back()} className="btn btn-ghost btn-sm">
          <X size={20} />
        </button>
        <h1 className="text-3xl font-bold text-primary">{event.title}</h1>
      </div>

      {/* Image carousel */}
      {event.images && event.images.length > 0 && (
        <div className="relative w-full max-w-4xl mx-auto mb-8">
          <motion.img
            key={event.images[activeImgIdx]}
            src={event.images[activeImgIdx]}
            alt={`${event.title} image ${activeImgIdx + 1}`}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          {event.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      )}

      {/* Details */}
      <section className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-base-content/70">
          <CalendarCheck size={18} />
          <span>{event.date}</span>
          <span className="mx-2">|</span>
          <span className="badge badge-primary">{event.category || "Event"}</span>
        </div>
        <p className="text-base-content/80 text-lg">{event.description}</p>
        {event.images && event.images.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {event.images.map((src, idx) => (
              <motion.img
                key={idx}
                src={src}
                alt={`${event.title} thumb ${idx + 1}`}
                className="w-24 h-24 object-cover rounded"
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveImgIdx(idx)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
