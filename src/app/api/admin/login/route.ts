"use server";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: { username: string; password: string } = await req.json();
    
    const res = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/admin/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(
        {error: data?.message || "Login failed"},
        {status: res.status},
      );
    }
    
    const response = NextResponse.json({user: data.user});
    response.cookies.set("adminToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    
    return response;
  } catch (err) {
    console.error("API /api/admin/login crashed:", err);
    return NextResponse.json(
      {error: "Internal server error"},
      {status: 500},
    );
  }
}
