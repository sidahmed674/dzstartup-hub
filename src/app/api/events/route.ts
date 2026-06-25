import { NextResponse } from "next/server";
import { EVENTS } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";
  const search = searchParams.get("search") || "";
  const free = searchParams.get("free") === "true";
  const online = searchParams.get("online") === "true";

  let results = [...EVENTS];

  if (type !== "all") {
    results = results.filter((e) => e.type === type);
  }

  if (search) {
    results = results.filter(
      (e) =>
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (free) {
    results = results.filter((e) => e.free);
  }

  if (online) {
    results = results.filter((e) => e.online);
  }

  return NextResponse.json({
    data: results,
    total: results.length,
    success: true,
  });
}
