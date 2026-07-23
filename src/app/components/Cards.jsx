import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Wrench,
  HeartHandshake,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const quickFacts = [
  {
    icon: CalendarDays,
    label: "Class starts in",
    value: "January and July",
    src: null,
  },
  {
    icon: Wrench,
    label: "Course types",
    value: "ITI and 6-month trades",
    src: "/itismall.jpg",
  },
  {
    icon: HeartHandshake,
    label: "Facility",
    value: "Hostel available",
    src: "/Hostel.jpeg",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Liluah, Howrah",
    src: "/maps.png",
  },
  // { icon: Sparkles, label: "Admission", value: "Going on" }
];

const Cards = () => {
  return (
    <motion.section
      className="section pt-0"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-10 lg:px-12">
        {quickFacts.map((fact, key) => {
          const IconComponent = fact.icon;
          return (
            <div
              key={key}
              className="card bg-blue-900 image-full w-full shadow-sm"
            >
              <figure>
                {fact.src ? (
                  <Image
                    src={fact.src}
                    alt={fact.label}
                    loading="lazy"
                    className="object-cover"
                    width={600}
                    height={400}
                  />
                ) : null}
              </figure>
              <div className="card-body justify-between">
                <div className=" ">
                  {IconComponent && <IconComponent className="w-10 h-10" />}
                </div>
                <div>
                  <h2 className="card-title text-white text-base">
                    {fact.label}
                  </h2>
                  <p className="text-white/80 text-sm mt-1">{fact.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Cards;
