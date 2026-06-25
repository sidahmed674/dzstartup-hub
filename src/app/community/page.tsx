"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Heart, Share2, Bookmark, TrendingUp, Award, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const MEMBERS = [
  { name: "Nour Hafsi", role: "CEO @ Yassir", location: "Algiers", tags: ["Mobility", "Fintech"], avatar: "NH", verified: true, followers: 2340 },
  { name: "Amira Benlahcen", role: "Partner @ DZ Ventures", location: "Algiers", tags: ["VC", "Investment"], avatar: "AB", verified: true, followers: 1890 },
  { name: "Sofiane Laib", role: "CTO @ NexaCom", location: "Oran", tags: ["SaaS", "Engineering"], avatar: "SL", verified: false, followers: 567 },
  { name: "Dr. Fatima Benali", role: "AI Researcher @ USTHB", location: "Algiers", tags: ["AI", "Research"], avatar: "FB", verified: true, followers: 1230 },
  { name: "Youcef Harrat", role: "ML Engineer @ Google", location: "Oran", tags: ["ML", "BigTech"], avatar: "YH", verified: true, followers: 3400 },
  { name: "Bilal Tabbache", role: "CEO @ Finova", location: "Setif", tags: ["Fintech", "Founder"], avatar: "BT", verified: false, followers: 890 },
  { name: "Lina Meziane", role: "UX Lead @ MediX", location: "Constantine", tags: ["Design", "HealthTech"], avatar: "LM", verified: false, followers: 445 },
  { name: "Khaled Amara", role: "Founder @ AgroVia", location: "Constantine", tags: ["AgriTech", "IoT"], avatar: "KA", verified: false, followers: 312 },
];

const POSTS = [
  {
    id: "1",
    author: "Nour Hafsi",
    avatar: "NH",
    role: "CEO @ Yassir",
    time: "2h ago",
    content: "Excited to announce that Yassir just hit 10 million users across North Africa! 🚀 The journey of building a super-app for the Maghreb has been incredible. Thank you to our team, investors, and most importantly, our users. Algeria, we're just getting started! 🇩🇿 #YassirSuperApp #AlgerianStartup",
    likes: 847,
    comments: 134,
    shares: 89,
    tags: ["Announcement", "Milestone"],
  },
  {
    id: "2",
    author: "Dr. Fatima Benali",
    avatar: "FB",
    role: "AI Researcher @ USTHB",
    time: "5h ago",
    content: "Just submitted our research paper on Arabic NLP for Algerian dialect. This could be a game-changer for startups building Arabic-first products in the Maghreb region. Open-source release coming soon! 🤖",
    likes: 423,
    comments: 67,
    shares: 156,
    tags: ["AI", "Research", "Arabic NLP"],
  },
  {
    id: "3",
    author: "Amira Benlahcen",
    avatar: "AB",
    role: "Partner @ DZ Ventures",
    time: "1d ago",
    content: "DZ Ventures is looking for the next generation of Algerian founders building in: Fintech, AgriTech, EdTech, and HealthTech. We're specifically excited about founders solving uniquely Algerian problems with global potential. Applications open — DM me or apply through our website.",
    likes: 612,
    comments: 198,
    shares: 234,
    tags: ["Investment", "OpenToApply"],
  },
];

const GRADIENT_COLORS = [
  "from-green-500 to-emerald-600",
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-violet-600",
  "from-yellow-500 to-orange-500",
  "from-red-500 to-rose-600",
  "from-cyan-500 to-teal-600",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-yellow-600",
];

