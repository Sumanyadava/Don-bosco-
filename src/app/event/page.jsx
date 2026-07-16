import { CalendarCheck, Images } from "lucide-react";
import { FeatureGrid, FinalCta, Hero, PlaceholderVisual, SectionIntro } from "../components/PageParts";
import BannerPlaceholder from "../components/BannerPlaceholder";
import { eventCalendar, events, eventStories } from "../data";

export default function EventPage() {
  return (
    <main>
      <Hero
        eyebrow="Event"
        title="Campus events, counselling, and training moments."
        text="A dedicated event page for admission counselling, workshop activity, certificate moments, and future institute announcements."
        primaryHref="/inquiry"
        primaryLabel="Ask About Events"
        secondaryHref="/admission"
        secondaryLabel="Courses"
        visualLabel="Replace with campus event photo"
      />
<BannerPlaceholder />

      <section className="section bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Events"
            title="Institute activity areas for students and parents."
            text="Replace these placeholder events with real calendar dates, galleries, and announcements."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((event) => (
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

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <div className="signature-coral grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
            <Images size={42} />
            <div>
              <h2 className="text-4xl font-normal leading-tight text-white">Event gallery space</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80">
                This section is ready for real campus photos, workshop snapshots, and certificate distribution images.
              </p>
            </div>
            <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
              <PlaceholderVisual label="Gallery image placeholder" tone="surface-peach" />
              <PlaceholderVisual label="Workshop image placeholder" tone="surface-mint" />
              <PlaceholderVisual label="Certificate image placeholder" tone="surface-yellow" />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro eyebrow="Calendar placeholders" title="Add upcoming event dates and notices here." />
          <FeatureGrid items={eventCalendar} columns="md:grid-cols-2 xl:grid-cols-4" />
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
