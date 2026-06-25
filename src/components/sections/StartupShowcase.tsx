"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, MapPin, Users, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { STARTUPS } from "@/lib/data";
import { cn } from "@/lib/utils";

const stageColors: Record<string, string> = {
  "Pre-seed": "info",
  "Seed": "success",
  "Series A": "warning",
  "Series B": "purple",
};

function StartupCard({ startup, index }: { startup: typeof STARTUPS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-neutral-900/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:bg-neutral-900/90 transition-all duration-300 cursor-pointer"
    >
      {/* Featured Badge */}
      {startup.featured && (
        <div className="absolute -top-2.5 left-6">
          <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full shadow-lg shadow-green-500/20">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-800 border border-white/5 flex items-center justify-center text-2xl">
            {startup.logo}
          </div>
          <div>
            <h3 className="font-bold text-white group-hover:text-green-300 transition-colors">
              {startup.name}
            </h3>
            <p className="text-white/40 text-xs">{startup.tagline}</p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant={stageColors[startup.stage] as "info" | "success" | "warning" | "purple" || "secondary"}>
          {startup.stage}
        </Badge>
        {startup.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
        <div className="text-center">
          <div className="text-sm font-bold text-white">{startup.raised}</div>
          <div className="text-white/30 text-xs">Raised</div>
        </div>
        <div className="text-center border-x border-white/5">
          <div className="text-sm font-bold text-white">{startup.team}+</div>
          <div className="text-white/30 text-xs">Team</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-bold text-white">{startup.founded}</div>
          <div className="text-white/30 text-xs">Founded</div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 mt-3 text-white/30 text-xs">
        <MapPin className="w-3 h-3" />
        {startup.location}, Algeria
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default function StartupShowcase() {
  const { locale, isRTL } = useLanguage();

  const title = locale === "ar" ? "الشركات الناشئة المميزة" : locale === "fr" ? "Startups en Vedette" : "Featured Startups";
  const subtitle = locale === "ar" ? "اكتشف أبرز الشركات الناشئة الجزائرية" : locale === "fr" ? "Découvrez les meilleures startups algériennes" : "Discover Algeria's most innovative ventures";
  const viewAll = locale === "ar" ? "عرض جميع الشركات" : locale === "fr" ? "Voir toutes les startups" : "View All Startups";

  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12", isRTL && "flex-row-reverse")}>
          <div className={cn(isRTL && "text-right")}>
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
                {locale === "ar" ? "المنظومة" : locale === "fr" ? "Écosystème" : "Ecosystem"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-white"
            >
              {title}
            </motion.h2>
            <p className="text-white/50 mt-2">{subtitle}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/startups"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 font-medium text-sm group"
            >
              {viewAll}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STARTUPS.slice(0, 6).map((startup, i) => (
            <StartupCard key={startup.id} startup={startup} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
