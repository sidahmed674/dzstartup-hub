"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function CTASection() {
  const { locale, isRTL } = useLanguage();

  const content = {
    en: {
      badge: "Start Today — It's Free",
      title: "Ready to Build Algeria's",
      titleHighlight: "Next Unicorn?",
      desc: "Join 2,400+ founders who chose DzStartup Hub to launch, grow, and scale their ventures.",
      cta: "Create Your Account",
      ctaSecondary: "Talk to Our Team",
      features: ["Free to join", "Official startup label", "Investor network"],
    },
    fr: {
      badge: "Commencez aujourd'hui — C'est gratuit",
      title: "Prêt à construire la prochaine",
      titleHighlight: "Licorne d'Algérie?",
      desc: "Rejoignez +2 400 fondateurs qui ont choisi DzStartup Hub pour lancer et faire croître leurs ventures.",
      cta: "Créer votre compte",
      ctaSecondary: "Parler à notre équipe",
      features: ["Gratuit à rejoindre", "Label startup officiel", "Réseau investisseurs"],
    },
    ar: {
      badge: "ابدأ اليوم — مجاناً",
      title: "مستعد لبناء",
      titleHighlight: "وحيد القرن القادم في الجزائر؟",
      desc: "انضم إلى أكثر من 2400 مؤسس اختاروا دي زي ستارتاب هاب لإطلاق مشاريعهم وتطويرها.",
      cta: "أنشئ حسابك",
      ctaSecondary: "تحدث مع فريقنا",
      features: ["مجاني للانضمام", "تصنيف الشركة الرسمي", "شبكة المستثمرين"],
    },
  };

  const c = content[locale];

  return (
    <section className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-green-500/15 via-transparent to-transparent opacity-60" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Algerian Flag Strip */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-white/20 to-red-500" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold mb-8"
        >
          <Zap className="w-4 h-4" fill="currentColor" />
          {c.badge}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05]"
        >
          {c.title}
          <br />
          <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            {c.titleHighlight}
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {c.desc}
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={cn("flex flex-wrap items-center justify-center gap-6 mb-10", isRTL && "flex-row-reverse")}
        >
          {c.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
              <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              {f}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={cn("flex flex-col sm:flex-row gap-4 justify-center", isRTL && "sm:flex-row-reverse")}
        >
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-shadow duration-300"
            >
              {c.cta}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-10 py-5 bg-white/5 border-2 border-white/15 text-white font-bold text-lg rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/25 transition-all duration-200"
            >
              {c.ctaSecondary}
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            { icon: Shield, text: locale === "ar" ? "بيانات آمنة 100%" : locale === "fr" ? "Données 100% sécurisées" : "100% Secure Data" },
            { icon: Globe, text: locale === "ar" ? "متعدد اللغات" : locale === "fr" ? "Multilingue" : "Multilingual Platform" },
            { icon: Zap, text: locale === "ar" ? "دعم 24/7" : locale === "fr" ? "Support 24/7" : "24/7 Support" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/30 text-sm">
              <Icon className="w-4 h-4 text-green-500/70" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
