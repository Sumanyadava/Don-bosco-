import { Check } from "lucide-react";
import { CourseGrid, FeatureGrid, FinalCta, Hero, PlaceholderVisual, SectionIntro } from "../components/PageParts";
import { admissionChecklist, admissionNotices, admissionSteps } from "../data";

export default function AdmissionPage() {
  return (
    <main>
      <Hero
        eyebrow="Admission"
        title="Admission information from the institute notice."
        text="Review each course duration, eligibility, certificate body, and class starting month before contacting the Don Bosco SERI office."
        primaryHref="/inquiry"
        primaryLabel="Make Inquiry"
        secondaryHref="/event"
        secondaryLabel="See Events"
        visualLabel="Replace with admission counselling photo"
      />

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Course table"
            title="Available trade and skill courses."
            text="This course list uses information from the admission notice. Replace or expand descriptions later with syllabus, fee, seat, and instructor details."
          />
          <CourseGrid />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <div className="signature-dark">
            <p className="caption text-white/70">Admission process</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-normal leading-tight text-white">
              A simple path from course selection to office confirmation.
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {admissionSteps.map((step) => (
                <article key={step.title} className="rounded-lg bg-[var(--canvas)] p-6 text-[var(--ink)]">
                  <step.icon size={28} />
                  <h3 className="mt-8 text-xl font-normal">{step.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[var(--body)]">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-12">
          <div>
            <p className="caption">Checklist</p>
            <h2 className="mt-4 text-4xl font-normal leading-tight text-[var(--ink)]">
              Replace this checklist with final admission requirements.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[var(--body)]">
              Use this area for official document rules, fee notes, office timing, guardian requirements, and hostel admission details.
            </p>
            <div className="mt-8">
              <PlaceholderVisual label="Admission document image placeholder" tone="surface-mint" />
            </div>
          </div>
          <div className="feature-card">
            <ul className="space-y-5">
              {admissionChecklist.map((item) => (
                <li key={item} className="flex gap-4 text-sm leading-6 text-[var(--body)]">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--ink)] text-white">
                    <Check size={15} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Admission notices"
            title="Add official notices here as admissions change."
            text="These cards are placeholders for notice-board content that can be updated every session."
          />
          <FeatureGrid items={admissionNotices} />
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
