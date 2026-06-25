export type EventType = "conference" | "meetup" | "workshop" | "hackathon";
export type FundingStage = "pre-seed" | "seed" | "series-a" | "series-b" | "grant";

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  category: string;
  stage: string;
  location: string;
  founded: string;
  team: number;
  raised: string;
  website: string;
  tags: string[];
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  titleFr: string;
  titleAr: string;
  description: string;
  descriptionFr: string;
  descriptionAr: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  city: string;
  online: boolean;
  free: boolean;
  price?: string;
  attendees: number;
  maxAttendees: number;
  speakers: { name: string; role: string; avatar: string }[];
  tags: string[];
  image: string;
  featured: boolean;
}

export interface Investor {
  id: string;
  name: string;
  type: "vc" | "angel" | "incubator" | "accelerator" | "government";
  description: string;
  focus: string[];
  stages: FundingStage[];
  portfolio: number;
  avgTicket: string;
  location: string;
  logo: string;
  website: string;
  featured: boolean;
}

export interface GuideSection {
  id: string;
  icon: string;
  title: string;
  titleFr: string;
  titleAr: string;
  description: string;
  descriptionFr: string;
  descriptionAr: string;
  items: string[];
  color: string;
}

export const STARTUPS: Startup[] = [
  {
    id: "yassir",
    name: "Yassir",
    tagline: "Super app for the Maghreb",
    description: "Ride-hailing, food delivery, and financial services for North Africa",
    logo: "🚗",
    category: "Super App",
    stage: "Series B",
    location: "Algiers",
    founded: "2017",
    team: 500,
    raised: "$193M",
    website: "yassir.com",
    tags: ["Mobility", "Fintech", "Delivery"],
    featured: true,
  },
  {
    id: "nexacom",
    name: "NexaCom",
    tagline: "Enterprise communication platform",
    description: "B2B SaaS solution for enterprise communication and workflow automation",
    logo: "💬",
    category: "SaaS",
    stage: "Seed",
    location: "Oran",
    founded: "2022",
    team: 25,
    raised: "$1.2M",
    website: "nexacom.dz",
    tags: ["SaaS", "B2B", "Communication"],
    featured: true,
  },
  {
    id: "agrovia",
    name: "AgroVia",
    tagline: "Smart agriculture for Algeria",
    description: "IoT-powered precision agriculture platform for Algerian farmers",
    logo: "🌾",
    category: "AgriTech",
    stage: "Pre-seed",
    location: "Constantine",
    founded: "2023",
    team: 12,
    raised: "$340K",
    website: "agrovia.dz",
    tags: ["AgriTech", "IoT", "Sustainability"],
    featured: true,
  },
  {
    id: "medix",
    name: "MediX",
    tagline: "Healthcare reimagined",
    description: "Digital health platform connecting patients with doctors across Algeria",
    logo: "🏥",
    category: "HealthTech",
    stage: "Seed",
    location: "Algiers",
    founded: "2021",
    team: 45,
    raised: "$3.5M",
    website: "medix.dz",
    tags: ["HealthTech", "Telemedicine", "AI"],
    featured: false,
  },
  {
    id: "eduzone",
    name: "EduZone",
    tagline: "Learning without limits",
    description: "Adaptive online education platform tailored for Algerian students",
    logo: "📚",
    category: "EdTech",
    stage: "Series A",
    location: "Algiers",
    founded: "2020",
    team: 80,
    raised: "$8M",
    website: "eduzoneapp.dz",
    tags: ["EdTech", "E-learning", "Arabic"],
    featured: false,
  },
  {
    id: "finova",
    name: "Finova",
    tagline: "Financial inclusion for all",
    description: "Mobile banking and microfinance platform for the unbanked in Algeria",
    logo: "💳",
    category: "Fintech",
    stage: "Seed",
    location: "Setif",
    founded: "2022",
    team: 30,
    raised: "$2.1M",
    website: "finova.dz",
    tags: ["Fintech", "Banking", "Inclusion"],
    featured: false,
  },
];

