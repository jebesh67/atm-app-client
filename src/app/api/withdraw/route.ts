import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: { amount: number } = await req.json();
    const {amount} = body;
    
    const cookieHeader = req.headers.get("cookie") || "";
    
    if (!amount || amount <= 0) {
      return NextResponse.json(
        {success: false, message: "Invalid amount"},
        {status: 400},
      );
    }
    
    const backendRes = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body: JSON.stringify({amount}),
    });
    
    const data = await backendRes.json();
    
    if (!backendRes.ok) {
      return NextResponse.json(
        {success: false, message: data.message || "Backend error"},
        {status: 500},
      );
    }
    
    return NextResponse.json({
      success: true,
      message: data.message || "Withdraw successful",
    });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      {success: false, message: "Server error"},
      {status: 500},
    );
  }
}
