"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const { locale, isRTL } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const content = {
    en: { title: "Welcome back", subtitle: "Sign in to your DzStartup Hub account", email: "Email", password: "Password", forgot: "Forgot password?", signin: "Sign In", noAccount: "Don't have an account?", signup: "Sign up", or: "Or continue with" },
    fr: { title: "Bon retour", subtitle: "Connectez-vous à votre compte DzStartup Hub", email: "Email", password: "Mot de passe", forgot: "Mot de passe oublié?", signin: "Se connecter", noAccount: "Pas encore de compte?", signup: "S'inscrire", or: "Ou continuer avec" },
    ar: { title: "مرحباً بعودتك", subtitle: "سجّل الدخول إلى حساب DzStartup Hub", email: "البريد الإلكتروني", password: "كلمة المرور", forgot: "نسيت كلمة المرور؟", signin: "تسجيل الدخول", noAccount: "ليس لديك حساب؟", signup: "إنشاء حساب", or: "أو تابع مع" },
  };

  const c = content[locale];

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-white/20 to-red-500" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/30">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <span className="font-black text-white text-xl">DzStartup</span>
              <span className="text-green-400 font-semibold ml-1">Hub</span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-neutral-900/80 border border-white/8 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
          <h1 className={cn("text-2xl font-black text-white mb-1.5", isRTL && "text-right")}>{c.title}</h1>
          <p className={cn("text-white/50 text-sm mb-8", isRTL && "text-right")}>{c.subtitle}</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className={cn("block text-sm font-medium text-white/60 mb-2", isRTL && "text-right")}>{c.email}</label>
              <div className="relative">
                <Mail className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@startup.dz"
                  className={cn(isRTL ? "pr-10" : "pl-10")}
                />
              </div>
            </div>

            <div>
              <div className={cn("flex items-center justify-between mb-2", isRTL && "flex-row-reverse")}>
                <label className="text-sm font-medium text-white/60">{c.password}</label>
                <button className="text-xs text-green-400 hover:text-green-300 transition-colors">{c.forgot}</button>
              </div>
              <div className="relative">
                <Lock className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30", isRTL ? "right-4" : "left-4")} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(isRTL ? "pr-10 pl-10" : "pl-10 pr-10")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn("absolute top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors", isRTL ? "left-4" : "right-4")}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all mt-2"
            >
              {c.signin}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">{c.or}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", emoji: "🇬" },
              { name: "LinkedIn", emoji: "in" },
            ].map((provider) => (
              <button
                key={provider.name}
                className="flex items-center justify-center gap-2 h-11 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-semibold"
              >
                <span>{provider.emoji}</span>
                {provider.name}
              </button>
            ))}
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-white/40 text-sm mt-6">
            {c.noAccount}{" "}
            <Link href="/register" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              {c.signup}
            </Link>
          </p>
        </div>

        {/* Algerian ID */}
        <p className="text-center text-white/20 text-xs mt-6">
          {locale === "ar" ? "🇩🇿 صُنع في الجزائر بـ ❤️" : locale === "fr" ? "🇩🇿 Fait en Algérie avec ❤️" : "🇩🇿 Made in Algeria with ❤️"}
        </p>
      </motion.div>
    </div>
  );
}
