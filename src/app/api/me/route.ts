"use server";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("api/me running");
    const cookieHeader = req.headers.get("cookie");
    
    const res = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader || "",
      },
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(
        {error: data?.message || "User fetch failed"},
        {status: res.status},
      );
    }
    
    return NextResponse.json({user: data.user});
  } catch (err) {
    console.error("API /api/me crashed:", err);
    return NextResponse.json(
      {error: "Internal server error"},
      {status: 500},
    );
  }
}
