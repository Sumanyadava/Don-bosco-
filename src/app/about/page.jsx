"use client";

import { 
  Target, 
  Award, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Cpu, 
  HeartHandshake, 
  ArrowRight,
  Compass,
  Eye
} from "lucide-react";
import Link from "next/link";

// Key Statistics
const STATS = [
  { label: "Students Trained", value: "10,000+", icon: GraduationCap },
  { label: "Practical Courses", value: "25+", icon: BookOpen },
  { label: "Placement Rate", value: "92%", icon: Award },
  { label: "Industry Partners", value: "50+", icon: Users },
];

// Core Values
const VALUES = [
  {
    title: "Hands-on Practical Training",
    description: "We focus on real-world skills and lab-first learning, ensuring students are job-ready from day one.",
    icon: Cpu,
  },
  {
    title: "Industry-Aligned Curriculum",
    description: "Our training modules are continuously updated with modern tech standards and industry demands.",
    icon: Target,
  },
  {
    title: "Inclusive Empowerment",
    description: "Dedicated to creating accessible, affordable learning pathways for every aspiring individual.",
    icon: HeartHandshake,
  },
];

// Team / Leadership Members
const TEAM = [
  {
    name: "Fr. Director / Head Administrator",
    role: "Institutional Director",
    bio: "Passionate about youth development, vocational excellence, and community outreach.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Head of Vocational Training",
    role: "Technical Lead",
    bio: "Over 15 years guiding technical courses, electrical systems, and digital automation programs.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Placement Coordinator",
    role: "Industry Relations Lead",
    bio: "Connecting certified graduates with corporate partners and enterprise employers.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-300 text-base-content selection:bg-primary selection:text-primary-content pb-20">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 space-y-16">
        
        {/* HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="badge badge-primary badge-outline gap-2 p-3 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Skills • Transforming Futures
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Bridging Potential with Opportunity
          </h1>
          <p className="text-base-content/70 text-base sm:text-xl leading-relaxed">
            We are dedicated to offering high-quality technical education, digital literacy, and vocational skill-building to prepare students for meaningful, sustainable careers.
          </p>
        </section>

        {/* STATS HIGHLIGHT BOARD */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="card bg-base-100 border border-base-200 shadow-md text-center hover:border-primary/40 transition-colors"
              >
                <div className="card-body p-6 items-center">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary mb-1">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-base-content/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* MISSION & VISION SECTION */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="card bg-base-100 border border-base-200 shadow-xl hover:border-primary/40 transition-all">
            <div className="card-body p-6 sm:p-8 space-y-3">
              <div className="badge badge-primary gap-2 p-3 font-bold uppercase text-xs">
                <Compass className="w-4 h-4" /> Our Mission
              </div>
              <h3 className="card-title text-xl font-bold text-base-content">
                To Equip, Educate & Employ
              </h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                To deliver accessible, market-relevant vocational and technical education that empowers youth with practical skills, professional confidence, and direct career placement opportunities.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="card bg-base-100 border border-base-200 shadow-xl hover:border-secondary/40 transition-all">
            <div className="card-body p-6 sm:p-8 space-y-3">
              <div className="badge badge-secondary gap-2 p-3 font-bold uppercase text-xs">
                <Eye className="w-4 h-4" /> Our Vision
              </div>
              <h3 className="card-title text-xl font-bold text-base-content">
                A Future Driven by Skilled Potential
              </h3>
              <p className="text-base-content/70 text-sm leading-relaxed">
                To be a recognized leader in skill development and technical excellence, nurturing an inclusive ecosystem where every individual achieves sustainable livelihoods and drives local economic growth.
              </p>
            </div>
          </div>
        </section>

        {/* OUR STORY & HIGHLIGHTS */}
        <section className="card bg-base-100 border border-base-200 shadow-xl overflow-hidden">
          <div className="card-body p-6 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Our Journey & Impact
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-base-content leading-snug">
                Creating Practical Pathways to Personal and Technical Independence
              </h2>
              <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                Founded on the belief that skilled hands and clear minds build strong communities, our institute offers specialized training programs designed to match evolving industry demands.
              </p>
              <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                From short-term certification modules like <strong>Digital Mitra</strong> and data entry to full-scale technical vocational courses, we focus on hands-on practical lab experience and mentorship.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Government and industry-recognized certification paths",
                  "Dedicated placement support and career counseling",
                  "State-of-the-art practical workshops and computer labs",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-base-content/80">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-video rounded-2xl bg-base-200 border border-base-300 overflow-hidden flex items-center justify-center p-8 text-center shadow-inner">
                <div>
                  <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-bold text-base-content">Excellence in Vocational Education</h3>
                  <p className="text-xs text-base-content/60 mt-2 max-w-xs mx-auto">
                    Transforming novice learners into skilled professionals ready for the global workforce.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">Our Core Principles</h2>
            <p className="text-base-content/70 text-sm">The pillars that define our teaching philosophy and institutional culture.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx} 
                  className="card bg-base-100 border border-base-200 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="card-body p-6 space-y-2">
                    <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary mb-2">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="card-title text-lg font-bold text-base-content">{val.title}</h3>
                    <p className="text-base-content/70 text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* LEADERSHIP / TEAM */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">Guided by Experienced Leaders</h2>
            <p className="text-base-content/70 text-sm">Meet the educators and administrators dedicated to student growth.</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {TEAM.map((member, idx) => (
              <div 
                key={idx} 
                className="card bg-base-100 border border-base-200 shadow-md overflow-hidden group hover:shadow-xl transition-all"
              >
                <figure className="aspect-square relative bg-base-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </figure>
                <div className="card-body p-5 space-y-1">
                  <div>
                    <span className="badge badge-primary badge-sm font-semibold">
                      {member.role}
                    </span>
                  </div>
                  <h3 className="card-title text-base font-bold text-base-content pt-1">{member.name}</h3>
                  <p className="text-xs text-base-content/70 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="card bg-neutral text-neutral-content shadow-2xl border border-base-200 text-center overflow-hidden">
          <div className="card-body p-8 sm:p-12 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ready to Begin Your Skill Journey?
            </h2>
            <p className="text-neutral-content/80 text-sm sm:text-base">
              Explore our upcoming batches, technical certification modules, and career pathways.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link 
                href="/courses"
                className="btn btn-primary rounded-xl gap-2 shadow-lg"
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/contact"
                className="btn btn-outline btn-accent rounded-xl"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}