import { Mail, PhoneCall, Send } from "lucide-react";
import { ContactBand, FaqList, FeatureGrid, FinalCta, Hero, PlaceholderVisual, SectionIntro } from "../components/PageParts";
import { contact, faqItems, inquiryFields, inquiryTopics } from "../data";

export default function InquiryPage() {
  return (
    <main>
      <Hero
        eyebrow="Inquiry"
        title="Ask about courses, eligibility, dates, and hostel facility."
        text="Use this page as a clear inquiry desk for students and parents before visiting the institute office."
        primaryHref="/admission"
        primaryLabel="Check Admission"
        secondaryHref="/result"
        secondaryLabel="View Results"
        visualLabel="Replace with inquiry desk image"
      />

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-12">
          <div>
            <p className="caption">Inquiry form</p>
            <h2 className="mt-4 text-4xl font-normal leading-tight text-[var(--ink)]">
              Keep these details ready before contacting the office.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[var(--body)]">
              The form is styled for the website design. For official admission confirmation, call or visit Don Bosco SERI directly.
            </p>
          </div>
          <form className="feature-card grid gap-4">
            {inquiryFields.map((field) => (
              <label key={field} className="grid gap-2 text-sm text-[var(--body)]">
                {field}
                <input className="input" placeholder={field} />
              </label>
            ))}
            <label className="grid gap-2 text-sm text-[var(--body)]">
              Message
              <textarea className="input min-h-32 resize-y py-3" placeholder="Tell us what you want to know" />
            </label>
            <button className="btn btn-primary w-fit" type="button">
              <Send size={18} /> Prepare Inquiry
            </button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro
            eyebrow="Inquiry topics"
            title="Give students clear routes before they contact the office."
            text="Replace these placeholders with the actual information students most often ask for."
          />
          <FeatureGrid items={inquiryTopics} />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 md:px-10 lg:px-12">
          <article className="signature-forest">
            <PhoneCall size={30} />
            <h2 className="mt-8 text-3xl font-normal leading-tight text-white">Call the institute</h2>
            <ul className="mt-6 space-y-2 text-sm text-white/80">
              {contact.phones.map((phone) => (
                <li key={phone}>{phone}</li>
              ))}
            </ul>
          </article>
          <article className="cream-card p-12">
            <Mail size={30} />
            <h2 className="mt-8 text-3xl font-normal leading-tight text-[var(--ink)]">Visit for final confirmation</h2>
            <p className="mt-5 text-sm leading-6 text-[var(--body)]">{contact.address}</p>
          </article>
        </div>
      </section>

      <section className="section bg-[var(--canvas)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-12">
          <div>
            <p className="caption">Office preview</p>
            <h2 className="mt-4 text-4xl font-normal leading-tight text-[var(--ink)]">
              Replace this section with real office, counselling, or reception photos.
            </h2>
            <p className="mt-5 text-sm leading-6 text-[var(--body)]">
              Placeholder text for how inquiry calls are handled, when students can visit, and what details they should bring.
            </p>
          </div>
          <PlaceholderVisual label="Inquiry office image placeholder" tone="surface-yellow" tall />
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
          <SectionIntro eyebrow="Common questions" title="Replace these answers with official inquiry guidance." />
          <FaqList items={faqItems} />
        </div>
      </section>

      <ContactBand />
      <FinalCta />
    </main>
  );
}
