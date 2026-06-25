import { NextResponse } from "next/server";
import { STARTUPS } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const stage = searchParams.get("stage") || "";

  let results = [...STARTUPS];

  if (search) {
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.tagline.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
  }

  if (category && category !== "All") {
    results = results.filter((s) => s.category === category);
  }

  if (stage && stage !== "All Stages") {
    results = results.filter((s) => s.stage === stage);
  }

  return NextResponse.json({
    data: results,
    total: results.length,
    success: true,
  });
}
