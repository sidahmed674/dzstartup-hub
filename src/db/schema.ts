import { pgTable, serial, text, varchar, timestamp, boolean, integer, real } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"),
  role: varchar("role", { length: 50 }).default("user"),
  avatarUrl: text("avatar_url"),
  city: varchar("city", { length: 100 }),
  phone: varchar("phone", { length: 30 }),
  locale: varchar("locale", { length: 5 }).default("en"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Startups table
export const startups = pgTable("startups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  tagline: text("tagline"),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  stage: varchar("stage", { length: 50 }),
  location: varchar("location", { length: 100 }),
  founded: varchar("founded", { length: 10 }),
  website: text("website"),
  logo: text("logo"),
  teamSize: integer("team_size"),
  raisedAmount: varchar("raised_amount", { length: 50 }),
  featured: boolean("featured").default(false),
  labelStatus: varchar("label_status", { length: 50 }).default("pending"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 300 }).notNull(),
  titleFr: varchar("title_fr", { length: 300 }),
  titleAr: varchar("title_ar", { length: 300 }),
  description: text("description"),
  descriptionFr: text("description_fr"),
  descriptionAr: text("description_ar"),
  type: varchar("type", { length: 50 }),
  eventDate: timestamp("event_date"),
  eventTime: varchar("event_time", { length: 20 }),
  location: text("location"),
  city: varchar("city", { length: 100 }),
  isOnline: boolean("is_online").default(false),
  isFree: boolean("is_free").default(true),
  price: varchar("price", { length: 50 }),
  maxAttendees: integer("max_attendees"),
  currentAttendees: integer("current_attendees").default(0),
  featured: boolean("featured").default(false),
  imageUrl: text("image_url"),
  tags: text("tags"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Investors table
export const investors = pgTable("investors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  type: varchar("type", { length: 50 }),
  description: text("description"),
  focusAreas: text("focus_areas"),
  stages: text("stages"),
  portfolioCount: integer("portfolio_count"),
  avgTicket: varchar("avg_ticket", { length: 100 }),
  location: varchar("location", { length: 100 }),
  logo: varchar("logo", { length: 10 }),
  website: text("website"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Event registrations table
export const eventRegistrations = pgTable("event_registrations", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => events.id),
  userId: integer("user_id").references(() => users.id),
  email: varchar("email", { length: 255 }),
  name: varchar("name", { length: 200 }),
  registeredAt: timestamp("registered_at").defaultNow(),
});

// Newsletter subscribers
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  locale: varchar("locale", { length: 5 }).default("en"),
  active: boolean("active").default(true),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});
