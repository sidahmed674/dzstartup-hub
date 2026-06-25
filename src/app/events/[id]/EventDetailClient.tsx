"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Globe, ArrowLeft, Check, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn, formatDate } from "@/lib/utils";
import type { Event } from "@/lib/data";

const TYPE_COLORS: Record<string, string> = {
  conference: "bg-blue-500/20 border-blue-500/30 text-blue-400",
  meetup: "bg-green-500/20 border-green-500/30 text-green-400",
  workshop: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
  hackathon: "bg-purple-500/20 border-purple-500/30 text-purple-400",
};

const GRADIENT_COLORS = [
  "from-green-500 to-emerald-600",
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-violet-600",
];

export default function EventDetailClient({ event }: { event: Event }) {
  const { locale, isRTL } = useLanguage();
  const [registered, setRegistered] = useState(false);
  const [saved, setSaved] = useState(false);

  const fillPct = (event.attendees / event.maxAttendees) * 100;

  const title = locale === "ar" ? event.titleAr : locale === "fr" ? event.titleFr : event.title;
  const description = locale === "ar" ? event.descriptionAr : locale === "fr" ? event.descriptionFr : event.description;

  const loc = locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-US";

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <section className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/events" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {locale === "ar" ? "العودة إلى الفعاليات" : locale === "fr" ? "Retour aux événements" : "Back to Events"}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={cn("bg-neutral-900/60 border border-white/5 rounded-2xl overflow-hidden", isRTL && "rtl")}>
                <div className={cn("h-2 w-full bg-gradient-to-r",
                  event.type === "conference" ? "from-blue-500 to-indigo-500" :
                  event.type === "meetup" ? "from-green-500 to-emerald-500" :
                  event.type === "workshop" ? "from-yellow-500 to-orange-500" :
                  "from-purple-500 to-violet-500"
                )} />
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className={cn("text-xs font-bold px-3 py-1 rounded-full border capitalize", TYPE_COLORS[event.type])}>{event.type}</span>
                    {event.featured && <span className="text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">⭐ Featured</span>}
                    {event.free
                      ? <span className="text-xs font-bold px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">{locale === "ar" ? "مجاني" : locale === "fr" ? "Gratuit" : "Free"}</span>
                      : <span className="text-xs font-bold px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60">{event.price}</span>}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">{title}</h1>
                  <p className="text-white/60 leading-relaxed mb-6">{description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-white/3 border border-white/5 rounded-xl">
                      <Calendar className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <div className="text-white/30 text-xs mb-0.5">{locale === "ar" ? "التاريخ" : locale === "fr" ? "Date" : "Date"}</div>
                        <div className="text-white font-semibold text-sm">{formatDate(event.date)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/3 border border-white/5 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <div>
                        <div className="text-white/30 text-xs mb-0.5">{locale === "ar" ? "الوقت" : locale === "fr" ? "Heure" : "Time"}</div>
                        <div className="text-white font-semibold text-sm">{event.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/3 border border-white/5 rounded-xl">
                      {event.online ? <Globe className="w-5 h-5 text-purple-400 flex-shrink-0" /> : <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />}
                      <div>
                        <div className="text-white/30 text-xs mb-0.5">{locale === "ar" ? "المكان" : locale === "fr" ? "Lieu" : "Location"}</div>
                        <div className="text-white font-semibold text-sm">{event.online ? "Online" : event.city}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/3 border border-white/5 rounded-xl">
                      <Users className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <div>
                        <div className="text-white/30 text-xs mb-0.5">{locale === "ar" ? "المشاركون" : locale === "fr" ? "Participants" : "Attendees"}</div>
                        <div className="text-white font-semibold text-sm">{event.attendees.toLocaleString(loc)} / {event.maxAttendees.toLocaleString(loc)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm">#{tag}</span>
                ))}
              </motion.div>

              {event.speakers.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6">
                  <h2 className="font-bold text-white text-lg mb-5">{locale === "ar" ? "المتحدثون" : locale === "fr" ? "Intervenants" : "Speakers"}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.speakers.map((speaker, i) => (
                      <div key={speaker.name} className="flex items-center gap-4 p-4 bg-white/3 border border-white/5 rounded-xl">
                        <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold flex-shrink-0", GRADIENT_COLORS[i % GRADIENT_COLORS.length])}>{speaker.avatar}</div>
                        <div>
                          <div className="font-bold text-white">{speaker.name}</div>
                          <div className="text-white/50 text-sm">{speaker.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6 sticky top-24">
                <div className="text-center mb-5">
                  <div className="text-3xl font-black text-white mb-1">{event.free ? (locale === "ar" ? "مجاني" : locale === "fr" ? "Gratuit" : "Free") : event.price}</div>
                  <div className="text-white/40 text-sm">{event.maxAttendees - event.attendees} {locale === "ar" ? "مكان متبقي" : locale === "fr" ? "places restantes" : "spots remaining"}</div>
                </div>

                <div className="mb-5">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-1.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${fillPct}%` }} transition={{ duration: 1 }} className={cn("h-full rounded-full", fillPct > 90 ? "bg-red-500" : fillPct > 70 ? "bg-yellow-500" : "bg-green-500")} />
                  </div>
                  <div className="flex justify-between text-xs text-white/30">
                    <span>{event.attendees.toLocaleString(loc)} registered</span>
                    <span>{Math.round(fillPct)}% full</span>
                  </div>
                </div>

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setRegistered(!registered)}
                  className={cn("w-full flex items-center justify-center gap-2 py-4 font-bold rounded-xl transition-all text-lg",
                    registered ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-2xl shadow-green-500/25"
                  )}>
                  {registered ? <><Check className="w-5 h-5" />{locale === "ar" ? "مسجّل!" : locale === "fr" ? "Inscrit!" : "Registered!"}</>
                    : (locale === "ar" ? "سجّل الآن" : locale === "fr" ? "S'inscrire" : "Register Now")}
                </motion.button>

                <div className="flex gap-3 mt-3">
                  <button onClick={() => setSaved(!saved)}
                    className={cn("flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all",
                      saved ? "bg-yellow-500/15 border-yellow-500/30 text-yellow-400" : "bg-white/5 border-white/10 text-white/50 hover:border-white/20"
                    )}>
                    <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
                    {locale === "ar" ? "حفظ" : locale === "fr" ? "Sauvegarder" : "Save"}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white/50 hover:border-white/20 hover:text-white transition-all">
                    <Share2 className="w-4 h-4" />{locale === "ar" ? "مشاركة" : locale === "fr" ? "Partager" : "Share"}
                  </button>
                </div>

                <div className="mt-5 pt-5 border-t border-white/5">
                  <h4 className="font-semibold text-white text-sm mb-3">{locale === "ar" ? "ماذا ستجد" : locale === "fr" ? "Ce qui vous attend" : "What to expect"}</h4>
                  <ul className="space-y-2">
                    {[
                      locale === "ar" ? "🎤 متحدثون خبراء" : locale === "fr" ? "🎤 Intervenants experts" : "🎤 Expert speakers",
                      locale === "ar" ? "🤝 فرص التواصل" : locale === "fr" ? "🤝 Networking" : "🤝 Networking opportunities",
                      locale === "ar" ? "💡 ورش تفاعلية" : locale === "fr" ? "💡 Ateliers interactifs" : "💡 Interactive workshops",
                      locale === "ar" ? "📜 شهادة حضور" : locale === "fr" ? "📜 Certificat de participation" : "📜 Attendance certificate",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/50 text-xs"><Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