export const EVENTS: Event[] = [
  {
    id: "dzstartup-summit-2025",
    title: "DzStartup Summit 2025",
    titleFr: "Sommet DzStartup 2025",
    titleAr: "قمة دي زي ستارتاب 2025",
    description: "Algeria's largest annual startup conference bringing together 2000+ founders, investors, and innovators.",
    descriptionFr: "La plus grande conférence annuelle des startups en Algérie réunissant +2000 fondateurs, investisseurs et innovateurs.",
    descriptionAr: "أكبر مؤتمر سنوي للشركات الناشئة في الجزائر يجمع أكثر من 2000 مؤسس ومستثمر ومبتكر.",
    type: "conference",
    date: "2025-09-15",
    time: "09:00 AM",
    location: "Centre International de Conférences Abdelatif Rahal",
    city: "Algiers",
    online: false,
    free: false,
    price: "DZD 3,500",
    attendees: 1847,
    maxAttendees: 2000,
    speakers: [
      { name: "Nour Hafsi", role: "CEO, Yassir", avatar: "NH" },
      { name: "Amira Benlahcen", role: "Partner, DZ Ventures", avatar: "AB" },
      { name: "Karim Medjoub", role: "Minister of Digital Economy", avatar: "KM" },
    ],
    tags: ["Startup", "Innovation", "Investment"],
    image: "/events/summit.jpg",
    featured: true,
  },
  {
    id: "algiers-tech-meetup-aug",
    title: "Algiers Tech Meetup — August Edition",
    titleFr: "Meetup Tech Alger — Édition Août",
    titleAr: "لقاء تقني الجزائر — إصدار أغسطس",
    description: "Monthly gathering of tech professionals, developers, and founders in Algiers. Network, share, and grow.",
    descriptionFr: "Rassemblement mensuel de professionnels tech, développeurs et fondateurs à Alger.",
    descriptionAr: "التجمع الشهري لمحترفي التكنولوجيا والمطورين والمؤسسين في الجزائر.",
    type: "meetup",
    date: "2025-08-07",
    time: "06:30 PM",
    location: "Algiers Hub",
    city: "Algiers",
    online: false,
    free: true,
    attendees: 234,
    maxAttendees: 300,
    speakers: [
      { name: "Sofiane Laib", role: "CTO, NexaCom", avatar: "SL" },
    ],
    tags: ["Tech", "Networking", "Community"],
    image: "/events/meetup.jpg",
    featured: true,
  },
  {
    id: "ai-workshop-oran",
    title: "AI & Machine Learning Workshop",
    titleFr: "Atelier IA & Machine Learning",
    titleAr: "ورشة عمل الذكاء الاصطناعي والتعلم الآلي",
    description: "Hands-on 2-day workshop on building AI-powered products. From theory to production in 48 hours.",
    descriptionFr: "Atelier pratique de 2 jours sur la création de produits alimentés par l'IA.",
    descriptionAr: "ورشة عملية مدتها يومان حول بناء منتجات مدعومة بالذكاء الاصطناعي.",
    type: "workshop",
    date: "2025-08-22",
    time: "10:00 AM",
    location: "USTO Innovation Lab",
    city: "Oran",
    online: false,
    free: false,
    price: "DZD 5,000",
    attendees: 67,
    maxAttendees: 80,
    speakers: [
      { name: "Dr. Fatima Benali", role: "AI Researcher, USTHB", avatar: "FB" },
      { name: "Youcef Harrat", role: "ML Engineer, Google", avatar: "YH" },
    ],
    tags: ["AI", "Machine Learning", "Workshop"],
    image: "/events/workshop.jpg",
    featured: false,
  },
  {
    id: "hack4dz-2025",
    title: "Hack4DZ 2025",
    titleFr: "Hack4DZ 2025",
    titleAr: "هاك فور دي زي 2025",
    description: "48-hour national hackathon solving Algeria's biggest challenges with technology. DZD 5M in prizes.",
    descriptionFr: "Hackathon national de 48h résolvant les plus grands défis de l'Algérie avec la technologie.",
    descriptionAr: "هاكاثون وطني لمدة 48 ساعة لحل أكبر تحديات الجزائر بالتكنولوجيا. جوائز بقيمة 5 مليون دينار.",
    type: "hackathon",
    date: "2025-10-10",
    time: "08:00 AM",
    location: "Multiple Venues",
    city: "Nationwide",
    online: true,
    free: true,
    attendees: 892,
    maxAttendees: 1500,
    speakers: [],
    tags: ["Hackathon", "Innovation", "Prizes"],
    image: "/events/hackathon.jpg",
    featured: true,
  },
  {
    id: "fintech-africa-forum",
    title: "Fintech Africa Forum — Algeria Chapter",
    titleFr: "Forum Fintech Afrique — Chapitre Algérie",
    titleAr: "منتدى فينتك أفريقيا — فصل الجزائر",
    description: "Exploring the future of financial technology in Algeria and North Africa. Payments, DeFi, and digital banking.",
    descriptionFr: "Explorer l'avenir de la technologie financière en Algérie et en Afrique du Nord.",
    descriptionAr: "استكشاف مستقبل التكنولوجيا المالية في الجزائر وشمال أفريقيا.",
    type: "conference",
    date: "2025-09-28",
    time: "09:30 AM",
    location: "Marriott Hotel",
    city: "Algiers",
    online: false,
    free: false,
    price: "DZD 8,000",
    attendees: 412,
    maxAttendees: 500,
    speakers: [
      { name: "Bilal Tabbache", role: "CEO, Finova", avatar: "BT" },
      { name: "Sarah Mansouri", role: "Director, Banque d'Algérie", avatar: "SM" },
    ],
    tags: ["Fintech", "Banking", "Africa"],
    image: "/events/fintech.jpg",
    featured: false,
  },
  {
    id: "greentech-incubation",
    title: "GreenTech Incubation Program Launch",
    titleFr: "Lancement Programme Incubation GreenTech",
    titleAr: "إطلاق برنامج حضانة التقنيات الخضراء",
    description: "Join the first Algerian green technology incubation program. Applications now open for 20 startups.",
    descriptionFr: "Rejoignez le premier programme d'incubation en technologies vertes en Algérie.",
    descriptionAr: "انضم إلى أول برنامج حضانة للتقنيات الخضراء في الجزائر.",
    type: "workshop",
    date: "2025-08-15",
    time: "02:00 PM",
    location: "Online",
    city: "Online",
    online: true,
    free: true,
    attendees: 156,
    maxAttendees: 500,
    speakers: [
      { name: "Hamid Lazreg", role: "Director, Algeria Green Fund", avatar: "HL" },
    ],
    tags: ["GreenTech", "CleanEnergy", "Incubation"],
    image: "/events/greentech.jpg",
    featured: false,
  },
];

