"use client";

import { useState } from "react";
import { GraduationCap, MessageSquare, Flag, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [category, setCategory] = useState("admission");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const categories = [
    {
      id: "admission",
      label: "Admission",
      desc: "Course & application info",
      icon: <GraduationCap size={22} strokeWidth={1.75} />,
      color: "text-blue-600",
      activeBg: "bg-blue-50 border-blue-600 text-blue-900",
    },
    {
      id: "inquiry",
      label: "General Inquiry",
      desc: "Ask us anything",
      icon: <MessageSquare size={22} strokeWidth={1.75} />,
      color: "text-emerald-600",
      activeBg: "bg-emerald-50 border-emerald-600 text-emerald-900",
    },
    {
      id: "complaint",
      label: "Feedback & Support",
      desc: "Share your thoughts",
      icon: <Flag size={22} strokeWidth={1.75} />,
      color: "text-amber-600",
      activeBg: "bg-amber-50 border-amber-600 text-amber-900",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !email.trim() || !message.trim()) {
      setStatus({
        type: "error",
        message: "Please complete all required fields (Name, Phone, Email, and Message).",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await addDoc(collection(db, "contacts"), {
        category,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        qualification: category === "admission" ? qualification.trim() : "",
        message: message.trim(),
        createdAt: serverTimestamp(),
        submittedAt: new Date().toISOString(),
      });

      setStatus({
        type: "success",
        message: `Thank you! Your ${category} request has been submitted successfully. We will get back to you soon!`,
      });

      // Clear fields
      setFullName("");
      setPhone("");
      setEmail("");
      setQualification("");
      setMessage("");
    } catch (err) {
      console.error("Firebase Firestore Error:", err);
      setStatus({
        type: "error",
        message:
          err?.message ||
          "Could not submit form due to a network or security policy error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Soft background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        {/* Form Card Container */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10 md:p-12 transition-all">
          <div className="mb-8 text-center sm:text-left">
            <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-100/70 rounded-full mb-3">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Contact & Inquiry Form
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Select your category below, fill in your details, and submit directly to our admissions team.
            </p>
          </div>

          {/* Feedback Status Alert */}
          {status && (
            <div
              className={`mb-8 p-4 rounded-2xl flex items-start gap-3 text-sm font-medium transition-all ${
                status.type === "success"
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">{status.message}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Category selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-3">
                Select Request Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        if (status) setStatus(null);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 ${
                        isSelected
                          ? cat.activeBg + " shadow-sm ring-1 ring-offset-0"
                          : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className={cat.color}>{cat.icon}</div>
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                            isSelected
                              ? "border-current bg-current"
                              : "border-slate-300"
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{cat.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{cat.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-sm"
              />
            </div>

            {category === "admission" && (
              <div>
                <label htmlFor="qualification" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Last Qualification / Trade Interest
                </label>
                <input
                  id="qualification"
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="e.g. 10th Pass / 12th Pass / Electrician trade"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-sm"
                />
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                {category === "admission"
                  ? "Educational Background & Course Preference"
                  : category === "complaint"
                  ? "Describe your Feedback / Issue"
                  : "Your Message / Question"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your details here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-sm resize-y"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                Your information is safely stored and processed via Firebase Firestore.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-black disabled:bg-slate-400 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Form</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

