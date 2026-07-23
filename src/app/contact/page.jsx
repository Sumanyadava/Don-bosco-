import { Mail, Map, MapIcon, MapPin, PhoneCall, Send } from "lucide-react";
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
          <article className="cream-card ">
             <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.8876975695453!2d88.32008988637827!3d22.620668478254256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d531f7782b9%3A0x48556c91be84e4d2!2sDon%20Bosco%20Self%20Employment%20Research%20Institute!5e0!3m2!1sen!2sin!4v1784178547131!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-[250px] rounded-lg"
          ></iframe>

            
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
