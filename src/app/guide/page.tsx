"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronDown, Check, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GUIDE_SECTIONS } from "@/lib/data";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-semibold text-white/90 text-sm">{item.q}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/40 transition-transform duration-200 flex-shrink-0 ml-4",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
          {item.a}
        </div>
      </motion.div>
    </div>
  );
}

const faqs = [
  {
    q: "Who can apply for the Algerian Startup Label?",
    a: "Any company less than 8 years old, registered in Algeria, with fewer than 250 employees and an innovative product or service, can apply for the Startup Label through the startup.dz portal.",
  },
  {
    q: "How long does the label approval process take?",
    a: "The National Label Committee typically reviews applications within 30 business days. You'll receive a decision via the portal and email.",
  },
  {
    q: "What tax exemptions do labeled startups receive?",
    a: "Labeled startups benefit from 100% corporate tax exemption for 3 years, VAT exemption on equipment, reduced import duties, and no tax on dividends for 3 years.",
  },
  {
    q: "Can foreign entrepreneurs get the Algerian Startup Label?",
    a: "Yes, as long as the company is officially registered in Algeria and meets the eligibility criteria, founders of any nationality can obtain the label.",
  },
  {
    q: "Is there funding available alongside the label?",
    a: "Yes. The Startup Algeria Fund provides equity-free grants and seed funding to labeled startups. The amount ranges from DZD 5M to DZD 50M depending on the project.",
  },
  {
    q: "Can I apply to multiple incubators simultaneously?",
    a: "Yes, you can apply to multiple incubators and accelerators. However, each program has its own selection criteria and timeline.",
  },
];

const timeline = [
  {
    step: "01",
    titleEn: "Idea Validation",
    titleFr: "Validation de l'idée",
    titleAr: "التحقق من الفكرة",
    descEn: "Define your problem, target market, and unique value proposition. Conduct customer discovery interviews.",
    descFr: "Définissez votre problème, marché cible et proposition de valeur unique.",
    descAr: "حدّد مشكلتك والسوق المستهدف وعرض القيمة الفريد.",
    duration: "2-4 weeks",
    color: "from-blue-500 to-indigo-600",
  },
  {
    step: "02",
    titleEn: "Business Registration",
    titleFr: "Enregistrement de l'entreprise",
    titleAr: "تسجيل الشركة",
    descEn: "Register at CNRC, open a bank account, and get your tax identification number from DGI.",
    descFr: "Enregistrez-vous au CNRC, ouvrez un compte bancaire, obtenez votre NIF.",
    descAr: "سجّل في CNRC، افتح حساباً بنكياً واحصل على رقمك الضريبي.",
    duration: "1-2 weeks",
    color: "from-green-500 to-emerald-600",
  },
  {
    step: "03",
    titleEn: "Startup Label Application",
    titleFr: "Demande du Label Startup",
    titleAr: "طلب تصنيف الشركة الناشئة",
    descEn: "Submit your application on startup.dz with your business plan, team info, and financial projections.",
    descFr: "Soumettez votre candidature sur startup.dz avec votre plan d'affaires.",
    descAr: "قدّم طلبك على startup.dz مع خطة عملك ومعلومات الفريق.",
    duration: "30 days review",
    color: "from-yellow-500 to-orange-500",
  },
  {
    step: "04",
    titleEn: "Funding & Incubation",
    titleFr: "Financement & Incubation",
    titleAr: "التمويل والحضانة",
    descEn: "Apply to the Startup Algeria Fund, join an incubator, and access mentorship programs.",
    descFr: "Postulez au Fonds Startup Algérie, rejoignez un incubateur.",
    descAr: "تقدّم لصندوق ناشئة الجزائر وانضم إلى حاضنة.",
    duration: "1-3 months",
    color: "from-purple-500 to-violet-600",
  },
  {
    step: "05",
    titleEn: "Launch & Scale",
    titleFr: "Lancement & Croissance",
    titleAr: "الإطلاق والتوسع",
    descEn: "Launch your MVP, acquire first customers, and start building towards Series A.",
    descFr: "Lancez votre MVP, acquérez vos premiers clients.",
    descAr: "أطلق نموذجك الأولي واكتسب أول عملائك.",
    duration: "6-18 months",
    color: "from-red-500 to-rose-600",
  },
];

