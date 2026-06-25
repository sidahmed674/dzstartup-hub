import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await import("@/db");
    const { sql } = await import("drizzle-orm");
    await db.execute(sql`SELECT 1`);
    return NextResponse.json(
      {
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "DzStartup Hub",
        version: "1.0.0",
        database: "connected",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "degraded",
        timestamp: new Date().toISOString(),
        service: "DzStartup Hub",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 200 }
    );
  }
}
