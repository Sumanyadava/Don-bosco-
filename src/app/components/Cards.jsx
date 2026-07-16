import React from 'react'
import { motion } from "framer-motion";
import { CalendarDays, Wrench, HeartHandshake, MapPin, Sparkles } from "lucide-react";

const quickFacts = [
    { icon: CalendarDays, label: "Class starts", value: "January & July" },
    { icon: Wrench, label: "Course types", value: "ITI and 6-month trades" },
    { icon: HeartHandshake, label: "Facility", value: "Hostel available" },
    { icon: MapPin, label: "Location", value: "Liluah, Howrah" },
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
                        <div key={key} className="card bg-base-100 image-full w-full shadow-sm">
                            <figure>

                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt={fact.label} />
                            </figure>
                            <div className="card-body justify-between">
                                <div className=" ">

                                    {IconComponent && <IconComponent className="w-10 h-10" />}

                                </div>
                                <div>
                                    <h2 className="card-title text-white text-base">{fact.label}</h2>
                                    <p className="text-white/80 text-sm mt-1">{fact.value}</p>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.section>
    )
}

export default Cards