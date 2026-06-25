"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Globe, Search, X, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EVENTS, type EventType } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn, formatDate } from "@/lib/utils";

const EVENT_TYPES: { key: EventType | "all"; labelEn: string; labelFr: string; labelAr: string }[] = [
  { key: "all", labelEn: "All Events", labelFr: "Tous", labelAr: "الكل" },
  { key: "conference", labelEn: "Conferences", labelFr: "Conférences", labelAr: "مؤتمرات" },
  { key: "meetup", labelEn: "Meetups", labelFr: "Meetups", labelAr: "لقاءات" },
  { key: "workshop", labelEn: "Workshops", labelFr: "Ateliers", labelAr: "ورش عمل" },
  { key: "hackathon", labelEn: "Hackathons", labelFr: "Hackathons", labelAr: "هاكاثونات" },
];

const TYPE_COLORS: Record<EventType, string> = {
  conference: "bg-gradient-to-r from-blue-500 to-indigo-500",
  meetup: "bg-gradient-to-r from-green-500 to-emerald-500",
  workshop: "bg-gradient-to-r from-yellow-500 to-orange-500",
  hackathon: "bg-gradient-to-r from-purple-500 to-violet-500",
};

const TYPE_BADGE: Record<EventType, "info" | "success" | "warning" | "purple"> = {
  conference: "info",
  meetup: "success",
  workshop: "warning",
  hackathon: "purple",
};

