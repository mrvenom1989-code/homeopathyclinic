"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Phone, MapPin, Instagram, Facebook,
  Sparkles, Leaf, Calendar, CheckCircle2, Loader2, X, Wallet,
  Info, MessageCircle, Mail, Clock, ShieldCheck, Activity, Stethoscope, Heart, Droplets,
  Smile, Wind, User, Brain
} from "lucide-react";
import { createConsultationRequest } from "@/app/actions";



const AILMENTS_CATEGORIES = [
  { name: "Hair Loss", icon: Sparkles },
  { name: "Skin Disorders", icon: Smile },
  { name: "Respiratory", icon: Wind },
  { name: "Child Health", icon: Heart },
  { name: "Women Health", icon: User },
  { name: "Weight Management", icon: Activity },
  { name: "Diabetes", icon: Droplets },
  { name: "Mental Health", icon: Brain },
];

const TREATMENTS_TAB = [
  "Hair Fall", "Alopecia", "Psoriasis", "Vitiligo", "Eczema", "Acne", "PCOS", "Infertility", "Respiratory", "Migraine", "Thyroid", "Diabetes", "Arthritis", "Mental Health", "Depression", "Child Health", "Skin Treatment", "Allergies", "Immunity", "Tonsils"
];

const AILMENT_IMAGES: Record<string, string> = {
  "Hair Fall": "/hair_care_1772479417900.png",
  "Alopecia": "/hair_care_1772479417900.png",
  "Psoriasis": "/skin_care_1772479434003.png",
  "Vitiligo": "/skin_care_1772479434003.png",
  "Eczema": "/skin_care_1772479434003.png",
  "Acne": "/skin_care_1772479434003.png",
  "Skin Treatment": "/skin_care_1772479434003.png",
  "PCOS": "/womens_health_1772479448868.png",
  "Infertility": "/womens_health_1772479448868.png",
  "Thyroid": "/womens_health_1772479448868.png",
  "Diabetes": "/womens_health_1772479448868.png",
  "Respiratory": "/respiratory_1772479467172.png",
  "Allergies": "/respiratory_1772479467172.png",
  "Immunity": "/respiratory_1772479467172.png",
  "Tonsils": "/respiratory_1772479467172.png",
  "Migraine": "/mental_health_1772479483594.png",
  "Mental Health": "/mental_health_1772479483594.png",
  "Depression": "/mental_health_1772479483594.png",
  "Arthritis": "/joint_care_1772479498336.png",
  "Child Health": "/child_care_1772479512977.png"
};

const TREATMENT_CONTENT: Record<string, any> = {
  "Hair Fall": {
    desc: "Hair fall affects nearly 1 in 3 adults in India, often beginning as hair shedding, hair thinning, or a visible scalp. When left untreated, it can quietly impact your confidence, appearance, and overall well-being.",
    points: [
      "At Dr. Mayank Raval's clinic, Dr. Mayank Raval provides personalised hair fall treatment focusing on the root cause.",
      "All our hair treatments are safe, natural & side-effect-free, and designed to reduce hair fall, strengthen hair roots, and support long-term results, ensuring natural hair regrowth."
    ]
  },
  "default": {
    desc: "Homeopathy provides safe and effective treatments for a wide range of acute and chronic conditions. By addressing the root cause, it ensures lasting relief without harmful side effects.",
    points: [
      "Dr. Mayank Raval conducts a detailed consultation to understand your unique symptoms, medical history, and constitution.",
      "He prescribes natural, non-toxic medicines tailored specifically to your body's needs to stimulate its innate healing capacity."
    ]
  }
};

