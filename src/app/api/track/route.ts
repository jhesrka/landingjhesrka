import { NextResponse } from "next/server";
import { db } from "@/db";
import { pageViews } from "@/db/schema";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { path, referer: clientReferer } = await req.json();
    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Extract headers
    const userAgent = req.headers.get("user-agent") || null;
    const referer = clientReferer || req.headers.get("referer") || null;
    // Vercel specific headers for country
    const country = req.headers.get("x-vercel-ip-country") || null;

    // Usar cookies para identificar visitantes únicos anónimos
    const cookieStore = await cookies();
    let visitorId = cookieStore.get("jhesrka_visitor_id")?.value;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      // Guardar la cookie por 1 año
      cookieStore.set("jhesrka_visitor_id", visitorId, { 
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax"
      });
    }

    await db.insert(pageViews).values({
      path,
      visitorId,
      userAgent,
      referer,
      country
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking page view:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
