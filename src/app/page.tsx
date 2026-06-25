import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import StartupShowcase from "@/components/sections/StartupShowcase";
import EventsPreview from "@/components/sections/EventsPreview";
import GuidePreview from "@/components/sections/GuidePreview";
import FundingSection from "@/components/sections/FundingSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "DzStartup Hub — Algeria's Premier Startup Ecosystem",
  description:
    "Connect with investors, discover incubators, access funding, and join 2,400+ startups shaping Algeria's innovation economy.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StartupShowcase />
      <GuidePreview />
      <EventsPreview />
      <FundingSection />
      <CTASection />
      <Footer />
    </main>
  );
}
