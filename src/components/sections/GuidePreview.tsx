"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { GUIDE_SECTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

function GuideCard({ section, index }: { section: typeof GUIDE_SECTIONS[0]; index: number }) {
  const { locale } = useLanguage();

  const title = locale === "ar" ? section.titleAr : locale === "fr" ? section.titleFr : section.title;
  const description = locale === "ar" ? section.descriptionAr : locale === "fr" ? section.descriptionFr : section.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="group relative bg-neutral-900/60 border border-white/5 rounded-2xl p-6 hover:border-white/15 transition-all duration-300 cursor-pointer"
    >
      <Link href={`/guide#${section.id}`} className="block">
        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 bg-gradient-to-br",
          section.color,
          "bg-opacity-10 border border-white/10 group-hover:scale-110 transition-transform duration-300"
        )}
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <span className="text-2xl">{section.icon}</span>
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-300 transition-colors">
          {title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Items Preview */}
        <ul className="space-y-1.5">
          {section.items.slice(0, 3).map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-white/40">
              <Check className={cn(
                "w-3.5 h-3.5 flex-shrink-0",
                `bg-gradient-to-r ${section.color}`,
                "text-white rounded-full p-0.5"
              )} />
              {item}
            </li>
          ))}
          {section.items.length > 3 && (
            <li className="text-xs text-white/30">
              +{section.items.length - 3} more...
            </li>
          )}
        </ul>

        {/* Arrow */}
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-white/30 group-hover:text-green-400 transition-colors">
          <span>Read guide</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Gradient Overlay */}
        <div className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
          "bg-gradient-to-br",
          section.color,
        )}
          style={{ opacity: 0, background: undefined }}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>
    </motion.div>
  );
}

const steps = [
  { num: "01", titleEn: "Define Your Idea", titleFr: "Définissez votre idée", titleAr: "حدّد فكرتك", descEn: "Validate your startup concept with market research", descFr: "Validez votre concept avec des études de marché", descAr: "تحقق من مفهوم شركتك بالبحث السوقي" },
  { num: "02", titleEn: "Register Your Company", titleFr: "Enregistrez votre entreprise", titleAr: "سجّل شركتك", descEn: "Complete the official registration and get your label", descFr: "Complétez l'inscription officielle et obtenez votre label", descAr: "أكمل التسجيل الرسمي واحصل على تصنيفك" },
  { num: "03", titleEn: "Access Support", titleFr: "Accédez au soutien", titleAr: "احصل على الدعم", descEn: "Unlock funding, mentors, and government programs", descFr: "Débloquez financements, mentors et programmes gouvernementaux", descAr: "افتح التمويل والموجّهين والبرامج الحكومية" },
  { num: "04", titleEn: "Scale & Grow", titleFr: "Scalez & Grandissez", titleAr: "توسّع وانمُ", descEn: "Use the DzStartup network to grow globally", descFr: "Utilisez le réseau DzStartup pour croître globalement", descAr: "استخدم شبكة دي زي ستارتاب للنمو عالمياً" },
];

export default function GuidePreview() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-neutral-950 via-neutral-900/30 to-neutral-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-green-500/8 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("text-center mb-16", isRTL && "rtl")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <BookOpen className="w-5 h-5 text-green-500" />
            <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
              {locale === "ar" ? "دليل الشركات الناشئة" : locale === "fr" ? "Guide Startup" : "Startup Guide"}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white mb-4"
          >
            {t.guide.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            {t.guide.description}
          </motion.p>
        </div>

        {/* Guide Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {GUIDE_SECTIONS.map((section, i) => (
            <GuideCard key={section.id} section={section} index={i} />
          ))}
        </div>

        {/* How It Works */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("text-2xl font-bold text-white text-center mb-12", isRTL && "rtl")}
          >
            {locale === "ar" ? "كيف يعمل؟" : locale === "fr" ? "Comment ça marche?" : "How Does It Work?"}
          </motion.h3>

          <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative", isRTL && "rtl")}>
            {/* Connecting Line */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

            {steps.map((step, i) => {
              const title = locale === "ar" ? step.titleAr : locale === "fr" ? step.titleFr : step.titleEn;
              const desc = locale === "ar" ? step.descAr : locale === "fr" ? step.descFr : step.descEn;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-black text-xl mb-4 shadow-lg shadow-green-500/25 group-hover:scale-110 transition-transform duration-300 relative z-10">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-white mb-2">{title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/guide">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
              {locale === "ar" ? "استكشف الدليل الكامل" : locale === "fr" ? "Explorer le Guide Complet" : "Explore the Full Guide"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
