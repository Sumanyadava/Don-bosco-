"use client";

import { useState } from "react";
import { Check, Mail, Map, MapIcon, MapPin, PhoneCall, Send, GraduationCap, MessageSquare, Flag, ArrowRight, Import } from "lucide-react";
import { ContactBand, FaqList, FeatureGrid, FinalCta, Hero, PlaceholderVisual, SectionIntro } from "../components/PageParts";
import { contact, faqItems, inquiryFields, inquiryTopics, admissionChecklist } from "../data";
import Image from "next/image";

export default function InquiryPage() {
  const [formType, setFormType] = useState("admission");

  const formTypes = [
    { id: "admission", label: "Admission", desc: "Start your journey", icon: <GraduationCap size={24} strokeWidth={1.5} />, color: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600" },
    { id: "inquiry", label: "Inquiry", desc: "Ask us anything", icon: <MessageSquare size={24} strokeWidth={1.5} />, color: "text-emerald-600", bg: "bg-emerald-600/10", border: "border-emerald-600" },
    { id: "complaint", label: "Feedback", desc: "Help us improve", icon: <Flag size={24} strokeWidth={1.5} />, color: "text-amber-600", bg: "bg-amber-600/10", border: "border-amber-600" },
  ];

  return (
    <main>
      <Hero
        eyebrow="Contact & Support"
        title="We're here to help with admissions, inquiries, and support."
        text="Choose the relevant category below so we can route your request to the right department."
        primaryHref="/cources"
        primaryLabel="Check Courses"
        secondaryHref="/events"
        secondaryLabel="View Events"
        visualLabel="/images/mst.jpg"
      />

      <section className="relative py-24 bg-white overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

            {/* Left side text - High impact */}
            <div className="lg:w-5/12 pt-4">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="h-[1px] w-8 bg-primary"></div>
                <span className="text-primary font-semibold tracking-widest uppercase text-xs">Reach Out</span>
              </div>

              <h2 className="text-5xl lg:text-7xl font-light text-[var(--ink)] tracking-tight leading-[1.1] mb-8">
                Let's start a <br />
                <span className="font-serif italic text-primary">conversation.</span>
              </h2>

              <p className="text-lg text-[var(--body)] mb-12 leading-relaxed max-w-md">
                Whether you have a question about admissions, need support, or want to share your thoughts, our team is ready to help you find the answers.
              </p>

              {/* Contact info as modern minimal cards */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="group relative bg-base-100 p-6 rounded-3xl border border-base-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--ink)] mb-1">Campus</h4>
                  <p className="text-sm text-[var(--body)] leading-relaxed">Don Bosco SERI,<br />Kolkata, India</p>
                </div>

                <div className="group relative bg-base-100 p-6 rounded-3xl border border-base-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    <PhoneCall size={20} />
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--ink)] mb-1">Call Us</h4>
                  <p className="text-sm text-[var(--body)] leading-relaxed">Mon - Fri<br />9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right side form - Modern elevated card UI */}
            <div className="lg:w-7/12 w-full">
              <form className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] p-8 sm:p-12 lg:p-14 border border-base-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>

                <h3 className="text-2xl font-semibold text-[var(--ink)] mb-8">What can we help you with?</h3>

                {/* Big custom interactive tiles for category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                  {formTypes.map((type) => (
                    <label
                      key={type.id}
                      className={`relative cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 ease-out flex flex-col items-start gap-4 group overflow-hidden ${formType === type.id
                        ? `${type.border} ${type.bg} shadow-md`
                        : `border-base-200 hover:border-base-300 bg-white hover:bg-base-50`
                        }`}
                    >
                      <input
                        type="radio"
                        name="contact_type"
                        className="hidden"
                        checked={formType === type.id}
                        onChange={() => setFormType(type.id)}
                      />
                      <div className={`transition-colors ${formType === type.id ? type.color : 'text-base-content/40 group-hover:text-base-content/60'
                        }`}>
                        {type.icon}
                      </div>

                      <div>
                        <span className={`block font-semibold mb-0.5 ${formType === type.id ? 'text-[var(--ink)]' : 'text-[var(--ink)]'}`}>
                          {type.label}
                        </span>
                        <span className={`text-xs ${formType === type.id ? 'text-[var(--ink)]/70' : 'text-[var(--body)]'}`}>
                          {type.desc}
                        </span>
                      </div>

                      {/* Active indicator dot */}
                      {formType === type.id && (
                        <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-current text-inherit" />
                      )}
                    </label>
                  ))}
                </div>

                <div className="space-y-8">
                  {/* Minimal inputs with floating bottom border style */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="relative pt-5 group">
                      <input type="text" id="name" className="peer w-full border-b-2 border-base-200 bg-transparent py-2 text-[var(--ink)] placeholder-transparent focus:border-[var(--ink)] focus:outline-none transition-colors" placeholder="Name" />
                      <label htmlFor="name" className="absolute left-0 top-0 text-sm font-medium text-[var(--body)] transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--ink)] cursor-text">Full Name</label>
                    </div>
                    <div className="relative pt-5 group">
                      <input type="tel" id="phone" className="peer w-full border-b-2 border-base-200 bg-transparent py-2 text-[var(--ink)] placeholder-transparent focus:border-[var(--ink)] focus:outline-none transition-colors" placeholder="Phone" />
                      <label htmlFor="phone" className="absolute left-0 top-0 text-sm font-medium text-[var(--body)] transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--ink)] cursor-text">Phone Number</label>
                    </div>
                  </div>

                  <div className="relative pt-5 group">
                    <input type="email" id="email" className="peer w-full border-b-2 border-base-200 bg-transparent py-2 text-[var(--ink)] placeholder-transparent focus:border-[var(--ink)] focus:outline-none transition-colors" placeholder="Email" />
                    <label htmlFor="email" className="absolute left-0 top-0 text-sm font-medium text-[var(--body)] transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--ink)] cursor-text">Email Address</label>
                  </div>

                  {formType === 'admission' && (
                    <div className="relative pt-5 group transition-opacity duration-300">
                      <input type="text" id="qualification" className="peer w-full border-b-2 border-base-200 bg-transparent py-2 text-[var(--ink)] placeholder-transparent focus:border-[var(--ink)] focus:outline-none transition-colors" placeholder="Last Qualification" />
                      <label htmlFor="qualification" className="absolute left-0 top-0 text-sm font-medium text-[var(--body)] transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--ink)] cursor-text">Last Qualification (e.g. 10th, 12th, ITI)</label>
                    </div>
                  )}

                  <div className="relative pt-5 group">
                    <textarea id="message" className="peer w-full min-h-[120px] border-b-2 border-base-200 bg-transparent py-2 text-[var(--ink)] placeholder-transparent focus:border-[var(--ink)] focus:outline-none transition-colors resize-y" placeholder="Message"></textarea>
                    <label htmlFor="message" className="absolute left-0 top-0 text-sm font-medium text-[var(--body)] transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--ink)] cursor-text">
                      {formType === 'admission' ? 'Tell us about your educational background and interests...' : formType === 'complaint' ? 'Please describe the issue in detail...' : 'How can we help you?'}
                    </label>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-xs text-[var(--body)] max-w-[250px]">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                  <button className="w-full sm:w-auto px-8 py-4 bg-[var(--ink)] hover:bg-black text-white rounded-2xl font-medium flex items-center justify-center gap-4 transition-all duration-300 active:scale-95 group shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <span>Send Message</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </form>
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
            <div className="mt-8 z-40 relative">
              <Image
                src="/mirpara.png"
                alt="Student journey map"
                height={800}
                width={800}
                className="object-cover rounded-2xl"
              />
              
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
          {/* <div className="relative">
          <Image
            src="/mirpara.png"
            alt="Student journey map"
            fill
            priority
            className="object-cover "
          />
          </div> */}
          <Image
                src="/mirpara.png"
                alt="Student journey map"
                height={800}
                width={800}
                className="object-cover rounded-2xl"
              />
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
