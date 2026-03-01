"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, MapPin, Instagram, Facebook,
  Sparkles, Leaf, Calendar, CheckCircle2, Loader2, X, Wallet,
  Info, MessageCircle, Mail, Clock, ShieldCheck, Activity, Stethoscope, Heart, Droplets
} from "lucide-react";
import { createConsultationRequest } from "@/app/actions";

// --- DATA: HOMEOPATHIC SERVICES ---
const HOMEOPATHIC_SERVICES = [
  {
    id: 'constitutional',
    name: "Constitutional Homeopathy",
    subtitle: "Deep Healing",
    desc: "Treating the individual as a whole.",
    detail: "A highly individualized treatment approach that looks at your physical, mental, and emotional symptoms to find a single remedy that covers your entire being.",
    benefits: ["Treats Root Cause", "Boosts Immunity", "Long-lasting Results", "No Side Effects"],
    icon: Sparkles
  },
  {
    id: 'chronic',
    name: "Chronic Disease Management",
    subtitle: "Long-term Relief",
    desc: "Managing severe and prolonged ailments naturally.",
    detail: "Specialized homeopathic protocols to manage chronic conditions like arthritis, asthma, skin disorders, and autoimmune diseases safely and effectively.",
    benefits: ["Safe for all ages", "Reduces Dependency on Allopathy", "Improves Quality of Life", "Holistic Approach"],
    icon: Activity
  },
  {
    id: 'acute',
    name: "Acute Care",
    subtitle: "Rapid Relief",
    desc: "Fast-acting remedies for sudden illnesses.",
    detail: "Quick and effective homeopathic medicines for acute conditions like fevers, colds, coughs, sudden allergies, and minor injuries.",
    benefits: ["Fast Action", "Gentle on the Stomach", "Safe for Children", "Prevents Recurrence"],
    icon: Heart
  },
  {
    id: 'pediatric',
    name: "Pediatric Care",
    subtitle: "Child Health",
    desc: "Gentle and sweet pills for children.",
    detail: "Homeopathy is extremely safe and well-accepted by children. It builds their natural immunity to fight recurrent infections, tonsillitis, allergies, and behavioral issues.",
    benefits: ["Sweet Tasting Pills", "Builds Natural Immunity", "No Harsh Chemicals", "Treats Behavioral Issues"],
    icon: Droplets
  }
];

