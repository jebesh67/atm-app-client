import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({success: true});
  
  res.cookies.set("adminToken", "", {
    path: "/",
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  
  return res;
}
