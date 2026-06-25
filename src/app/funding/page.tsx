"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Banknote, Search, Filter, TrendingUp, Building, Star, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { INVESTORS } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const TYPES = [
  { key: "all", labelEn: "All", labelFr: "Tous", labelAr: "الكل" },
  { key: "vc", labelEn: "Venture Capital", labelFr: "Capital Risque", labelAr: "رأس مال جريء" },
  { key: "angel", labelEn: "Angel", labelFr: "Business Angel", labelAr: "مستثمر فردي" },
  { key: "incubator", labelEn: "Incubators", labelFr: "Incubateurs", labelAr: "حاضنات" },
  { key: "accelerator", labelEn: "Accelerators", labelFr: "Accélérateurs", labelAr: "مسرّعات" },
  { key: "government", labelEn: "Government", labelFr: "Gouvernemental", labelAr: "حكومي" },
];

const STAGES = [
  { key: "all", label: "All Stages" },
  { key: "pre-seed", label: "Pre-Seed" },
  { key: "seed", label: "Seed" },
  { key: "series-a", label: "Series A" },
];

const fundingStats = [
  { value: "DZD 12.3B", label: "Total Funding", labelAr: "إجمالي التمويل", labelFr: "Financement Total", icon: "💰" },
  { value: "183+", label: "Active Investors", labelAr: "مستثمر نشط", labelFr: "Investisseurs Actifs", icon: "👥" },
  { value: "45+", label: "Incubators", labelAr: "حاضنة", labelFr: "Incubateurs", icon: "🏢" },
  { value: "8", label: "Gov. Programs", labelAr: "برنامج حكومي", labelFr: "Programmes Gov.", icon: "🏛️" },
];

export default function FundingPage() {
  const { locale, isRTL, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [stage, setStage] = useState("all");

  const filtered = INVESTORS.filter((inv) => {
    const matchSearch = !search || inv.name.toLowerCase().includes(search.toLowerCase()) || inv.focus.some((f) => f.toLowerCase().includes(search.toLowerCase()));
    const matchType = type === "all" || inv.type === type;
    const matchStage = stage === "all" || inv.stages.includes(stage as "pre-seed" | "seed" | "series-a" | "series-b" | "grant");
    return matchSearch && matchType && matchStage;
  });

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-yellow-500/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-center", isRTL && "rtl")}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-semibold mb-6">
              <Banknote className="w-4 h-4" />
              {locale === "ar" ? "التمويل والمستثمرون" : locale === "fr" ? "Financement & Investisseurs" : "Funding & Investors"}
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              {t.funding.title}
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-12">
              {t.funding.description}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {fundingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-5 bg-white/3 border border-white/5 rounded-2xl"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/40 text-xs">
                  {locale === "ar" ? stat.labelAr : locale === "fr" ? stat.labelFr : stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-neutral-950/90 backdrop-blur-2xl border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("flex flex-col lg:flex-row gap-4", isRTL && "flex-row-reverse")}>
            <div className="relative flex-1">
              <Search className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === "ar" ? "ابحث عن مستثمر..." : locale === "fr" ? "Rechercher un investisseur..." : "Search investors..."}
                className={cn(isRTL ? "pr-10" : "pl-10")}
              />
            </div>
            <div className={cn("flex gap-2 flex-wrap", isRTL && "flex-row-reverse")}>
              {TYPES.map((t) => {
                const label = locale === "ar" ? t.labelAr : locale === "fr" ? t.labelFr : t.labelEn;
                return (
                  <button
                    key={t.key}
                    onClick={() => setType(t.key)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
                      type === t.key ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Investors Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((investor, i) => (
              <motion.div
                key={investor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="group relative bg-neutral-900/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
              >
                {investor.featured && (
                  <div className="absolute -top-2.5 right-5">
                    <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg">
                      ⭐ Top Pick
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-800 border border-white/10 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {investor.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-yellow-300 transition-colors">{investor.name}</h3>
                    <span className="text-white/40 text-xs capitalize">{investor.type.replace("-", " ")}</span>
                  </div>
                </div>

                <p className="text-white/50 text-sm mb-5 line-clamp-2">{investor.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/3 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-white/30 mb-1">{locale === "ar" ? "المحفظة" : locale === "fr" ? "Portfolio" : "Portfolio"}</div>
                    <div className="text-white font-bold text-sm">{investor.portfolio} startups</div>
                  </div>
                  <div className="bg-white/3 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-white/30 mb-1">{locale === "ar" ? "الاستثمار" : locale === "fr" ? "Ticket" : "Avg. Ticket"}</div>
                    <div className="text-yellow-400 font-bold text-sm">{investor.avgTicket}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {investor.focus.slice(0, 3).map((f) => (
                    <span key={f} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-white/50">{f}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {investor.stages.map((s) => (
                    <Badge key={s} variant="info">{s}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-white/30 text-xs">
                    <MapPin className="w-3 h-3" />
                    {investor.location}
                  </div>
                  <Link href={`/funding/${investor.id}`} className="flex items-center gap-1 text-xs font-semibold text-yellow-400/60 hover:text-yellow-400 transition-colors">
                    {locale === "ar" ? "تقدّم" : locale === "fr" ? "Postuler" : "Apply"}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-neutral-900/80 p-8 lg:p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent" />
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
                {locale === "ar" ? "هل شركتك الناشئة جاهزة للتمويل؟" : locale === "fr" ? "Votre startup est-elle prête pour le financement?" : "Is your startup ready for funding?"}
              </h3>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                {locale === "ar"
                  ? "أنشئ ملفك الشخصي وتواصل مع المستثمرين المناسبين لمرحلتك."
                  : locale === "fr"
                  ? "Créez votre profil et connectez-vous avec les bons investisseurs pour votre étape."
                  : "Create your profile and connect with the right investors for your stage."}
              </p>
              <Link href="/register">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-green-500/25 transition-all hover:scale-105">
                  {locale === "ar" ? "أنشئ ملفك" : locale === "fr" ? "Créer votre profil" : "Create Your Profile"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
