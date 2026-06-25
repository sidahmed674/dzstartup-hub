import { EVENTS } from "@/lib/data";
import EventDetailClient from "./EventDetailClient";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id) || EVENTS[0];
  return <EventDetailClient event={event} />;
}
