"use server";

import { NextResponse } from "next/server";
import { User } from "@/types/UserTypes";

type BackendResponse = {
  users?: User[];
  message?: string;
};

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    
    const res = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/admin/customers`, {
      method: "GET",
      headers: {cookie: cookieHeader},
    });
    
    const data: BackendResponse = await res.json();
    
    if (!res.ok) {
      return NextResponse.json(
        {error: data?.message || "Failed to fetch customers"},
        {status: res.status},
      );
    }
    
    return NextResponse.json({users: data.users ?? []});
  } catch (err) {
    console.error("API /api/admin/customers crashed:", err);
    return NextResponse.json(
      {error: "Internal server error"},
      {status: 500},
    );
  }
}