export default function LandingPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", symptoms: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.name) return alert("Name and Phone are required!");

    setLoading(true);
    const res = await createConsultationRequest(formData);
    setLoading(false);

    if (res.success) {
      alert("Request received! Our team will call you shortly to confirm the time.");
      setIsBookingModalOpen(false);
      setFormData({ name: "", phone: "", symptoms: "" });
    } else {
      alert("Error submitting request. Please try again.");
    }
  };

  const handleBookFromTreatment = () => {
    setFormData(prev => ({ ...prev, symptoms: `Inquiry about: ${selectedTreatment.name}` }));
    setSelectedTreatment(null);
    setIsBookingModalOpen(true);
  };

  const openTreatment = (item: any) => {
    setSelectedTreatment(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-sky-600 selection:text-white">

      {/* --- TOP BANNER --- */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-6 md:px-12 flex justify-between items-center z-50 relative border-b border-sky-500/30">
        <div className="flex gap-6 items-center">
          <a href="tel:+916352135799" className="flex items-center gap-2 bg-sky-600/20 text-sky-400 px-3 py-1 rounded-full font-medium hover:bg-sky-600 hover:text-white transition group">
            <Phone size={12} className="group-hover:animate-pulse" /> +91 63521 35799
          </a>
          <a href="mailto:contact@clinic.com" className="hidden md:flex items-center gap-2 text-slate-300 hover:text-sky-400 transition">
            <Mail size={12} /> contact@clinic.com
          </a>
        </div>
        <div className="flex gap-4 items-center text-slate-400">
          <span className="hidden md:inline text-xs">Mon-Sat: 10:00 AM - 7:00 PM</span>
        </div>
      </div>

      {/* --- MODERN NAVBAR --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 transition-all duration-300 shadow-sm">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center text-sky-600 shadow-inner">
              <Leaf size={24} />
            </div>
            <div className="leading-none flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dr. Mayank<span className="text-sky-600">.</span></h1>
              <span className="text-[10px] font-semibold text-slate-500 tracking-[0.15em] uppercase mt-1">Holistic Homeopathy</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link href="#about" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-sky-600 transition">About Doctor</Link>
            <Link href="#services" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Services</Link>
            <Link href="#contact" className="hidden md:block text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Contact</Link>

            <Link href="/login" className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2">
              Staff Portal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* --- PURE, MODERN HERO SECTION --- */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden bg-white">
        {/* Abstract Background blobs to replace old hero image completely */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50/60 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold tracking-wide uppercase mb-8 border border-sky-100">
              <ShieldCheck size={14} /> Safe, Gentle, Rapid Healing
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
              Root Cause Care, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                Natural Results.
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg font-medium">
              We provide highly individualized homeopathic care. By treating the patient rather than just the disease, we ensure lasting health without side effects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-sky-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-600/20 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Calendar size={20} /> Request an Appointment
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-sky-500" /> Constitutional Prescribing</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-sky-500" /> Non-Toxic Remedies</div>
            </div>
          </div>

          <div className="hidden md:block relative h-full min-h-[500px]">
            {/* Replaced old photo with a clean, trustworthy abstract aesthetic frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-50 to-slate-100 rounded-[2rem] border border-white shadow-2xl overflow-hidden flex items-center justify-center p-8">
              <div className="w-full h-full border border-sky-200/50 rounded-xl relative border-dashed p-6 flex flex-col justify-between backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Droplets className="text-sky-600" size={28} />
                  </div>
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-500 shadow-sm">100% Natural</span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-1/3 bg-slate-200/60 rounded-full"></div>
                  <div className="h-4 w-2/3 bg-slate-200/60 rounded-full"></div>
                  <div className="h-4 w-1/2 bg-slate-200/60 rounded-full"></div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-50 flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                    <Heart className="text-indigo-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Holistic Wellness</p>
                    <p className="text-xs text-slate-500">Mind, Body, and Spirit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- ABOUT DOCTOR SECTION --- */}
      <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-sky-900/30 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="order-2 md:order-1 relative group">
              <div className="aspect-square max-w-md mx-auto relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700">
                {/* Clean Placeholder instead of missing image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                  <Stethoscope size={64} className="mb-4 opacity-50" />
                  <p className="uppercase tracking-widest text-xs font-bold">Dr. Mayank Raval</p>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:right-10 bg-sky-600 text-white p-6 rounded-2xl shadow-xl transform group-hover:-translate-y-2 transition-transform">
                <p className="text-4xl font-bold mb-1">15+</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-100">Years of<br />Practice</p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="text-sky-400 font-bold text-xs uppercase tracking-widest bg-sky-900/50 px-3 py-1 rounded-full">Lead Physician</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Dr. Mayank Raval</h2>
              <p className="text-xl text-slate-400 font-medium mb-8">B.H.M.S</p>

              <div className="w-16 h-1 bg-sky-600 rounded-full mb-8"></div>

              <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                "Homeopathy is not just about treating symptoms; it's about treating the whole person. My goal is to restore health from the inside out."
              </p>

              <p className="text-slate-400 leading-relaxed mb-8">
                With deep expertise in Constitutional Homeopathy and Chronic Disease Management, Dr. Raval has helped thousands of patients achieve lasting health without the reliance on strong chemicals or invasive procedures.
              </p>

              <div className="flex flex-wrap gap-3">
                {['Constitutional Care', 'Pediatrics', 'Chronic Diseases', 'Immunity Building'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-semibold rounded-lg border border-slate-700">{tag}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-2 block">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Comprehensive Homeopathic Care</h2>
            <p className="text-slate-600 text-lg">
              Gentle, effective, and tailored remedies designed to trigger your body's innate healing response.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOMEOPATHIC_SERVICES.map((item) => (
              <div
                key={item.id}
                onClick={() => openTreatment(item)}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-sky-100 cursor-pointer transition-all duration-300 group flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-6 group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                  <item.icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-sm text-sky-600 font-semibold mb-4">{item.subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                  {item.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-sky-600 transition-colors">
                  Learn more <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- HOW IT WORKS / PHILOSOPHY --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">The Homeopathic Advantage</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">100% Natural</h3>
              <p className="text-slate-600">Sourced from highly diluted natural substances, our remedies carry absolutely zero toxic side effects.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Root Cause Focus</h3>
              <p className="text-slate-600">We don't just silence symptoms. We dive deep into your medical history to cure the illness from its source.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Builds Immunity</h3>
              <p className="text-slate-600">By stimulating the body's own defense mechanisms, homeopathy ensures long-lasting resilience and health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center text-white">
                  <Leaf size={18} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Dr. Mayank<span className="text-sky-500">.</span></h1>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Dedicated to providing pure, classical homeopathy. Your partner in genuine health, vitality, and well-being.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Visit Our Clinic</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <MapPin size={18} className="text-sky-500 shrink-0" />
                  <span>206, B-Block, 2nd Floor, Olive Greens, Gota, S.G. Highway, Ahmedabad - 382481</span>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/2EpwqWbUEQkiwR6k7" target="_blank" rel="noopener noreferrer" className="text-sky-400 font-bold hover:text-white transition inline-flex items-center gap-1">
                    Get Directions <ArrowRight size={14} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3 items-center">
                  <Phone size={18} className="text-sky-500 shrink-0" />
                  <a href="tel:+916352135799" className="hover:text-white transition">+91 63521 35799</a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail size={18} className="text-sky-500 shrink-0" />
                  <a href="mailto:contact@clinic.com" className="hover:text-white transition">contact@clinic.com</a>
                </li>
                <li className="flex gap-3 items-center">
                  <Clock size={18} className="text-sky-500 shrink-0" />
                  <span>Mon-Sat: 10AM - 7PM</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Dr. Mayank Raval. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-slate-300 transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-300 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* --- BOOKING MODAL --- */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Book Consultation</h2>
                <p className="text-sm text-slate-500">We will call you to confirm the time.</p>
              </div>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X size={24} />
              </button>
            </div>

            <div className="bg-sky-50 rounded-xl p-4 mb-6 flex items-center gap-4 border border-sky-100">
              <div className="bg-white text-sky-600 p-2.5 rounded-lg shadow-sm border border-sky-100">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-sky-700 uppercase tracking-widest mb-0.5">Consultation Fee</p>
                <p className="text-lg font-bold text-slate-900">₹500 <span className="text-xs font-medium text-slate-500 line-through ml-1">₹800</span></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input
                  required
                  className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 bg-slate-50/50 text-slate-900 transition-all font-medium"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  required
                  type="tel"
                  className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 bg-slate-50/50 text-slate-900 transition-all font-medium"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-2">Symptoms (Optional)</label>
                <textarea
                  className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 resize-none h-24 bg-slate-50/50 text-slate-900 transition-all font-medium"
                  placeholder="Tell us what you are experiencing..."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2 mt-4 shadow-xl shadow-slate-900/10"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- SERVICE DETAILS MODAL --- */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 relative border border-slate-100">

            {/* Header/Banner colored segment */}
            <div className="bg-slate-50 border-b border-slate-100 p-8 pb-10 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-sky-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <button
                onClick={() => setSelectedTreatment(null)}
                className="absolute top-6 right-6 z-20 bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 p-2 rounded-full transition-all border border-slate-200 shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="relative z-10 flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-sky-600 shadow-sm border border-slate-100 shrink-0">
                  <selectedTreatment.icon size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedTreatment.name}</h2>
                  <p className="text-sky-600 font-bold uppercase tracking-widest text-xs mt-2">{selectedTreatment.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Details Body */}
            <div className="p-8">
              <p className="text-lg text-slate-700 leading-relaxed mb-8 font-medium">
                {selectedTreatment.detail}
              </p>

              {selectedTreatment.benefits && (
                <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-500" /> Key Benefits
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {selectedTreatment.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="text-slate-700 text-sm flex items-center gap-3 font-medium">
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleBookFromTreatment}
                className="w-full bg-sky-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-sky-700 transition flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20"
              >
                <Calendar size={20} /> Request Therapy Consultation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}