"use client"
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ContactBand,
  CourseGrid,
  FeatureGrid,
  FinalCta,
  JourneyRail,
  PlaceholderVisual,
  SectionIntro,
  StatStrip,
} from "./components/PageParts";
import { motion } from "framer-motion";
import {
  campusStats,
  highlights,
  journeySteps,
  programShowcase,
  testimonials,
} from "./data";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Section from "./components/Section";

export default function LandingPage() {
  return (
    <main>


      {/* <div className="absolute inset-0 z-0">
          <Image
            src="/mirpara.png"
            alt="Hero background"
            fill
            priority
            className="object-contain"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div> */}

      {/* Top Navigation */}


      {/* Hero Content */}


      {/* Huge Background Text */}
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img
            src="/images/studentsss.jpeg"
            className="w-full" />
        </div>
        <div id="item2" className="carousel-item w-full">
          <img
            src="/images/donbosco.jpeg"
            className="w-full" />
        </div>
        <div id="item3" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
            className="w-full" />
        </div>
        <div id="item4" className="carousel-item w-full">
          <img
            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
            className="w-full" />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2  text-white">
        <a href="#item1" className="rounded-full w-7 h-7 grid place-items-center bg-black border-2 border-white font-bold">1</a>
        <a href="#item2" className="rounded-full w-7 h-7 grid place-items-center bg-black border-2 border-white font-bold">2</a>
        <a href="#item3" className="rounded-full w-7 h-7 grid place-items-center bg-black border-2 border-white font-bold">3</a>
        <a href="#item4" className="rounded-full w-7 h-7 grid place-items-center bg-black border-2 border-white font-bold">4</a>
      </div>

      {/* facts and research  */}

      <Cards />

      <motion.section className="section bg-white" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Why Don Bosco"
            title="A practical campus story with room for your real content."
            text="These sections are written as polished placeholders. Replace the text and visual blocks with real course photos, student stories, lab images, and institute messages whenever you are ready."
          />
          <FeatureGrid items={highlights} />
        </div>
      </motion.section>

      <Section />

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Program showcase"
            title="Replace these cards with real campus highlights."
            text="Use this area for workshop photos, instructor profiles, student activities, placement notes, hostel images, or any content you want visitors to notice."
          />
          <FeatureGrid
            items={programShowcase}
            columns="md:grid-cols-2 xl:grid-cols-4"
          />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-12">
          <div>
            <p className="caption">Student journey</p>
            <h2 className="mt-4 text-4xl font-normal leading-tight text-[var-(--ink)]">
              A simple journey from inquiry to completion.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[var-(--body)]">
              Placeholder text for the institute's complete student journey.
              Replace each step with real process details, office timings, batch
              rules, and certificate instructions.
            </p>
            <div className="mt-8">
              <PlaceholderVisual
                label="Replace with student journey image"
                tone="surface-peach"
                tall
              />

              {/* <Image
            src="/mirpara.png"
            alt="Hero background"
            fill
            priority
            className="object-contain"
          /> */}
            </div>
          </div>
          <JourneyRail steps={journeySteps} />
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Campus snapshot"
            title="Numbers that can become your real institute metrics."
          />
          <StatStrip stats={campusStats} />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <div className="p-20 bg-red-300 rounded-2xl">
            <SectionIntro
              eyebrow="Testimonials"
              title="Replace these quotes with student, parent, and instructor voices."
              text="This placeholder block gives the homepage a warmer, more credible feel while you collect real content."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.name}
                  className="rounded-lg bg-white p-6 text-[var-(--ink)]"
                >
                  <p className="text-lg leading-8 text-black">"{item.quote}"</p>
                  <p className="caption mt-8 text-black">{item.name}</p>
                  <p className="mt-1 text-sm text-black">
                    {item.course}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
      <FinalCta />
    </main>
  );
}
