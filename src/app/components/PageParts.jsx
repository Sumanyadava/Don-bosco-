"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  ImageIcon,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { contact, courses, footerCtas } from "../data";

export function PlaceholderVisual({
  label = "Image placeholder",
  tone = "surface-cream",
  tall = false,
  
}) {
  return (
    <div
      className={`placeholder-visual ${tone} ${tall ? "min-h-[360px]" : "min-h-[220px]"} glass`}
    > {label ? (
      <div className="placeholder-frame">
        <ImageIcon size={28} />
        <span>{label}</span>
        
      </div>
    ):(

      <Image
            src="/mirpara.png"
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />
    )
  }
    </div>
  );
}

export function SectionIntro({ eyebrow, title, text, align = "left" }) {
  return (
    <div
      className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className="caption">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-normal leading-tight text-black">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-sm leading-6 text-black">{text}</p>
      ) : null}
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  text,
  primaryHref = "/admission",
  primaryLabel = "Apply Now",
  secondaryHref = "/inquiry",
  secondaryLabel = "Make Inquiry",
  visualLabel = "Replace with institute hero image",
}) {
  return (
    <section className="hero-band">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1fr_0.82fr] md:px-10 lg:px-12">
        <div className="max-w-3xl self-center">
          <p className="caption">{eyebrow}</p>
          <h1 className="mt-5 text-5xl font-normal leading-[1.08] text-[var(--ink)] md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--body)]">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href={primaryHref}>
              {primaryLabel} <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-secondary" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[0.72fr_1fr] md:items-end">
          <div className="hidden md:block">
            <PlaceholderVisual label={visualLabel} tone="surface-mint" tall />
          </div>
          <div className="rounded-xl bg-[var(--signature-cream)] p-4">
            <Image
              src="/don-bosco.jpeg"
              alt="Don Bosco Institute admission flyer"
              width={900}
              height={1200}
              priority
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const courseImages = {
  "Fitter (ITI)":
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
  "Draughtsman Civil (ITI)":
    "https://images.unsplash.com/photo-1503387762-592ded58c454?auto=format&fit=crop&w=600&q=80",
  "Refrigeration & Air Conditioning":
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
  "Electrical & Solar - PV":
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80",
  "Beautician's Course":
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
  Tailoring:
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
};

export function CourseGrid({ limit }) {
  const visibleCourses = limit ? courses.slice(0, limit) : courses;
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <div className="relative group w-full min-w-0">
      <div 
        ref={carouselRef}
        className="carousel carousel-center bg-neutral rounded-box w-full space-x-4 p-4"
      >
      {visibleCourses.map((course) => {
        const imageUrl =
          courseImages[course.name] ||
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80";
        return (
          <div
            key={course.name}
            className="carousel-item w-[280px] sm:w-[320px] md:w-[350px]"
          >
            <div className="card image-full w-full shadow-xl overflow-hidden rounded-xl before:!bg-black/60">
              <figure className="h-full w-full">
                <img
                  src={imageUrl}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-6 flex flex-col justify-between h-full text-white">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="card-title text-lg sm:text-xl font-bold leading-snug text-white">
                    {course.name}
                  </h3>
                  <span className="rounded-md bg-[var(--signature-yellow)] px-3 py-1 text-xs sm:text-sm font-semibold text-black shrink-0 shadow-md">
                    {course.duration}
                  </span>
                </div>

                <div className="space-y-3 my-4">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70 block">
                      Eligibility
                    </span>
                    <span className="text-xs sm:text-sm font-medium mt-0.5 block">
                      {course.eligibility}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70 block">
                      Certificate
                    </span>
                    <span className="text-xs sm:text-sm font-medium mt-0.5 block">
                      {course.certificate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/20 font-semibold text-xs sm:text-sm text-white">
                  <CalendarDays
                    size={17}
                    className="text-[var(--signature-yellow)]"
                  />
                  <span>Classes start: {course.starts}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      
      <button 
        onClick={scrollLeft}
        className="btn btn-circle bg-none btn-sm md:btn-md absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg bg-base-100/80 hover:bg-base-100 "
        aria-label="Scroll left"
      >
        <ChevronLeft size={40} className="md:w-6 md:h-6 cursor-pointer bg-amber-500 text-black" /> 
        
        
      </button>
      <button 
        onClick={scrollRight}
        className="btn btn-circle btn-sm md:btn-md absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg bg-base-100/80 hover:bg-base-100 border-none"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>
    </div>
  );
}

export function FeatureGrid({ items, columns = "md:grid-cols-3" }) {
  return (
    <div className={`grid gap-6 ${columns}`}>
      {items.map((item) => (
        <article key={item.title} className={`demo-card ${item.tone || ""}`}>
          {item.icon ? <item.icon size={28} /> : null}
          {"image" in item ? (
            <div className="mt-6">
              {/* <Image src={item.image} alt="asd" fill className="object-contain " /> */}
              <PlaceholderVisual label={item.image} tone="surface-soft" />
            </div>
          ) : null}
          <h3 className="mt-8 text-xl font-normal leading-7 text-[var(--ink)]">
            {item.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-[var(--body)]">
            {item.text}
          </p>
        </article>
      ))}
    </div>
  );
}

export function JourneyRail({ steps }) {
  return (
    <div className="feature-card grid gap-0 p-0">
      {steps.map((step) => (
        <article
          key={step.label}
          className="grid gap-5 border-b border-[var(--hairline)] p-6 last:border-0 md:grid-cols-[80px_1fr]"
        >
          <span className="text-4xl font-normal leading-none text-[var(--ink)]">
            {step.label}
          </span>
          <div>
            <h3 className="text-xl font-normal text-[var(--ink)]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--body)]">
              {step.text}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function StatStrip({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="cream-card">
          <p className="text-5xl font-normal leading-none text-[var(--ink)]">
            {stat.value}
          </p>
          <h3 className="mt-5 text-lg font-normal text-[var(--ink)]">
            {stat.label}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--body)]">
            {stat.text}
          </p>
        </article>
      ))}
    </div>
  );
}

export function FaqList({ items }) {
  return (
    <div className="feature-card divide-y divide-[var(--hairline)] p-0">
      {items.map((item) => (
        <details key={item.question} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-normal text-[var(--ink)]">
            {item.question}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--hairline)]">
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--body)]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function ContactBand() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
        <div className="signature-dark  flex-col border-2 ">
          <div className="flex mb-2">
            <div>
              <p className="caption text-white/70">Contact office :-  8908342834  </p>
              <h2 className="mt-4 text-4xl font-normal leading-tight text-white">
                Visit the institute or call for current admission details.
              </h2>
            </div>
            {/* <div className="rounded-lg bg-[var(--canvas)] p-6 text-[var(--ink)]">
              <Phone
                className="mb-5 text-black dark:text-[var(--ink)] "
                size={26}
              />
              <ul className="space-y-2 text-sm text-black dark:text-[var(--ink)] ">
                {contact.phones.map((phone) => (
                  <li key={phone}>{phone}</li>
                ))}
              </ul>
            </div> */}
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.8876975695453!2d88.32008988637827!3d22.620668478254256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d531f7782b9%3A0x48556c91be84e4d2!2sDon%20Bosco%20Self%20Employment%20Research%20Institute!5e0!3m2!1sen!2sin!4v1784178547131!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-[450px] rounded-lg"
          ></iframe>

          <p className="rounded-lg bg-[var(--signature-cream)] p-4 mt-2 text-sm text-black md:col-span-2">
            {contact.note}
          </p>

        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section pt-0">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-12">
        <div className="cta-band-light">
          <div>
            <p className="caption">Next step</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-normal leading-tight text-[var(--ink)]">
              Replace this with a final admission message for students and
              parents.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {footerCtas.map((item) => (
              <article
                key={item.title}
                className="rounded-lg bg-[var(--canvas)] p-5"
              >
                <item.icon size={24} />
                <h3 className="mt-5 text-lg font-normal text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--body)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
          <Link className="btn btn-primary mt-8" href="/inquiry">
            Start Inquiry <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FullscreenHero({
  bgImage = "/mirpara.png",
  title = "When the whole family relies on you, rely on Luffu.",
  description = "From the founders of Fitbit™, Luffu (“loo-foo”) is the app that proactively watches over your family’s health and safety, giving you more peace of mind.",
  buttonLabel = "Join the waitlist",
  buttonHref = "/inquiry",
  watermarkText = "Luffu",
}) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[var(--primary)]">
      {/* Full screen background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-8 lg:px-12 w-full max-w-[1400px] mx-auto">
        {/* Logo */}
        <div className="flex items-center text-white">
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 5C20 5 24 9 24 14C24 19 20 20 20 20C20 20 16 19 16 14C16 9 20 5 20 5Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M35 20C35 20 31 16 26 16C21 16 20 20 20 20C20 20 21 24 26 24C31 24 35 20 35 20Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 35C20 35 16 31 16 26C16 21 20 20 20 20C20 20 24 21 24 26C24 31 20 35 20 35Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 20C5 20 9 24 14 24C19 24 20 20 20 20C20 20 19 16 14 16C9 16 5 20 5 20Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Right Actions */}
        <div className="flex items-center bg-[var(--canvas)] p-1 rounded-xl shadow-xl">
          <Link
            href="/admission"
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            About
          </Link>
          <Link
            href={buttonHref}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-[#1a202c] text-white hover:bg-black transition-colors"
          >
            {buttonLabel}
          </Link>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 w-full max-w-[1400px] mx-auto pb-32 pt-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-[4rem] lg:text-[4.5rem] font-medium leading-[1.05] text-white tracking-tight shadow-black/10 drop-shadow-sm">
            {title}
          </h1>
          <p className="mt-8 max-w-[520px] text-lg md:text-[19px] leading-[1.6] text-white/95 font-normal shadow-black/10 drop-shadow-md">
            {description}
          </p>
          <Link
            href={buttonHref}
            className="mt-10 inline-flex items-center gap-4 bg-[var(--canvas)] text-[var(--ink)] px-7 py-4 rounded-xl text-[15px] font-semibold w-fit hover:bg-[var(--surface-soft)] transition-colors shadow-xl"
          >
            <span className="w-1.5 h-1.5 bg-black rounded-full block"></span>
            {buttonLabel}
            <ArrowRight
              size={18}
              className="ml-1 text-gray-400"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>

      {/* Huge Background Text */}
      <div className="absolute z-10 bottom-0 left-0 w-full overflow-hidden pointer-events-none translate-y-[28%] px-4 md:px-12">
        <h2
          className="text-[10rem] md:text-[18rem] lg:text-[22rem] font-serif text-white leading-none tracking-tighter"
          style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
        >
          {watermarkText}
        </h2>
      </div>
    </section>
  );
}
