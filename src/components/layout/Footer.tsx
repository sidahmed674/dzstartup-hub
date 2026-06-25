"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, Mail, MapPin, ArrowRight, Send, ExternalLink
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const footerLinks = {
  platform: [
    { href: "/startups", label: "Startups", labelFr: "Startups", labelAr: "الشركات الناشئة" },
    { href: "/guide", label: "Startup Guide", labelFr: "Guide Startup", labelAr: "دليل الشركات" },
    { href: "/events", label: "Events", labelFr: "Événements", labelAr: "الفعاليات" },
    { href: "/funding", label: "Funding", labelFr: "Financement", labelAr: "التمويل" },
    { href: "/community", label: "Community", labelFr: "Communauté", labelAr: "المجتمع" },
  ],
  resources: [
    { href: "/guide/label", label: "Startup Label", labelFr: "Label Startup", labelAr: "تصنيف ناشئة" },
    { href: "/guide/tax", label: "Tax Benefits", labelFr: "Avantages Fiscaux", labelAr: "مزايا ضريبية" },
    { href: "/guide/funding", label: "Funding Guide", labelFr: "Guide Financement", labelAr: "دليل التمويل" },
    { href: "/blog", label: "Blog", labelFr: "Blog", labelAr: "المدونة" },
    { href: "/faq", label: "FAQ", labelFr: "FAQ", labelAr: "الأسئلة الشائعة" },
  ],
  company: [
    { href: "/about", label: "About Us", labelFr: "À Propos", labelAr: "من نحن" },
    { href: "/team", label: "Team", labelFr: "Équipe", labelAr: "الفريق" },
    { href: "/careers", label: "Careers", labelFr: "Carrières", labelAr: "الوظائف" },
    { href: "/press", label: "Press", labelFr: "Presse", labelAr: "الصحافة" },
    { href: "/contact", label: "Contact", labelFr: "Contact", labelAr: "اتصل بنا" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy", labelFr: "Politique de Confidentialité", labelAr: "سياسة الخصوصية" },
    { href: "/terms", label: "Terms of Service", labelFr: "Conditions d'Utilisation", labelAr: "شروط الخدمة" },
    { href: "/cookies", label: "Cookie Policy", labelFr: "Politique Cookies", labelAr: "سياسة الكوكيز" },
  ],
};

const socials = [
  { icon: ExternalLink, href: "#", label: "Twitter / X" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
  { icon: ExternalLink, href: "#", label: "Instagram" },
  { icon: ExternalLink, href: "#", label: "YouTube" },
  { icon: ExternalLink, href: "#", label: "GitHub" },
];

export default function Footer() {
  const { locale, isRTL, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const getLabel = (item: { label: string; labelFr: string; labelAr: string }) => {
    if (locale === "fr") return item.labelFr;
    if (locale === "ar") return item.labelAr;
    return item.label;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-white/5">
      {/* Newsletter Banner */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className={cn("max-w-lg", isRTL && "text-right")}>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t.footer.newsletter}
              </h3>
              <p className="text-white/50 text-sm">
                {locale === "ar"
                  ? "احصل على آخر أخبار الشركات الناشئة، الفعاليات وفرص التمويل مباشرة في صندوق بريدك."
                  : locale === "fr"
                  ? "Recevez les dernières nouvelles des startups, événements et opportunités de financement directement dans votre boîte mail."
                  : "Get the latest startup news, events, and funding opportunities delivered straight to your inbox."}
              </p>
            </div>
            {!subscribed ? (
              <form
                onSubmit={handleSubscribe}
                className={cn(
                  "flex gap-3 w-full lg:w-auto",
                  isRTL && "flex-row-reverse"
                )}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  className="flex-1 lg:w-72 h-12 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 h-12 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 hover:scale-105 whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  {t.footer.subscribe}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 font-semibold"
              >
                ✅ {locale === "ar" ? "تم الاشتراك بنجاح!" : locale === "fr" ? "Abonné avec succès!" : "Successfully subscribed!"}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <span className="font-black text-white text-xl">DzStartup</span>
                <span className="ml-1 text-green-400 font-semibold text-sm">Hub</span>
              </div>
            </Link>
            <p className={cn("text-white/40 text-sm leading-relaxed mb-6 max-w-xs", isRTL && "text-right")}>
              {t.footer.tagline}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <a href="mailto:hello@dzstartup.hub" className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                <Mail className="w-4 h-4 text-green-500 flex-shrink-0" />
                hello@dzstartup.hub
              </a>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                Algiers, Algeria 🇩🇿
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {locale === "ar" ? "المنصة" : locale === "fr" ? "Plateforme" : "Platform"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {getLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {locale === "ar" ? "موارد" : locale === "fr" ? "Ressources" : "Resources"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {getLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {locale === "ar" ? "الشركة" : locale === "fr" ? "Entreprise" : "Company"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {getLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {locale === "ar" ? "قانوني" : locale === "fr" ? "Légal" : "Legal"}
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors duration-150 hover:translate-x-0.5 inline-block"
                  >
                    {getLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} DzStartup Hub. {t.footer.rights}
          </p>
          <div className="flex items-center gap-1 text-white/30 text-sm">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>in Algeria 🇩🇿</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