export const INVESTORS: Investor[] = [
  {
    id: "dz-ventures",
    name: "DZ Ventures",
    type: "vc",
    description: "Algeria's leading venture capital firm focused on early-stage tech startups across the Maghreb region.",
    focus: ["SaaS", "Fintech", "EdTech", "HealthTech"],
    stages: ["pre-seed", "seed"],
    portfolio: 34,
    avgTicket: "$200K - $2M",
    location: "Algiers",
    logo: "DZ",
    website: "dzventures.dz",
    featured: true,
  },
  {
    id: "algeria-fund",
    name: "Algeria Innovation Fund",
    type: "government",
    description: "Government-backed fund supporting innovative startups with the Startup Algeria label through grants and equity.",
    focus: ["All sectors", "Deep Tech", "AgriTech"],
    stages: ["pre-seed", "seed", "grant"],
    portfolio: 120,
    avgTicket: "DZD 5M - 50M",
    location: "Algiers",
    logo: "AIF",
    website: "fonds-algerie.dz",
    featured: true,
  },
  {
    id: "medina-capital",
    name: "Medina Capital",
    type: "vc",
    description: "Pan-African VC with strong North Africa presence, backing founders building category-defining companies.",
    focus: ["Marketplace", "Mobility", "Logistics"],
    stages: ["seed", "series-a"],
    portfolio: 28,
    avgTicket: "$1M - $10M",
    location: "Algiers / Dubai",
    logo: "MC",
    website: "medinacapital.co",
    featured: true,
  },
  {
    id: "incubateur-usthb",
    name: "USTHB Incubator",
    type: "incubator",
    description: "University-based incubator nurturing deep-tech and research-driven startups from USTHB ecosystem.",
    focus: ["Deep Tech", "Biotech", "AI", "Cybersecurity"],
    stages: ["pre-seed"],
    portfolio: 67,
    avgTicket: "Equity-free support",
    location: "Algiers",
    logo: "UI",
    website: "incubateur.usthb.dz",
    featured: false,
  },
  {
    id: "startup-dz-program",
    name: "Startup DZ Program",
    type: "accelerator",
    description: "National accelerator program offering mentorship, funding, and network access for labeled Algerian startups.",
    focus: ["All Sectors", "Label Startups"],
    stages: ["seed", "series-a"],
    portfolio: 200,
    avgTicket: "DZD 10M + Mentorship",
    location: "Nationwide",
    logo: "SD",
    website: "startup.dz",
    featured: false,
  },
  {
    id: "north-africa-angels",
    name: "North Africa Angels",
    type: "angel",
    description: "Network of 80+ angel investors from Algeria, Morocco, and Tunisia co-investing in promising startups.",
    focus: ["Consumer Tech", "Fintech", "E-commerce"],
    stages: ["pre-seed", "seed"],
    portfolio: 45,
    avgTicket: "$50K - $300K",
    location: "Regional",
    logo: "NA",
    website: "naangels.co",
    featured: false,
  },
];

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "what-is-startup",
    icon: "🚀",
    title: "What is a Startup?",
    titleFr: "Qu'est-ce qu'une Startup?",
    titleAr: "ما هي الشركة الناشئة؟",
    description: "A startup is a high-growth venture designed to scale rapidly by solving a specific problem with an innovative solution.",
    descriptionFr: "Une startup est une entreprise à forte croissance conçue pour évoluer rapidement en résolvant un problème spécifique avec une solution innovante.",
    descriptionAr: "الشركة الناشئة هي مشروع عالي النمو مصمم للتوسع بسرعة من خلال حل مشكلة محددة بحل مبتكر.",
    items: [
      "Innovative product or service",
      "Scalable business model",
      "High growth potential",
      "Technology-driven solution",
      "Disrupts existing markets",
    ],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: "startup-label",
    icon: "🏷️",
    title: "Algerian Startup Label",
    titleFr: "Label Startup Algérien",
    titleAr: "تصنيف الشركة الناشئة الجزائرية",
    description: "The official government certification granting startups access to exclusive benefits, funding, and support programs.",
    descriptionFr: "La certification gouvernementale officielle accordant aux startups l'accès à des avantages exclusifs, des financements et des programmes de soutien.",
    descriptionAr: "الشهادة الحكومية الرسمية التي تمنح الشركات الناشئة إمكانية الوصول إلى مزايا حصرية وتمويل وبرامج دعم.",
    items: [
      "Official government recognition",
      "Access to startup fund",
      "Tax exemptions for 3 years",
      "Priority in public procurement",
      "Dedicated support team",
    ],
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "eligibility",
    icon: "✅",
    title: "Eligibility Criteria",
    titleFr: "Critères d'Éligibilité",
    titleAr: "معايير الأهلية",
    description: "Understanding if your startup qualifies for the Algerian Startup Label and associated government programs.",
    descriptionFr: "Comprendre si votre startup est éligible au Label Startup Algérien et aux programmes gouvernementaux associés.",
    descriptionAr: "فهم ما إذا كانت شركتك الناشئة مؤهلة للحصول على تصنيف الشركة الناشئة الجزائرية والبرامج الحكومية المرتبطة بها.",
    items: [
      "Company < 8 years old",
      "Registered in Algeria",
      "Innovative product/service",
      "Less than 250 employees",
      "Innovation-driven model",
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "tax-advantages",
    icon: "💰",
    title: "Tax Advantages",
    titleFr: "Avantages Fiscaux",
    titleAr: "المزايا الضريبية",
    description: "Labeled startups benefit from significant tax exemptions designed to accelerate growth during critical early stages.",
    descriptionFr: "Les startups labellisées bénéficient d'exonérations fiscales significatives conçues pour accélérer la croissance.",
    descriptionAr: "تستفيد الشركات الناشئة المصنّفة من إعفاءات ضريبية كبيرة مصممة لتسريع النمو خلال المراحل الحرجة.",
    items: [
      "100% corporate tax exemption (3 years)",
      "VAT exemption on equipment",
      "Reduced import duties",
      "No tax on dividends (3 years)",
      "Subsidized coworking spaces",
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "government-support",
    icon: "🏛️",
    title: "Government Support",
    titleFr: "Soutien Gouvernemental",
    titleAr: "الدعم الحكومي",
    description: "Algeria's government offers comprehensive support ecosystem through multiple agencies and dedicated programs.",
    descriptionFr: "Le gouvernement algérien offre un écosystème de soutien complet à travers plusieurs agences et programmes dédiés.",
    descriptionAr: "تقدم الحكومة الجزائرية منظومة دعم شاملة من خلال وكالات متعددة وبرامج مخصصة.",
    items: [
      "ANSEJ — Youth entrepreneurship",
      "CNAC — National unemployment scheme",
      "ANADE — Women entrepreneurship",
      "ANDI — Investment promotion",
      "Digital Algeria 2030 program",
    ],
    color: "from-red-500 to-rose-600",
  },
  {
    id: "registration-steps",
    icon: "📋",
    title: "Registration Process",
    titleFr: "Processus d'Enregistrement",
    titleAr: "عملية التسجيل",
    description: "Step-by-step guide to registering your startup and obtaining the official Algerian Startup Label.",
    descriptionFr: "Guide étape par étape pour enregistrer votre startup et obtenir le Label Startup Algérien officiel.",
    descriptionAr: "دليل خطوة بخطوة لتسجيل شركتك الناشئة والحصول على تصنيف الشركة الناشئة الجزائرية الرسمي.",
    items: [
      "Register at startup.dz portal",
      "Submit business plan",
      "Expert committee review",
      "Label granted within 30 days",
      "Access support programs",
    ],
    color: "from-purple-500 to-violet-600",
  },
];

export const ADMIN_STATS = {
  totalStartups: 2417,
  totalUsers: 8934,
  totalEvents: 47,
  totalInvestors: 183,
  monthlyGrowth: 12.4,
  fundingTotal: "DZD 12.3B",
  pendingApplications: 34,
  activeIncubators: 45,
};
