"use server";

import { NextResponse } from "next/server";

interface CreateUserRequest {
  name: string;
  accountNumber: string;
  atmPin: string;
}

interface BackendResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

export async function POST(req: Request) {
  try {
    const body: CreateUserRequest = await req.json();
    const cookieHeader = req.headers.get("cookie") ?? "";
    
    const res = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/admin/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify(body),
    });
    
    const data: BackendResponse = await res.json();
    
    if (!res.ok || data.success === false) {
      return NextResponse.json(
        {
          success: false,
          error: data.error || data.message || "User creation failed",
        },
        {status: res.status},
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        message: data.message || "User created successfully",
      },
      {status: 200},
    );
  } catch (err) {
    console.error("API /api/admin/createUser crashed:", err);
    return NextResponse.json(
      {success: false, error: "Internal server error"},
      {status: 500},
    );
  }
}
