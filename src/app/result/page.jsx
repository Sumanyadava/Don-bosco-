import { CheckCircle2, FileSearch } from "lucide-react";
import { FeatureGrid, FinalCta, Hero, PlaceholderVisual, SectionIntro } from "../components/PageParts";
import { resultCards, resultRows, resultTimeline } from "../data";

export default function ResultPage() {
  return (
    <main>
      <Hero
        eyebrow="Result"
        title="Result and certificate update desk."
        text="A clean result page for students to understand where to check certificate, course completion, and batch result information."
        primaryHref="/inquiry"
        primaryLabel="Ask Office"
        secondaryHref="/admission"
        secondaryLabel="Admission"
        visualLabel="Replace with result notice board image"
      />

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-10 lg:px-12">
          <div>
            <FileSearch size={34} />
            <h2 className="mt-8 text-4xl font-normal leading-tight text-[var(--ink)]">
              Result notices should be verified with the office.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[var(--body)]">
              The original flyer provides admission information. This page creates a polished result area for the website while directing students to official institute confirmation.
            </p>
          </div>
          <div className="feature-card overflow-hidden p-0">
            {resultRows.map((row) => (
              <article key={row.batch} className="grid gap-4 border-b border-[var(--hairline)] p-6 last:border-0 md:grid-cols-[0.85fr_0.65fr_1.2fr]">
                <h3 className="text-lg font-normal text-[var(--ink)]">{row.batch}</h3>
                <p className="caption">{row.status}</p>
                <p className="text-sm leading-6 text-[var(--body)]">{row.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Result tools"
            title="Placeholder areas for result lookup and certificate updates."
            text="Add real search, PDF notices, result links, or certificate information here when available."
          />
          <FeatureGrid items={resultCards} />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <div className="cream-card grid gap-6 p-12 md:grid-cols-[auto_1fr] md:items-center">
            <CheckCircle2 size={36} />
            <div>
              <h2 className="text-3xl font-normal leading-tight text-[var(--ink)]">Keep your course documents ready.</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--body)]">
                Students may need admission details, course name, batch month, and identification when checking updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1fr_1fr] md:px-10 lg:px-12">
          <PlaceholderVisual label="Result announcement image placeholder" tone="surface-peach" tall />
          <div>
            <p className="caption">Result timeline</p>
            <h2 className="mt-4 text-4xl font-normal leading-tight text-[var(--ink)]">
              Replace this timeline with the real result publication process.
            </h2>
            <div className="mt-8 feature-card">
              <ol className="space-y-5">
                {resultTimeline.map((item, index) => (
                  <li key={item} className="grid gap-4 text-sm leading-6 text-[var(--body)] md:grid-cols-[48px_1fr]">
                    <span className="text-2xl font-normal text-[var(--ink)]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
