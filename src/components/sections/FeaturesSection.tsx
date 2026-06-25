"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket, Users, Calendar, Banknote, BookOpen, BarChart3,
  Shield, Globe, Zap, Award, ArrowRight, Check
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

const features = [
  {
    icon: Rocket,
    color: "from-green-500 to-emerald-600",
    glow: "shadow-green-500/20",
    titleEn: "Startup Registration",
    titleFr: "Inscription Startup",
    titleAr: "تسجيل الشركات الناشئة",
    descEn: "Register your startup in minutes with our streamlined onboarding. Access the official Algerian Startup Label and unlock exclusive benefits.",
    descFr: "Inscrivez votre startup en quelques minutes. Accédez au Label Startup Algérien officiel.",
    descAr: "سجّل شركتك الناشئة في دقائق. احصل على تصنيف الشركة الناشئة الجزائرية الرسمي.",
    href: "/register",
    features: ["Smart form validation", "Document upload", "Real-time status tracking"],
  },
  {
    icon: Calendar,
    color: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
    titleEn: "Events & Networking",
    titleFr: "Événements & Networking",
    titleAr: "الفعاليات والتواصل",
    descEn: "Discover and join conferences, meetups, workshops and hackathons shaping Algeria's innovation scene.",
    descFr: "Découvrez conférences, meetups, ateliers et hackathons façonnant l'innovation algérienne.",
    descAr: "اكتشف وانضم إلى المؤتمرات واللقاءات وورش العمل والهاكاثونات.",
    href: "/events",
    features: ["Smart event discovery", "Online & in-person", "Calendar integration"],
  },
  {
    icon: Banknote,
    color: "from-yellow-500 to-orange-500",
    glow: "shadow-yellow-500/20",
    titleEn: "Funding & Investors",
    titleFr: "Financement & Investisseurs",
    titleAr: "التمويل والمستثمرون",
    descEn: "Connect with VCs, angel investors, and government funding programs. Find the right capital for your stage.",
    descFr: "Connectez-vous avec des VCs, business angels et programmes de financement gouvernementaux.",
    descAr: "تواصل مع المستثمرين وبرامج التمويل الحكومية. اعثر على رأس المال المناسب لمرحلتك.",
    href: "/funding",
    features: ["Investor matching", "Pitch deck tools", "Funding tracker"],
  },
  {
    icon: BookOpen,
    color: "from-purple-500 to-violet-600",
    glow: "shadow-purple-500/20",
    titleEn: "Startup Guide",
    titleFr: "Guide Startup",
    titleAr: "دليل الشركات الناشئة",
    descEn: "Comprehensive educational resources on Algerian startup ecosystem, legal framework, and growth strategies.",
    descFr: "Ressources éducatives complètes sur l'écosystème startup algérien et les stratégies de croissance.",
    descAr: "موارد تعليمية شاملة حول المنظومة الجزائرية والإطار القانوني واستراتيجيات النمو.",
    href: "/guide",
    features: ["Step-by-step guides", "Legal framework", "Tax benefits explained"],
  },
  {
    icon: Users,
    color: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
    titleEn: "Community Hub",
    titleFr: "Hub Communautaire",
    titleAr: "مركز المجتمع",
    descEn: "Join Algeria's largest startup community. Connect with founders, mentors, and innovators across the country.",
    descFr: "Rejoignez la plus grande communauté startup d'Algérie. Connectez-vous avec fondateurs et mentors.",
    descAr: "انضم إلى أكبر مجتمع للشركات الناشئة في الجزائر. تواصل مع المؤسسين والموجّهين.",
    href: "/community",
    features: ["Founder network", "Mentorship program", "Peer learning"],
  },
  {
    icon: BarChart3,
    color: "from-cyan-500 to-teal-600",
    glow: "shadow-cyan-500/20",
    titleEn: "Analytics & Insights",
    titleFr: "Analytiques & Insights",
    titleAr: "التحليلات والرؤى",
    descEn: "Track Algeria's startup ecosystem with real-time data, market trends, and actionable investment intelligence.",
    descFr: "Suivez l'écosystème startup algérien avec des données en temps réel et des tendances du marché.",
    descAr: "تتبع منظومة الشركات الناشئة الجزائرية بالبيانات الفورية واتجاهات السوق.",
    href: "/dashboard",
    features: ["Real-time metrics", "Market trends", "Sector analysis"],
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: typeof features[0];
  index: number;
}) {
  const { locale } = useLanguage();

  const title = locale === "fr" ? feature.titleFr : locale === "ar" ? feature.titleAr : feature.titleEn;
  const desc = locale === "fr" ? feature.descFr : locale === "ar" ? feature.descAr : feature.descEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative"
    >
      <Link href={feature.href}>
        <div className={cn(
          "relative h-full p-6 rounded-2xl border border-white/5 bg-neutral-900/60 backdrop-blur-sm",
          "hover:border-white/10 hover:bg-neutral-900/80 transition-all duration-400",
          "shadow-xl hover:shadow-2xl",
          `hover:${feature.glow}`
        )}>
          {/* Glow Effect */}
          <div className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            "bg-gradient-to-br",
            feature.color,
            "blur-2xl -z-10 scale-110"
          )} style={{ opacity: 0 }} />

          {/* Icon */}
          <div className={cn(
            "inline-flex p-3 rounded-xl bg-gradient-to-br mb-4",
            feature.color,
            "shadow-lg"
          )}>
            <feature.icon className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            {desc}
          </p>

          {/* Feature List */}
          <ul className="space-y-2 mb-4">
            {feature.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* Arrow */}
          <div className="flex items-center gap-1 text-xs font-semibold text-white/40 group-hover:text-white/70 transition-colors">
            <span>{locale === "ar" ? "اعرف أكثر" : locale === "fr" ? "En savoir plus" : "Learn more"}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-gradient-radial from-green-500/5 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={cn("text-center mb-16", isRTL && "rtl")}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4" fill="currentColor" />
            {locale === "ar" ? "منصة متكاملة" : locale === "fr" ? "Plateforme Complète" : "Complete Platform"}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            {t.features.title}
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              {t.features.subtitle}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/50 text-lg leading-relaxed"
          >
            {t.features.description}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.titleEn} feature={feature} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm mb-4">
            {locale === "ar"
              ? "وأكثر بكثير — نحن نبني المستقبل باستمرار"
              : locale === "fr"
              ? "Et bien plus encore — nous construisons en permanence"
              : "And much more — we're constantly building the future"}
          </p>
          <div className="flex items-center justify-center gap-8">
            {[
              locale === "ar" ? "مجاني للبدء" : locale === "fr" ? "Gratuit pour commencer" : "Free to get started",
              locale === "ar" ? "بدون بطاقة ائتمان" : locale === "fr" ? "Sans carte de crédit" : "No credit card required",
              locale === "ar" ? "متاح فوراً" : locale === "fr" ? "Accès immédiat" : "Instant access",
            ].map((text) => (
              <div key={text} className="flex items-center gap-2 text-white/40 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