export default function EventsClient() {
  const { locale, isRTL, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<EventType | "all">("all");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filtered = EVENTS.filter((e) => {
    const title = locale === "ar" ? e.titleAr : locale === "fr" ? e.titleFr : e.title;
    const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || e.type === typeFilter;
    const matchOnline = !showOnlineOnly || e.online;
    const matchFree = !showFreeOnly || e.free;
    return matchSearch && matchType && matchOnline && matchFree;
  });

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-center", isRTL && "rtl")}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
              <Calendar className="w-4 h-4" />
              {locale === "ar" ? "الفعاليات القادمة" : locale === "fr" ? "Événements à venir" : "Upcoming Events"}
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              {t.events.title}
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {t.events.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-neutral-950/90 backdrop-blur-2xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("flex flex-col lg:flex-row gap-4", isRTL && "flex-row-reverse")}>
            {/* Search */}
            <div className="relative flex-1">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === "ar" ? "ابحث عن فعالية..." : locale === "fr" ? "Rechercher un événement..." : "Search events..."}
                className={cn(isRTL ? "pr-10" : "pl-10")}
              />
              {search && (
                <button onClick={() => setSearch("")} className={cn("absolute top-1/2 -translate-y-1/2 text-white/30 hover:text-white", isRTL ? "left-4" : "right-4")}>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Type Filters */}
            <div className={cn("flex gap-2 flex-wrap", isRTL && "flex-row-reverse")}>
              {EVENT_TYPES.map((type) => {
                const label = locale === "ar" ? type.labelAr : locale === "fr" ? type.labelFr : type.labelEn;
                return (
                  <button
                    key={type.key}
                    onClick={() => setTypeFilter(type.key)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                      typeFilter === type.key
                        ? "bg-green-500/20 border border-green-500/30 text-green-400"
                        : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Toggles */}
            <div className={cn("flex gap-3", isRTL && "flex-row-reverse")}>
              <button
                onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all",
                  showOnlineOnly ? "bg-blue-500/20 border-blue-500/30 text-blue-400" : "bg-white/5 border-white/10 text-white/40"
                )}
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === "ar" ? "أونلاين" : locale === "fr" ? "En ligne" : "Online"}
              </button>
              <button
                onClick={() => setShowFreeOnly(!showFreeOnly)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all",
                  showFreeOnly ? "bg-green-500/20 border-green-500/30 text-green-400" : "bg-white/5 border-white/10 text-white/40"
                )}
              >
                {locale === "ar" ? "مجاني" : locale === "fr" ? "Gratuit" : "Free"}
              </button>
            </div>
          </div>
          <div className="mt-3 text-white/30 text-xs">
            {filtered.length} {locale === "ar" ? "فعالية" : locale === "fr" ? "événements" : "events"}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${typeFilter}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((event, i) => {
                const title = locale === "ar" ? event.titleAr : locale === "fr" ? event.titleFr : event.title;
                const description = locale === "ar" ? event.descriptionAr : locale === "fr" ? event.descriptionFr : event.description;
                const spotsLeft = event.maxAttendees - event.attendees;
                const fillPct = (event.attendees / event.maxAttendees) * 100;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-neutral-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
                  >
                    {/* Top Color Bar */}
                    <div className={cn("h-1 w-full", TYPE_COLORS[event.type])} />

                    <div className="p-6">
                      {/* Type & Price */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={TYPE_BADGE[event.type]}>
                          {locale === "ar"
                            ? event.type === "conference" ? "مؤتمر" : event.type === "meetup" ? "لقاء" : event.type === "workshop" ? "ورشة" : "هاكاثون"
                            : locale === "fr"
                            ? event.type === "conference" ? "Conférence" : event.type === "meetup" ? "Meetup" : event.type === "workshop" ? "Atelier" : "Hackathon"
                            : event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        {event.featured && (
                          <span className="text-xs font-bold text-yellow-400">⭐ Featured</span>
                        )}
                        {event.free
                          ? <Badge variant="success">{locale === "ar" ? "مجاني" : locale === "fr" ? "Gratuit" : "Free"}</Badge>
                          : <span className="text-white/60 text-xs font-bold">{event.price}</span>}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
                        {title}
                      </h3>
                      <p className="text-white/40 text-sm mb-5 line-clamp-2">{description}</p>

                      {/* Details */}
                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {formatDate(event.date)} · {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          {event.online
                            ? <><Globe className="w-4 h-4 text-blue-400 flex-shrink-0" /><span>{locale === "ar" ? "عبر الإنترنت" : locale === "fr" ? "En ligne" : "Online"}</span></>
                            : <><MapPin className="w-4 h-4 text-red-400 flex-shrink-0" /><span className="line-clamp-1">{event.location}, {event.city}</span></>}
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                          <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          {event.attendees.toLocaleString(locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-US")} / {event.maxAttendees.toLocaleString(locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-US")} {locale === "ar" ? "مشارك" : locale === "fr" ? "participants" : "attendees"}
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-5">
                        <div className="flex justify-between text-xs text-white/30 mb-1.5">
                          <span>{spotsLeft} {locale === "ar" ? "مكان متبقي" : locale === "fr" ? "places restantes" : "spots left"}</span>
                          <span>{Math.round(fillPct)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${fillPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className={cn("h-full rounded-full", fillPct > 90 ? "bg-red-500" : fillPct > 70 ? "bg-yellow-500" : "bg-green-500")}
                          />
                        </div>
                      </div>

                      {/* Speakers */}
                      {event.speakers.length > 0 && (
                        <div className="flex items-center gap-2 mb-5">
                          <div className="flex -space-x-2">
                            {event.speakers.slice(0, 3).map((s) => (
                              <div
                                key={s.name}
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 border-2 border-neutral-900 flex items-center justify-center text-white text-xs font-bold"
                              >
                                {s.avatar}
                              </div>
                            ))}
                          </div>
                          <span className="text-white/40 text-xs">
                            {event.speakers.length} {locale === "ar" ? "متحدث" : locale === "fr" ? "intervenant(s)" : "speaker(s)"}
                          </span>
                        </div>
                      )}

                      {/* Register Button */}
                      <Link href={`/events/${event.id}`}>
                        <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-green-500/30 text-sm font-semibold transition-all">
                          {t.events.register}
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {locale === "ar" ? "لا توجد فعاليات" : locale === "fr" ? "Aucun événement trouvé" : "No events found"}
              </h3>
              <p className="text-white/40">
                {locale === "ar" ? "جرّب فلاتر مختلفة" : locale === "fr" ? "Essayez d'autres filtres" : "Try different filters"}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
