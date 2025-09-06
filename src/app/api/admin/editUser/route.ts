import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: { id: string, name: string, accountNumber: string } = await req.json();
    const {id, name, accountNumber} = body;
    
    if (!id || !name || !accountNumber) {
      return NextResponse.json(
        {message: "Missing required fields"},
        {status: 400},
      );
    }
    
    const backendRes = await fetch(`${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/admin/editUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "",
      },
      body: JSON.stringify({id, name, accountNumber}),
      credentials: "include",
    });
    
    const data = await backendRes.json();
    
    if (!backendRes.ok) {
      return NextResponse.json(
        {message: data.message || "Backend error"},
        {status: backendRes.status},
      );
    }
    
    return NextResponse.json({success: true, data}, {status: 200});
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      {status: 500},
    );
  }
}
