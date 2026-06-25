"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Zap, User, Building, Rocket, Target, Mail, Lock, Globe, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type StepKey = "account" | "profile" | "startup" | "goals" | "done";

const STEPS: { key: StepKey; icon: React.ElementType; labelEn: string; labelFr: string; labelAr: string }[] = [
  { key: "account", icon: User, labelEn: "Account", labelFr: "Compte", labelAr: "الحساب" },
  { key: "profile", icon: Building, labelEn: "Profile", labelFr: "Profil", labelAr: "الملف" },
  { key: "startup", icon: Rocket, labelEn: "Startup", labelFr: "Startup", labelAr: "الشركة" },
  { key: "goals", icon: Target, labelEn: "Goals", labelFr: "Objectifs", labelAr: "الأهداف" },
  { key: "done", icon: Check, labelEn: "Done", labelFr: "Terminé", labelAr: "تم" },
];

const CATEGORIES = [
  "SaaS", "Fintech", "EdTech", "HealthTech", "AgriTech",
  "E-commerce", "Logistics", "CleanTech", "AI/ML", "Other",
];

const GOALS = [
  { id: "funding", icon: "💰", labelEn: "Raise Funding", labelAr: "جمع تمويل", labelFr: "Lever des fonds" },
  { id: "incubator", icon: "🏢", labelEn: "Join Incubator", labelAr: "الانضمام لحاضنة", labelFr: "Rejoindre un incubateur" },
  { id: "label", icon: "🏷️", labelEn: "Get Startup Label", labelAr: "الحصول على التصنيف", labelFr: "Obtenir le Label" },
  { id: "network", icon: "🤝", labelEn: "Build Network", labelAr: "بناء شبكة علاقات", labelFr: "Construire un réseau" },
  { id: "mentor", icon: "🎓", labelEn: "Find Mentors", labelAr: "إيجاد موجّهين", labelFr: "Trouver des mentors" },
  { id: "talent", icon: "👨‍💻", labelEn: "Hire Talent", labelAr: "توظيف الكفاءات", labelFr: "Recruter des talents" },
];

