"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe, Zap, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LANGUAGES } from "@/lib/constants";
import type { Locale } from "@/lib/i18n";

const navLinks = [
  { href: "/startups", key: "startups" as const },
  { href: "/guide", key: "guide" as const },
  { href: "/events", key: "events" as const },
  { href: "/funding", key: "funding" as const },
  { href: "/community", key: "community" as const },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, locale, setLocale, isRTL } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/startups", label: t.nav.startups },
    { href: "/guide", label: t.nav.guide },
    { href: "/events", label: t.nav.events },
    { href: "/funding", label: t.nav.funding },
    { href: "/community", label: t.nav.community },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-neutral-950/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/50"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-shadow duration-300">
                  <Zap className="w-5 h-5 text-white" fill="white" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-neutral-950" />
              </div>
              <div className={cn("flex flex-col leading-none", isRTL && "items-end")}>
                <span className="font-black text-white text-lg tracking-tight">
                  DzStartup
                </span>
                <span className="text-[10px] text-green-400 font-semibold tracking-widest uppercase">
                  Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group rounded-lg hover:bg-white/5"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-green-500 to-emerald-400 group-hover:w-4/5 transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className={cn("hidden lg:flex items-center gap-3", isRTL && "flex-row-reverse")}>
              {/* Language Selector */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase text-xs font-bold tracking-wider">{locale}</span>
                  <ChevronDown
                    className={cn("w-3 h-3 transition-transform duration-200", langOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute top-full mt-2 w-36 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden",
                        isRTL ? "left-0" : "right-0"
                      )}
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLocale(lang.code as Locale);
                            setLangOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150",
                            locale === lang.code
                              ? "bg-green-500/20 text-green-400"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span className="font-medium">{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  {t.nav.login}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="gap-2">
                  {t.nav.register}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden bg-neutral-950/98 backdrop-blur-2xl pt-20"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex flex-col gap-2 flex-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-lg font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200 group"
                    >
                      {item.label}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code as Locale)}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        locale === lang.code
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-white/5 text-white/60 hover:bg-white/10 border border-white/10"
                      )}
                    >
                      {lang.flag} {lang.code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="lg" className="w-full">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button size="lg" className="w-full">
                    {t.nav.register}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
