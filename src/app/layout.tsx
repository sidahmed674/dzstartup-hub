import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dzstartup.hub"),
  title: {
    default: "DzStartup Hub — Algeria's Premier Startup Ecosystem",
    template: "%s | DzStartup Hub",
  },
  description:
    "The premier digital ecosystem for Algerian startups, entrepreneurs, incubators, and investors. Connect, grow, and build the future of Algeria.",
  keywords: [
    "Algeria startup",
    "Algerian entrepreneurs",
    "startup incubator Algeria",
    "startup label Algeria",
    "venture capital Algeria",
    "DZ startup ecosystem",
    "innovation Algeria",
    "Yassir",
    "tech Algeria",
    "الشركات الناشئة الجزائرية",
  ],
  authors: [{ name: "DzStartup Hub Team" }],
  creator: "DzStartup Hub",
  publisher: "DzStartup Hub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_DZ"],
    url: "https://dzstartup.hub",
    siteName: "DzStartup Hub",
    title: "DzStartup Hub — Algeria's Premier Startup Ecosystem",
    description:
      "Connect with investors, discover incubators, access funding, and join 2,400+ startups shaping Algeria's innovation economy.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DzStartup Hub - Algeria's Startup Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DzStartup Hub — Algeria's Premier Startup Ecosystem",
    description: "The premier platform for Algerian startups, entrepreneurs and investors.",
    images: ["/og-image.jpg"],
    creator: "@DzStartupHub",
  },
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/icon-192.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#16a34a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="application-name" content="DzStartup Hub" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}` }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