export default function RegisterPage() {
  const { locale, isRTL } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "",
    companyName: "", website: "", city: "", phone: "",
    startupName: "", tagline: "", description: "",
  });

  const isLastStep = currentStep === STEPS.length - 1;
  const isDone = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const stepTitle = (step: typeof STEPS[0]) => {
    if (locale === "ar") return step.labelAr;
    if (locale === "fr") return step.labelFr;
    return step.labelEn;
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-2xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="font-black text-white text-xl">DzStartup Hub</span>
            </div>
            <h1 className="text-3xl font-black text-white mb-2">
              {locale === "ar" ? "أنشئ حسابك" : locale === "fr" ? "Créez votre compte" : "Create your account"}
            </h1>
            <p className="text-white/50">
              {locale === "ar" ? "انضم إلى 2400+ شركة ناشئة جزائرية" : locale === "fr" ? "Rejoignez +2400 startups algériennes" : "Join 2,400+ Algerian startups"}
            </p>
          </motion.div>

          {/* Progress */}
          <div className={cn("flex items-center justify-between mb-8 px-4", isRTL && "flex-row-reverse")}>
            {STEPS.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;
              return (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isCompleted ? "#16a34a" : isActive ? "#16a34a20" : "transparent",
                      }}
                      className={cn(
                        "w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all",
                        isCompleted ? "border-green-500 bg-green-500" : isActive ? "border-green-500 bg-green-500/10" : "border-white/10 bg-white/3"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon className={cn("w-4 h-4", isActive ? "text-green-400" : "text-white/30")} />
                      )}
                    </motion.div>
                    <span className={cn("text-xs font-medium hidden sm:block", isActive ? "text-green-400" : "text-white/30")}>
                      {stepTitle(step)}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 h-px bg-white/5 mx-2 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: i < currentStep ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-y-0 left-0 bg-green-500"
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Form Panel */}
          <div className="bg-neutral-900/60 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {/* Step 0: Account */}
              {currentStep === 0 && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className={cn("text-xl font-bold text-white mb-6", isRTL && "text-right")}>
                    {locale === "ar" ? "معلومات الحساب" : locale === "fr" ? "Informations du compte" : "Account Information"}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        {locale === "ar" ? "الاسم الأول" : locale === "fr" ? "Prénom" : "First Name"}
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Ahmed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        {locale === "ar" ? "اللقب" : locale === "fr" ? "Nom" : "Last Name"}
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Benali"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "البريد الإلكتروني" : locale === "fr" ? "Email" : "Email Address"}
                    </label>
                    <div className="relative">
                      <Mail className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ahmed@startup.dz"
                        className={cn(isRTL ? "pr-10" : "pl-10")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "كلمة المرور" : locale === "fr" ? "Mot de passe" : "Password"}
                    </label>
                    <div className="relative">
                      <Lock className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                      <Input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className={cn(isRTL ? "pr-10" : "pl-10")}
                      />
                    </div>
                    <p className="text-white/30 text-xs mt-1.5">
                      {locale === "ar" ? "8 أحرف على الأقل" : locale === "fr" ? "Au moins 8 caractères" : "At least 8 characters"}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Profile */}
              {currentStep === 1 && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className={cn("text-xl font-bold text-white mb-6", isRTL && "text-right")}>
                    {locale === "ar" ? "ملفك الشخصي" : locale === "fr" ? "Votre profil" : "Your Profile"}
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "اسم الشركة" : locale === "fr" ? "Nom de l'entreprise" : "Company Name"}
                    </label>
                    <div className="relative">
                      <Building className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                      <Input
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="My Startup SPA"
                        className={cn(isRTL ? "pr-10" : "pl-10")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "الموقع الإلكتروني" : locale === "fr" ? "Site web" : "Website"}
                    </label>
                    <div className="relative">
                      <Globe className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                      <Input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://mystartup.dz"
                        className={cn(isRTL ? "pr-10" : "pl-10")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        {locale === "ar" ? "المدينة" : locale === "fr" ? "Ville" : "City"}
                      </label>
                      <div className="relative">
                        <MapPin className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Algiers"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/60 mb-2">
                        {locale === "ar" ? "الهاتف" : locale === "fr" ? "Téléphone" : "Phone"}
                      </label>
                      <div className="relative">
                        <Phone className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+213 5xx xx xx"
                          className={cn(isRTL ? "pr-10" : "pl-10")}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Startup */}
              {currentStep === 2 && (
                <motion.div
                  key="startup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h2 className={cn("text-xl font-bold text-white mb-6", isRTL && "text-right")}>
                    {locale === "ar" ? "معلومات الشركة الناشئة" : locale === "fr" ? "Votre Startup" : "Your Startup"}
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "اسم الشركة" : locale === "fr" ? "Nom de la startup" : "Startup Name"}
                    </label>
                    <Input
                      value={formData.startupName}
                      onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                      placeholder="NexaVenture"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "شعار قصير" : locale === "fr" ? "Slogan" : "Tagline"}
                    </label>
                    <Input
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="Revolutionizing X for Algeria"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "الفئة" : locale === "fr" ? "Catégorie" : "Category"}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={cn(
                            "px-3 py-2 rounded-xl text-xs font-semibold border transition-all",
                            selectedCategory === cat
                              ? "bg-green-500/20 border-green-500/40 text-green-400"
                              : "bg-white/3 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "المرحلة" : locale === "fr" ? "Étape" : "Stage"}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Pre-seed", "Seed", "Series A", "Series B+"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStage(s)}
                          className={cn(
                            "px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center",
                            stage === s
                              ? "bg-green-500/20 border-green-500/40 text-green-400"
                              : "bg-white/3 border-white/10 text-white/50 hover:text-white hover:border-white/20"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {locale === "ar" ? "وصف" : locale === "fr" ? "Description" : "Description"}
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      placeholder={locale === "ar" ? "اشرح ما تبنيه..." : locale === "fr" ? "Décrivez ce que vous construisez..." : "Describe what you're building..."}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50 resize-none text-sm"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Goals */}
              {currentStep === 3 && (
                <motion.div
                  key="goals"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className={cn("text-xl font-bold text-white mb-2", isRTL && "text-right")}>
                    {locale === "ar" ? "ما هي أهدافك؟" : locale === "fr" ? "Quels sont vos objectifs?" : "What are your goals?"}
                  </h2>
                  <p className="text-white/40 text-sm mb-6">
                    {locale === "ar" ? "اختر كل ما ينطبق" : locale === "fr" ? "Sélectionnez tout ce qui s'applique" : "Select all that apply"}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {GOALS.map((goal) => {
                      const label = locale === "ar" ? goal.labelAr : locale === "fr" ? goal.labelFr : goal.labelEn;
                      const isSelected = selectedGoals.includes(goal.id);
                      return (
                        <motion.button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                            isSelected
                              ? "bg-green-500/15 border-green-500/50 text-green-400"
                              : "bg-white/3 border-white/5 text-white/60 hover:border-white/15 hover:text-white"
                          )}
                        >
                          <span className="text-2xl">{goal.icon}</span>
                          <span className="font-semibold text-sm">{label}</span>
                          {isSelected && (
                            <Check className="w-4 h-4 ml-auto flex-shrink-0 text-green-400" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Done */}
              {currentStep === 4 && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30"
                  >
                    <Check className="w-12 h-12 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-black text-white mb-3">
                    {locale === "ar" ? "🎉 مرحباً بك!" : locale === "fr" ? "🎉 Bienvenue!" : "🎉 Welcome aboard!"}
                  </h2>
                  <p className="text-white/50 mb-8 max-w-md mx-auto">
                    {locale === "ar"
                      ? "حسابك جاهز. أنت الآن جزء من مجتمع DzStartup Hub."
                      : locale === "fr"
                      ? "Votre compte est prêt. Vous faites maintenant partie de la communauté DzStartup Hub."
                      : "Your account is ready. You're now part of the DzStartup Hub community."}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: "🚀", label: locale === "ar" ? "أطلق شركتك" : locale === "fr" ? "Lancez votre startup" : "Launch your startup" },
                      { icon: "🤝", label: locale === "ar" ? "تواصل مع مستثمرين" : locale === "fr" ? "Connectez avec des investisseurs" : "Connect with investors" },
                      { icon: "📅", label: locale === "ar" ? "انضم لفعاليات" : locale === "fr" ? "Rejoignez des événements" : "Join events" },
                    ].map((item) => (
                      <div key={item.label} className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center">
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="text-white/60 text-xs font-medium">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link href="/dashboard">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-2xl shadow-2xl shadow-green-500/25 hover:scale-105 transition-transform">
                      {locale === "ar" ? "اذهب إلى لوحة التحكم" : locale === "fr" ? "Aller au tableau de bord" : "Go to Dashboard"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            {currentStep < 4 && (
              <div className={cn("flex items-center justify-between mt-8 pt-6 border-t border-white/5", isRTL && "flex-row-reverse")}>
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                    currentStep === 0
                      ? "text-white/20 cursor-not-allowed"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <ArrowLeft className={cn("w-4 h-4", isRTL && "rotate-180")} />
                  {locale === "ar" ? "السابق" : locale === "fr" ? "Précédent" : "Back"}
                </button>

                <div className="text-white/30 text-xs">
                  {currentStep + 1} / {STEPS.length - 1}
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition-all hover:scale-105"
                >
                  {locale === "ar" ? "التالي" : locale === "fr" ? "Suivant" : "Continue"}
                  <ArrowRight className={cn("w-4 h-4", isRTL && "rotate-180")} />
                </button>
              </div>
            )}
          </div>

          {/* Login Link */}
          {currentStep < 4 && (
            <p className="text-center text-white/40 text-sm mt-6">
              {locale === "ar" ? "لديك حساب؟" : locale === "fr" ? "Déjà un compte?" : "Already have an account?"}
              {" "}
              <Link href="/auth/login" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                {locale === "ar" ? "تسجيل الدخول" : locale === "fr" ? "Se connecter" : "Sign in"}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
