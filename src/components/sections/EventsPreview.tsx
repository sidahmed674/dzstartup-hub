"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight, Tag, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { EVENTS, type EventType } from "@/lib/data";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

const eventTypeColors: Record<EventType, { badge: "info" | "success" | "warning" | "purple"; label: string }> = {
  conference: { badge: "info", label: "Conference" },
  meetup: { badge: "success", label: "Meetup" },
  workshop: { badge: "warning", label: "Workshop" },
  hackathon: { badge: "purple", label: "Hackathon" },
};

function EventCard({ event, index }: { event: typeof EVENTS[0]; index: number }) {
  const { locale } = useLanguage();
  const typeConfig = eventTypeColors[event.type];

  const title = locale === "ar" ? event.titleAr : locale === "fr" ? event.titleFr : event.title;
  const description = locale === "ar" ? event.descriptionAr : locale === "fr" ? event.descriptionFr : event.description;
  const registerLabel = locale === "ar" ? "سجّل الآن" : locale === "fr" ? "S'inscrire" : "Register";
  const freeLabel = locale === "ar" ? "مجاني" : locale === "fr" ? "Gratuit" : "Free";

  const spotsLeft = event.maxAttendees - event.attendees;
  const fillPercent = (event.attendees / event.maxAttendees) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-neutral-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
    >
      {/* Top Color Bar */}
      <div className={cn(
        "h-1 w-full",
        event.type === "conference" ? "bg-gradient-to-r from-blue-500 to-indigo-500" :
        event.type === "meetup" ? "bg-gradient-to-r from-green-500 to-emerald-500" :
        event.type === "workshop" ? "bg-gradient-to-r from-yellow-500 to-orange-500" :
        "bg-gradient-to-r from-purple-500 to-violet-500"
      )} />

      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant={typeConfig.badge}>
            {locale === "ar"
              ? event.type === "conference" ? "مؤتمر" : event.type === "meetup" ? "لقاء" : event.type === "workshop" ? "ورشة" : "هاكاثون"
              : locale === "fr"
              ? event.type === "conference" ? "Conférence" : event.type === "meetup" ? "Meetup" : event.type === "workshop" ? "Atelier" : "Hackathon"
              : typeConfig.label}
          </Badge>
          {event.free ? (
            <Badge variant="success">{freeLabel}</Badge>
          ) : (
            <span className="text-white/60 text-xs font-semibold">{event.price}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-green-300 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Calendar className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            {event.online ? (
              <>
                <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{locale === "ar" ? "عبر الإنترنت" : locale === "fr" ? "En ligne" : "Online"}</span>
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="line-clamp-1">{event.city}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>{event.attendees.toLocaleString(locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-US")} / {event.maxAttendees.toLocaleString(locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-US")}</span>
          </div>
        </div>

        {/* Attendees Progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-white/30 mb-1.5">
            <span>{locale === "ar" ? "الأماكن المتبقية" : locale === "fr" ? "Places restantes" : "Spots left"}: {spotsLeft}</span>
            <span>{Math.round(fillPercent)}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${fillPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className={cn(
                "h-full rounded-full",
                fillPercent > 90 ? "bg-red-500" : fillPercent > 70 ? "bg-yellow-500" : "bg-green-500"
              )}
            />
          </div>
        </div>

        {/* CTA */}
        <Link href={`/events/${event.id}`}>
          <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 text-sm font-semibold transition-all duration-200 group/btn flex items-center justify-center gap-2">
            {registerLabel}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function EventsPreview() {
  const { t, locale, isRTL } = useLanguage();
  const [filter, setFilter] = useState<EventType | "all">("all");

  const filters = [
    { key: "all", labelEn: t.events.filter.all, labelFr: t.events.filter.all, labelAr: t.events.filter.all },
    { key: "conference", labelEn: t.events.filter.conference, labelFr: "Conférences", labelAr: "مؤتمرات" },
    { key: "meetup", labelEn: t.events.filter.meetup, labelFr: "Meetups", labelAr: "لقاءات" },
    { key: "workshop", labelEn: t.events.filter.workshop, labelFr: "Ateliers", labelAr: "ورش عمل" },
    { key: "hackathon", labelEn: t.events.filter.hackathon, labelFr: "Hackathons", labelAr: "هاكاثونات" },
  ];

  const filtered = filter === "all" ? EVENTS : EVENTS.filter((e) => e.type === filter);

  return (
    <section className="py-24 lg:py-32 bg-neutral-950/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10", isRTL && "flex-row-reverse")}>
          <div className={cn(isRTL && "text-right")}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-2"
            >
              <Calendar className="w-5 h-5 text-green-500" />
              <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
                {locale === "ar" ? "الفعاليات" : locale === "fr" ? "Événements" : "Events"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-black text-white"
            >
              {t.events.title}
            </motion.h2>
            <p className="text-white/50 mt-2 text-lg">{t.events.subtitle}</p>
          </div>
          <Link
            href="/events"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 font-medium text-sm group flex-shrink-0"
          >
            {t.events.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn("flex flex-wrap gap-2 mb-10", isRTL && "flex-row-reverse")}
        >
          {filters.map((f) => {
            const label = locale === "ar" ? f.labelAr : locale === "fr" ? f.labelFr : f.labelEn;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as EventType | "all")}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                  filter === f.key
                    ? "bg-green-500/20 border border-green-500/30 text-green-400"
                    : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                )}
              >
                {label}
              </button>
            );
          })}
        </motion.div>

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
