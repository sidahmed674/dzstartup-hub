"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Filter, TrendingUp, MapPin, Users, ExternalLink,
  Grid3X3, List, SlidersHorizontal, X
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { STARTUPS } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const categories = ["All", "SaaS", "Fintech", "EdTech", "HealthTech", "AgriTech", "Super App", "Marketplace"];
const stages = ["All Stages", "Pre-seed", "Seed", "Series A", "Series B"];
const cities = ["All Cities", "Algiers", "Oran", "Constantine", "Setif"];

const stageColors: Record<string, "info" | "success" | "warning" | "purple"> = {
  "Pre-seed": "info",
  "Seed": "success",
  "Series A": "warning",
  "Series B": "purple",
};

export default function StartupsClient() {
  const { locale, isRTL } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stage, setStage] = useState("All Stages");
  const [city, setCity] = useState("All Cities");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = STARTUPS.filter((s) => {
    const matchSearch =
      search === "" ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = category === "All" || s.category === category;
    const matchStage = stage === "All Stages" || s.stage === stage;
    const matchCity = city === "All Cities" || s.location === city;
    return matchSearch && matchCategory && matchStage && matchCity;
  });

  const hasFilters = search || category !== "All" || stage !== "All Stages" || city !== "All Cities";

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-green-500/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("max-w-2xl", isRTL && "text-right ml-auto")}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4" />
              {locale === "ar" ? "المنظومة الجزائرية" : locale === "fr" ? "Écosystème Algérien" : "Algerian Ecosystem"}
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              {locale === "ar" ? "الشركات الناشئة" : locale === "fr" ? "Startups" : "Startups"}
              <br />
              <span className="text-green-400">
                {locale === "ar" ? "الدليل الكامل" : locale === "fr" ? "Répertoire" : "Directory"}
              </span>
            </h1>
            <p className="text-white/50 text-lg">
              {locale === "ar"
                ? "اكتشف أكثر من 2400 شركة ناشئة جزائرية مبتكرة في جميع القطاعات."
                : locale === "fr"
                ? "Découvrez +2 400 startups algériennes innovantes dans tous les secteurs."
                : "Discover 2,400+ innovative Algerian startups across all sectors."}
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
                placeholder={locale === "ar" ? "ابحث عن شركة..." : locale === "fr" ? "Rechercher une startup..." : "Search startups..."}
                className={cn("w-full", isRTL ? "pr-10" : "pl-10")}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className={cn("absolute top-1/2 -translate-y-1/2 text-white/30 hover:text-white", isRTL ? "left-4" : "right-4")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-green-500/50 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-neutral-900">
                  {c}
                </option>
              ))}
            </select>

            {/* Stage Filter */}
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-green-500/50 text-sm"
            >
              {stages.map((s) => (
                <option key={s} value={s} className="bg-neutral-900">
                  {s}
                </option>
              ))}
            </select>

            {/* City Filter */}
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white/70 focus:outline-none focus:border-green-500/50 text-sm"
            >
              {cities.map((c) => (
                <option key={c} value={c} className="bg-neutral-900">
                  {c}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  view === "grid" ? "bg-green-500/20 text-green-400" : "text-white/30 hover:text-white"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  view === "list" ? "bg-green-500/20 text-green-400" : "text-white/30 hover:text-white"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {hasFilters && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-white/30 text-xs">
                {filtered.length} {locale === "ar" ? "نتيجة" : locale === "fr" ? "résultats" : "results"}
              </span>
              <button
                onClick={() => { setSearch(""); setCategory("All"); setStage("All Stages"); setCity("All Cities"); }}
                className="text-xs text-red-400 hover:text-red-300 underline"
              >
                {locale === "ar" ? "مسح الكل" : locale === "fr" ? "Effacer tout" : "Clear all"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Startups Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {locale === "ar" ? "لا توجد نتائج" : locale === "fr" ? "Aucun résultat" : "No startups found"}
                </h3>
                <p className="text-white/40">
                  {locale === "ar" ? "جرّب تغيير معايير البحث" : locale === "fr" ? "Essayez de changer vos critères" : "Try adjusting your search criteria"}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`${view}-${category}-${stage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cn(
                  view === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                )}
              >
                {filtered.map((startup, i) => (
                  <motion.div
                    key={startup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={cn(
                      "group relative bg-neutral-900/60 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-neutral-900/80 transition-all duration-300",
                      view === "grid" ? "p-6" : "p-5 flex items-center gap-6"
                    )}
                  >
                    {startup.featured && view === "grid" && (
                      <div className="absolute -top-2.5 left-5">
                        <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full">
                          ⭐ Featured
                        </span>
                      </div>
                    )}

                    <div className={cn("flex items-center gap-4", view === "grid" ? "mb-4" : "flex-shrink-0")}>
                      <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-white/5 flex items-center justify-center text-3xl flex-shrink-0">
                        {startup.logo}
                      </div>
                      <div className={view === "list" ? "flex-1" : ""}>
                        <h3 className="font-bold text-white text-lg group-hover:text-green-300 transition-colors">
                          {startup.name}
                        </h3>
                        <p className="text-white/40 text-sm">{startup.tagline}</p>
                      </div>
                    </div>

                    {view === "grid" && (
                      <>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant={stageColors[startup.stage] || "secondary"}>
                            {startup.stage}
                          </Badge>
                          {startup.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center">
                          <div>
                            <div className="text-sm font-bold text-white">{startup.raised}</div>
                            <div className="text-white/30 text-xs">Raised</div>
                          </div>
                          <div className="border-x border-white/5">
                            <div className="text-sm font-bold text-white">{startup.team}+</div>
                            <div className="text-white/30 text-xs">Team</div>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{startup.founded}</div>
                            <div className="text-white/30 text-xs">Founded</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-3 text-white/30 text-xs">
                          <MapPin className="w-3 h-3" />
                          {startup.location}
                        </div>
                      </>
                    )}

                    {view === "list" && (
                      <div className="flex items-center gap-6 ml-auto">
                        <Badge variant={stageColors[startup.stage] || "secondary"}>{startup.stage}</Badge>
                        <div className="text-white/40 text-sm hidden md:block">{startup.category}</div>
                        <div className="text-green-400 font-bold text-sm hidden lg:block">{startup.raised}</div>
                        <div className="flex items-center gap-1 text-white/30 text-sm hidden lg:flex">
                          <MapPin className="w-3 h-3" />
                          {startup.location}
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                      </div>
                    )}

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
}
