import type { Metadata } from "next";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events — DzStartup Hub",
  description:
    "Discover conferences, meetups, workshops, and hackathons shaping Algeria's startup ecosystem.",
};

export default function EventsPage() {
  return <EventsClient />;
}
