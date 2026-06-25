"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Banknote, Building, Users, Star, ExternalLink, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { INVESTORS } from "@/lib/data";
import { cn } from "@/lib/utils";

const typeConfig = {
  vc: { label: "Venture Capital", labelFr: "Capital Risque", labelAr: "رأس المال الجريء", color: "info" as const, icon: TrendingUp },
  angel: { label: "Angel Investor", labelFr: "Business Angel", labelAr: "مستثمر فردي", color: "warning" as const, icon: Star },
  incubator: { label: "Incubator", labelFr: "Incubateur", labelAr: "حاضنة", color: "success" as const, icon: Building },
  accelerator: { label: "Accelerator", labelFr: "Accélérateur", labelAr: "مسرّعة", color: "purple" as const, icon: Banknote },
  government: { label: "Government", labelFr: "Gouvernemental", labelAr: "حكومي", color: "secondary" as const, icon: Building },
};

function InvestorCard({ investor, index }: { investor: typeof INVESTORS[0]; index: number }) {
  const { locale } = useLanguage();
  const config = typeConfig[investor.type];
  const TypeIcon = config.icon;

  const typeLabel = locale === "ar" ? config.labelAr : locale === "fr" ? config.labelFr : config.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative bg-neutral-900/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 hover:bg-neutral-900/80 transition-all duration-300"
    >
      {investor.featured && (
        <div className="absolute -top-2.5 right-6">
          <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg shadow-yellow-500/20">
            ⭐ Top Pick
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-800 border border-white/10 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
          {investor.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg leading-tight mb-1 group-hover:text-green-300 transition-colors">
            {investor.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge variant={config.color}>
              <TypeIcon className="w-3 h-3 mr-1" />
              {typeLabel}
            </Badge>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed mb-5 line-clamp-2">
        {investor.description}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/3 rounded-xl p-3 border border-white/5">
          <div className="text-xs text-white/30 mb-1">
            {locale === "ar" ? "المحفظة" : locale === "fr" ? "Portfolio" : "Portfolio"}
          </div>
          <div className="text-white font-bold text-sm">{investor.portfolio} startups</div>
        </div>
        <div className="bg-white/3 rounded-xl p-3 border border-white/5">
          <div className="text-xs text-white/30 mb-1">
            {locale === "ar" ? "متوسط الاستثمار" : locale === "fr" ? "Ticket moyen" : "Avg. Ticket"}
          </div>
          <div className="text-green-400 font-bold text-sm">{investor.avgTicket}</div>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {investor.focus.slice(0, 3).map((f) => (
          <span key={f} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-white/50">
            {f}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-white/30 text-xs">
          <MapPin className="w-3 h-3" />
          {investor.location}
        </div>
        <Link
          href={`/funding/${investor.id}`}
          className="flex items-center gap-1 text-xs font-semibold text-white/40 hover:text-green-400 transition-colors group/link"
        >
          {locale === "ar" ? "اعرف أكثر" : locale === "fr" ? "En savoir plus" : "Learn more"}
          <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default function FundingSection() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-yellow-500/5 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-green-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12", isRTL && "flex-row-reverse")}>
          <div className={cn(isRTL && "text-right")}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-2"
            >
              <Banknote className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-400 text-sm font-semibold uppercase tracking-wider">
                {locale === "ar" ? "التمويل والاستثمار" : locale === "fr" ? "Financement & Investissement" : "Funding & Investment"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-black text-white"
            >
              {t.funding.title}
            </motion.h2>
            <p className="text-white/50 mt-2 text-lg max-w-lg">{t.funding.description}</p>
          </div>
          <Link
            href="/funding"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 font-medium text-sm group flex-shrink-0"
          >
            {locale === "ar" ? "عرض الكل" : locale === "fr" ? "Voir tous" : "View All"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Investors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INVESTORS.map((investor, i) => (
            <InvestorCard key={investor.id} investor={investor} index={i} />
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-neutral-900/80 to-orange-500/10 p-8 lg:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-yellow-500/20 to-transparent blur-3xl pointer-events-none" />
          <div className={cn("relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6", isRTL && "flex-row-reverse text-right")}>
            <div>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
                {locale === "ar" ? "هل أنت مستثمر؟ انضم إلى شبكتنا" : locale === "fr" ? "Vous êtes investisseur? Rejoignez notre réseau" : "Are you an investor? Join our network"}
              </h3>
              <p className="text-white/50 max-w-md">
                {locale === "ar"
                  ? "احصل على وصول حصري لأفضل الشركات الناشئة الجزائرية وتدفق الصفقات المنتقاة."
                  : locale === "fr"
                  ? "Accédez aux meilleures startups algériennes et à un deal flow sélectionné."
                  : "Get exclusive access to Algeria's top startups and curated deal flow."}
              </p>
            </div>
            <Link href="/funding/apply-investor">
              <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                {locale === "ar" ? "انضم كمستثمر" : locale === "fr" ? "Rejoindre comme investisseur" : "Join as Investor"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