export default function GuidePage() {
  const { locale, isRTL, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>(GUIDE_SECTIONS[0].id);

  const activeGuide = GUIDE_SECTIONS.find((s) => s.id === activeSection) || GUIDE_SECTIONS[0];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-center", isRTL && "rtl")}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" />
              {locale === "ar" ? "دليل الشركات الناشئة" : locale === "fr" ? "Guide Startup" : "Startup Guide"}
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              {t.guide.title}
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">{t.guide.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Guide */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("grid grid-cols-1 lg:grid-cols-4 gap-8", isRTL && "lg:grid-flow-col-dense")}>
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-2">
                {GUIDE_SECTIONS.map((section) => {
                  const title = locale === "ar" ? section.titleAr : locale === "fr" ? section.titleFr : section.title;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left",
                        activeSection === section.id
                          ? "bg-green-500/15 border border-green-500/30 text-green-400"
                          : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                      )}
                    >
                      <span className="text-xl">{section.icon}</span>
                      <span className="leading-tight">{title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={cn("bg-neutral-900/60 border border-white/5 rounded-2xl p-8", isRTL && "rtl")}
              >
                {/* Icon + Title */}
                <div className="flex items-start gap-5 mb-6">
                  <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-3xl flex-shrink-0", activeGuide.color)}>
                    {activeGuide.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white mb-2">
                      {locale === "ar" ? activeGuide.titleAr : locale === "fr" ? activeGuide.titleFr : activeGuide.title}
                    </h2>
                    <p className="text-white/50 leading-relaxed">
                      {locale === "ar" ? activeGuide.descriptionAr : locale === "fr" ? activeGuide.descriptionFr : activeGuide.description}
                    </p>
                  </div>
                </div>

                {/* Key Points */}
                <div className="border-t border-white/5 pt-6 mb-8">
                  <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                    {locale === "ar" ? "النقاط الرئيسية" : locale === "fr" ? "Points Clés" : "Key Points"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeGuide.items.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5"
                      >
                        <div className={cn("w-6 h-6 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0", activeGuide.color)}>
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-white/70 text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/register">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all">
                      {locale === "ar" ? "ابدأ الآن" : locale === "fr" ? "Commencer maintenant" : "Get Started"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <a href="https://startup.dz" target="_blank" rel="noopener noreferrer">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/70 font-semibold rounded-xl hover:bg-white/10 hover:text-white transition-all">
                      {locale === "ar" ? "الموقع الرسمي" : locale === "fr" ? "Site Officiel" : "Official Portal"}
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("text-center mb-16", isRTL && "rtl")}>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {locale === "ar" ? "رحلة الشركة الناشئة الجزائرية" : locale === "fr" ? "Le Parcours Startup Algérien" : "The Algerian Startup Journey"}
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              {locale === "ar"
                ? "خمس خطوات لتحويل فكرتك إلى شركة ناشئة جزائرية ناجحة."
                : locale === "fr"
                ? "Cinq étapes pour transformer votre idée en startup algérienne réussie."
                : "Five steps to transform your idea into a successful Algerian startup."}
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-blue-500 via-green-500 via-yellow-500 via-purple-500 to-red-500 hidden lg:block" />

            <div className="space-y-6">
              {timeline.map((step, i) => {
                const title = locale === "ar" ? step.titleAr : locale === "fr" ? step.titleFr : step.titleEn;
                const desc = locale === "ar" ? step.descAr : locale === "fr" ? step.descFr : step.descEn;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={cn("flex gap-6 items-start", isRTL && "flex-row-reverse")}
                  >
                    <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg relative z-10", step.color)}>
                      {step.step}
                    </div>
                    <div className="flex-1 bg-neutral-900/60 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-white text-lg mb-1">{title}</h3>
                          <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                        </div>
                        <span className="text-xs font-semibold text-white/30 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap border border-white/5">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-neutral-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn("text-center mb-12", isRTL && "rtl")}
          >
            <h2 className="text-3xl font-black text-white mb-3">
              {locale === "ar" ? "الأسئلة الشائعة" : locale === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions"}
            </h2>
            <p className="text-white/50">
              {locale === "ar" ? "إجابات على أكثر الأسئلة شيوعاً" : locale === "fr" ? "Réponses aux questions les plus posées" : "Answers to the most common questions"}
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem
                  item={faq}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
