import React from 'react'
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
} from "./PageParts";

const Section = () => {
  return (
    <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <div className="signature-coral grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:items-end">
            <div>
              <p className="caption text-white/70">Courses</p>
              <h2 className="mt-4 text-4xl font-normal leading-tight text-white">
                ITI, technical, solar, beauty, and tailoring training.
              </h2>
              <p className="mt-5 text-sm leading-6 text-white/80">
                Placeholder copy for the institute's course philosophy, training
                routine, workshop culture, and student outcomes.
              </p>
              <Link className="btn btn-secondary mt-8" href="/admission">
                See admission details <ArrowRight size={18} />
              </Link>
            </div>
            <CourseGrid limit={3} />
          </div>
        </div>
      </section>
  )
}

export default Section