export default function LandingPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Hair Fall");

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

  return (
    <div className="min-h-screen bg-[#f4f7f6] font-sans text-teal-900 selection:bg-amber-500 selection:text-white">

      {/* --- TOP BANNER --- */}
      <div className="bg-[#13382f] text-white text-xs py-2.5 px-6 md:px-12 flex justify-between items-center z-50 relative border-b border-amber-500/30">
        <div className="flex gap-6 items-center">
          <a href="tel:+919979133069" className="flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-medium hover:bg-amber-500 hover:text-white transition group">
            <Phone size={12} className="group-hover:animate-pulse" /> +91 99791 33069
          </a>
          <a href="mailto:lifetronhomeopathyamd@gmail.com" className="hidden md:flex items-center gap-2 text-slate-300 hover:text-amber-400 transition">
            <Mail size={12} /> lifetronhomeopathyamd@gmail.com
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
            <div className="shrink-0 overflow-hidden shadow-sm rounded-lg">
              <Image src="/logo.jpg" alt="Logo" width={160} height={90} className="w-28 h-auto object-cover" />
            </div>
            <div className="leading-none flex flex-col justify-center">
              <h1 className="text-2xl font-bold text-teal-950 tracking-tight">Dr. Mayank Raval<span className="text-amber-500">.</span></h1>
              <span className="text-[10px] font-semibold text-emerald-700 tracking-[0.15em] uppercase mt-1">Advanced Homeopathy</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Link href="#about" className="hidden md:block text-sm font-semibold text-emerald-800 hover:text-amber-500 transition">About Doctor</Link>
            <Link href="#contact" className="hidden md:block text-sm font-semibold text-emerald-800 hover:text-amber-500 transition">Contact</Link>

            <Link href="/login" className="bg-slate-100 text-teal-800 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition flex items-center gap-2">
              Staff Portal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* --- PURE, MODERN HERO SECTION --- */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden bg-[#f4f7f6]">
        {/* Soft Background glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-50/60 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-wide uppercase mb-8 border border-amber-200">
              <ShieldCheck size={14} /> Safe, Gentle, Rapid Healing
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-teal-950 leading-[1.1] mb-6 tracking-tight">
              Precision. Depth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-800 to-amber-600">
                Lasting Healing.
              </span>
            </h1>

            <p className="text-lg text-emerald-800 mb-10 leading-relaxed max-w-lg font-medium">
              We provide highly individualized homeopathic care. By treating the patient rather than just the disease, we ensure lasting health without side effects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-[#13382f] text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-900 hover:shadow-lg hover:shadow-teal-900/20 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Calendar size={20} /> Request an Appointment
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm font-medium text-emerald-700">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Constitutional Prescribing</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-amber-500" /> Non-Toxic Remedies</div>
            </div>
          </div>

          <div className="hidden md:flex relative h-full items-center justify-center">
            {/* The stunning new banner directly dictating its size */}
            <div className="relative w-full shadow-2xl overflow-hidden rounded-[2rem]">
              <Image
                src="/hero-bg.jpg"
                alt="Brand Banner"
                width={1200}
                height={675}
                className="w-full h-auto object-cover hover:scale-105 transition duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* --- ABOUT DOCTOR SECTION --- */}
      <section id="about" className="py-24 bg-[#13382f] text-white relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-amber-900/30 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="order-2 md:order-1 relative group">
              <div className="aspect-square max-w-md mx-auto relative rounded-3xl overflow-hidden bg-teal-900 border border-teal-700">
                <Image
                  src="/doctor.jpg"
                  alt="Dr. Mayank Raval"
                  fill
                  className="object-cover object-top hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 md:right-10 bg-amber-500 text-white p-6 rounded-2xl shadow-xl transform group-hover:-translate-y-2 transition-transform">
                <p className="text-4xl font-bold mb-1">7+</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">Years of<br />Practice</p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-900/50 px-3 py-1 rounded-full">Autoimmune & Chronic Disease Consultant</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">Dr. Mayank Raval</h2>
              <p className="text-xl text-slate-400 font-medium mb-8">M.D. (Homeopathy)</p>

              <div className="w-16 h-1 bg-amber-500 rounded-full mb-8"></div>

              <p className="text-slate-300 leading-relaxed mb-6 text-lg italic border-l-4 border-amber-600 pl-4">
                "True healing begins when we understand the individual beyond the diagnosis."
              </p>

              <p className="text-slate-400 leading-relaxed mb-6">
                Founder of Dr. Mayank Raval's Advanced Homeopathy Clinic, he is a trusted specialist in the management of autoimmune and chronic diseases. Since 2019, he has successfully treated 5000+ patients across the globe.
              </p>

              <p className="text-slate-400 leading-relaxed mb-8">
                Alongside his clinical practice, Dr. Mayank serves as a Professor in a Homeopathic Medical College, mentoring postgraduate students and guiding research into deep constitutional prescribing and immune system modulation.
              </p>

              <div className="flex flex-wrap gap-3">
                {['Autoimmune Disorders', 'Chronic Allergies', 'Hormonal Issues', 'Psychosomatic Care'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-teal-900 text-slate-300 text-sm font-semibold rounded-lg border border-teal-700">{tag}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* --- AILMENTS WE SPECIALIZE IN --- */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-teal-950 mb-12 text-center md:text-left">We Specialise in 100+ Ailments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {AILMENTS_CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center gap-4 group cursor-pointer p-4 rounded-xl hover:bg-[#f4f7f6] transition">
                <div className="w-12 h-12 bg-blue-50 text-[#13382f] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#13382f] group-hover:text-white transition">
                  <cat.icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-semibold text-emerald-900 text-center md:text-left">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TREATMENTS TABS SECTION --- */}
      <section className="py-20 bg-[#f4f7f6] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-teal-950 mb-10 text-center md:text-left">Ailments We Treat with Homeopathy</h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 pb-4 mb-10 border-b border-slate-200">
            {TREATMENTS_TAB.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-[#13382f] text-white shadow-md' : 'text-emerald-800 hover:bg-slate-200 bg-white border border-slate-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 grid md:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder area */}
            <div className="bg-teal-50 rounded-2xl aspect-square md:aspect-[4/3] flex items-center justify-center relative overflow-hidden group">
              <Image src={AILMENT_IMAGES[activeTab] || "/hero-bg.jpg"} alt={activeTab} fill className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-x-0 bottom-0 py-6 bg-gradient-to-t from-black/70 to-transparent flex justify-center text-white font-bold text-xl z-10">{activeTab} Treatment</div>
            </div>

            {/* Content area */}
            <div>
              <h3 className="text-3xl font-bold text-teal-950 mb-4">{activeTab}</h3>
              <p className="text-emerald-800 leading-relaxed mb-8">
                {TREATMENT_CONTENT[activeTab]?.desc || TREATMENT_CONTENT["default"].desc}
              </p>

              <h4 className="font-bold text-teal-950 text-xl mb-4">How Can We Help You?</h4>
              <ul className="space-y-4">
                {(TREATMENT_CONTENT[activeTab]?.points || TREATMENT_CONTENT["default"].points).map((pt: string, i: number) => (
                  <li key={i} className="flex gap-3 text-emerald-800 leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-2"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => setIsBookingModalOpen(true)} className="mt-10 bg-amber-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-600 transition shadow-lg shadow-amber-500/20">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS / PHILOSOPHY --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-950 mb-16">The Homeopathic Advantage</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold text-teal-950 mb-3">100% Natural</h3>
              <p className="text-emerald-800">Sourced from highly diluted natural substances, our remedies carry absolutely zero toxic side effects.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-bold text-teal-950 mb-3">Root Cause Focus</h3>
              <p className="text-emerald-800">We don't just silence symptoms. We dive deep into your medical history to cure the illness from its source.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-teal-950 mb-3">Builds Immunity</h3>
              <p className="text-emerald-800">By stimulating the body's own defense mechanisms, homeopathy ensures long-lasting resilience and health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-[#13382f] text-white pt-20 pb-10 border-t border-teal-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white">
                  <Leaf size={18} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Dr. Mayank<span className="text-amber-500">.</span></h1>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Dedicated to providing pure, classical homeopathy. Your partner in genuine health, vitality, and well-being.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Visit Our Clinic</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3">
                  <MapPin size={18} className="text-amber-500 shrink-0" />
                  <span>U-14, RATNADEEP AVENUE, B.R, Sola Rd, opp. Shakuntal Bunglows, Sarvodaya Nagar, Ghatlodiya, Ahmedabad, Gujarat 380061</span>
                </li>
                <li>
                  <a href="https://maps.app.goo.gl/YB6hinP7xTqLkbnP6" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold hover:text-white transition inline-flex items-center gap-1">
                    Get Directions <ArrowRight size={14} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex gap-3 items-center">
                  <Phone size={18} className="text-amber-500 shrink-0" />
                  <a href="tel:+919979133069" className="hover:text-white transition">+91 99791 33069</a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail size={18} className="text-amber-500 shrink-0" />
                  <a href="mailto:lifetronhomeopathyamd@gmail.com" className="hover:text-white transition">lifetronhomeopathyamd@gmail.com</a>
                </li>
                <li className="flex gap-3 items-center">
                  <Clock size={18} className="text-amber-500 shrink-0" />
                  <span>Mon-Sat: 10AM - 7PM</span>
                </li>
              </ul>
            </div>

          </div>

          {/* SEO LINKS */}
          <div className="border-t border-teal-800/50 mt-16 pt-8 pb-4 text-center">
            <p className="text-[#aabcb6] text-xs leading-[2.5] max-w-5xl mx-auto flex flex-wrap justify-center gap-x-3">
              <Link href="#" className="hover:text-white transition">Homeopathy doctor near me</Link> |
              <Link href="#" className="hover:text-white transition">Nearest homeopathic doctor</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathy treatment</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathic doctor</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathic specialist doctor</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathy clinic</Link> |
              <Link href="#" className="hover:text-white transition">Nearby homeopathy clinic</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathy clinic near me</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathy treatment near me</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathy doctor</Link> |
              <Link href="#" className="hover:text-white transition">Homeopathy specialist</Link>
            </p>
          </div>

          <div className="border-t border-teal-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-emerald-700">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#13382f]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-teal-950 mb-1">Book Consultation</h2>
                <p className="text-sm text-emerald-700">We will call you to confirm the time.</p>
              </div>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-slate-400 hover:text-emerald-800 transition">
                <X size={24} />
              </button>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 mb-6 flex items-center gap-4 border border-amber-100">
              <div className="bg-white text-amber-500 p-2.5 rounded-lg shadow-sm border border-amber-100">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-0.5">Consultation Fee</p>
                <p className="text-lg font-bold text-teal-950">₹500 <span className="text-xs font-medium text-emerald-700 line-through ml-1">₹800</span></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-emerald-800 mb-2">Full Name <span className="text-red-500">*</span></label>
                <input
                  required
                  className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-4 focus:ring-sky-500/10 bg-[#f4f7f6]/50 text-teal-950 transition-all font-medium"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-emerald-800 mb-2">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  required
                  type="tel"
                  className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-4 focus:ring-sky-500/10 bg-[#f4f7f6]/50 text-teal-950 transition-all font-medium"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-emerald-800 mb-2">Symptoms (Optional)</label>
                <textarea
                  className="w-full p-3.5 border border-slate-200 rounded-xl outline-none focus:border-amber-500 focus:ring-4 focus:ring-sky-500/10 resize-none h-24 bg-[#f4f7f6]/50 text-teal-950 transition-all font-medium"
                  placeholder="Tell us what you are experiencing..."
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                />
              </div>

              <button
                disabled={loading}
                className="w-full bg-[#13382f] text-white font-bold py-4 rounded-xl hover:bg-teal-900 transition flex items-center justify-center gap-2 mt-4 shadow-xl shadow-slate-900/10"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}