export default function CommunityPage() {
  const { locale, isRTL } = useLanguage();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSave = (id: string) => {
    setSavedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/8 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-center", isRTL && "rtl")}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              {locale === "ar" ? "مجتمع دي زي ستارتاب" : locale === "fr" ? "Communauté DzStartup" : "DzStartup Community"}
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              {locale === "ar" ? "تواصل مع" : locale === "fr" ? "Connectez avec la" : "Connect with"}
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {locale === "ar" ? "المجتمع" : locale === "fr" ? "Communauté" : "the Community"}
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {locale === "ar"
                ? "انضم إلى أكثر من 8900 مؤسس ومستثمر وخبير في الجزائر."
                : locale === "fr"
                ? "Rejoignez +8 900 fondateurs, investisseurs et experts en Algérie."
                : "Join 8,900+ founders, investors, and experts shaping Algeria's future."}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feed */}
            <div className="lg:col-span-2 space-y-5">
              {/* Post Composer */}
              <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    A
                  </div>
                  <input
                    placeholder={locale === "ar" ? "شارك شيئاً مع المجتمع..." : locale === "fr" ? "Partagez quelque chose avec la communauté..." : "Share something with the community..."}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-green-500/50"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {["🖼️", "📎", "🏷️", "😊"].map((emoji) => (
                      <button key={emoji} className="text-lg hover:scale-125 transition-transform">{emoji}</button>
                    ))}
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-green-500/20 transition-all">
                    {locale === "ar" ? "نشر" : locale === "fr" ? "Publier" : "Post"}
                  </button>
                </div>
              </div>

              {/* Posts */}
              {POSTS.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral-900/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
                >
                  {/* Author */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0", GRADIENT_COLORS[i % GRADIENT_COLORS.length])}>
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{post.author}</span>
                        <span className="text-blue-400 text-xs">✓</span>
                      </div>
                      <div className="text-white/40 text-xs">{post.role} · {post.time}</div>
                    </div>
                    <button className="text-white/20 hover:text-white/50 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <p className="text-white/80 text-sm leading-relaxed mb-4">{post.content}</p>

                  {/* Tags */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-5 pt-3 border-t border-white/5">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors", likedPosts.has(post.id) ? "text-red-400" : "text-white/40 hover:text-red-400")}
                    >
                      <Heart className={cn("w-4 h-4", likedPosts.has(post.id) && "fill-current")} />
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-white/40 hover:text-blue-400 transition-colors font-medium">
                      <MessageSquare className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-white/40 hover:text-green-400 transition-colors font-medium">
                      <Share2 className="w-4 h-4" />
                      {post.shares}
                    </button>
                    <button
                      onClick={() => toggleSave(post.id)}
                      className={cn("ml-auto flex items-center gap-1.5 text-sm font-medium transition-colors", savedPosts.has(post.id) ? "text-yellow-400" : "text-white/40 hover:text-yellow-400")}
                    >
                      <Bookmark className={cn("w-4 h-4", savedPosts.has(post.id) && "fill-current")} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Featured Members */}
              <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-white text-sm">
                    {locale === "ar" ? "الأعضاء المميزون" : locale === "fr" ? "Membres en vedette" : "Featured Members"}
                  </h3>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="space-y-4">
                  {MEMBERS.slice(0, 5).map((member, i) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-xs flex-shrink-0", GRADIENT_COLORS[i % GRADIENT_COLORS.length])}>
                        {member.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-white/90 text-sm group-hover:text-white transition-colors truncate">{member.name}</span>
                          {member.verified && <span className="text-blue-400 text-xs flex-shrink-0">✓</span>}
                        </div>
                        <div className="text-white/40 text-xs truncate">{member.role}</div>
                      </div>
                      <button className="text-xs font-semibold px-2.5 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors flex-shrink-0">
                        +
                      </button>
                    </motion.div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2.5 text-xs text-white/40 hover:text-white/70 text-center border border-white/5 hover:border-white/10 rounded-xl transition-all">
                  {locale === "ar" ? "عرض الكل" : locale === "fr" ? "Voir tous" : "View all members"}
                </button>
              </div>

              {/* Trending Topics */}
              <div className="bg-neutral-900/60 border border-white/5 rounded-2xl p-5">
                <h3 className="font-bold text-white text-sm mb-4">
                  {locale === "ar" ? "الموضوعات الرائجة" : locale === "fr" ? "Tendances" : "Trending Topics"}
                </h3>
                <div className="space-y-3">
                  {["#AlgeriaStartup", "#TechDZ", "#StartupLabel", "#FinovaDZ", "#HackForDZ", "#AI_Algérie"].map((tag, i) => (
                    <div key={tag} className="flex items-center justify-between">
                      <button className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors">{tag}</button>
                      <span className="text-white/30 text-xs">{(234 - i * 28).toLocaleString(locale === "ar" ? "ar-DZ" : locale === "fr" ? "fr-DZ" : "en-US")} posts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Join CTA */}
              <div className="relative overflow-hidden bg-gradient-to-br from-green-500/15 to-emerald-600/5 border border-green-500/20 rounded-2xl p-5">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-bold text-white mb-2 text-sm">
                    {locale === "ar" ? "جاهز للانضمام؟" : locale === "fr" ? "Prêt à rejoindre?" : "Ready to join?"}
                  </h3>
                  <p className="text-white/50 text-xs mb-4">
                    {locale === "ar" ? "انضم إلى المجتمع واستفد من شبكة 8900+ عضو." : locale === "fr" ? "Rejoignez la communauté de +8 900 membres." : "Join a network of 8,900+ entrepreneurs."}
                  </p>
                  <button className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-green-500/20 transition-all">
                    {locale === "ar" ? "انضم الآن" : locale === "fr" ? "Rejoindre" : "Join Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
