"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Play, TrendingUp, Users, Building2, DollarSign } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATS = [
  { icon: TrendingUp, value: "2,400+", labelKey: "startups" as const, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { icon: Users, value: "180+", labelKey: "investors" as const, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Building2, value: "45+", labelKey: "incubators" as const, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: DollarSign, value: "DZD 12B+", labelKey: "funding" as const, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
];

function FloatingParticle({ delay, x, y, size, dur }: { delay: number; x: string; y: string; size: number; dur: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-green-500/20 blur-xl"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: dur,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

const particles = [
  { delay: 0, x: "10%", y: "20%", size: 200, dur: 4 },
  { delay: 1, x: "70%", y: "10%", size: 300, dur: 5 },
  { delay: 2, x: "85%", y: "60%", size: 150, dur: 6 },
  { delay: 0.5, x: "20%", y: "70%", size: 180, dur: 4.5 },
  { delay: 1.5, x: "50%", y: "80%", size: 120, dur: 5.5 },
];

export default function HeroSection() {
  const { t, isRTL, locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const statsLabels = {
    startups: t.stats.startups,
    investors: t.stats.investors,
    incubators: t.stats.incubators,
    funding: t.stats.funding,
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background */}
      <GridBackground />

      {/* Gradient Orbs */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
        {/* Main gradient orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-green-500/10 via-green-900/5 to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-radial from-red-500/8 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-radial from-blue-500/8 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Algerian Flag Stripe Accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-white/30 to-red-500 opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className={cn("flex flex-col items-center text-center", isRTL && "rtl")}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              {t.hero.badge}
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={cn(
              "font-black text-white mb-6 leading-[1.05]",
              "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
              locale === "ar" ? "font-arabic" : ""
            )}
          >
            <span className="block">{t.hero.title}</span>
            <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-white/60 text-lg sm:text-xl leading-relaxed mb-10"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn("flex flex-col sm:flex-row gap-4 mb-16", isRTL && "sm:flex-row-reverse")}
          >
            <Link href="/register">
              <Button size="xl" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ zIndex: 0 }}
                />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="xl" variant="outline" className="group gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
                {t.hero.ctaSecondary}
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={cn(
                  "relative flex flex-col items-center gap-3 p-5 rounded-2xl border backdrop-blur-sm",
                  stat.bg,
                  "hover:border-white/20 transition-all duration-300 group"
                )}
              >
                <div className={cn("p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className={cn("text-2xl font-black text-white mb-1", stat.color === "text-green-400" ? "text-green-300" : "text-white")}>
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-xs font-medium leading-tight">
                    {statsLabels[stat.labelKey]}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs uppercase tracking-widest font-medium">
              {t.hero.scrollHint}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
    </section>
  );
}
