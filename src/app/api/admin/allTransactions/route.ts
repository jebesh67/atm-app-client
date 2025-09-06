import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/types/transactionTypes";

type MeResponse = {
  message: string;
  transactions?: Transaction[];
};

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    
    const backendRes = await fetch(
      `${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/admin/allTransactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
      },
    );
    
    if (!backendRes.ok) {
      await backendRes.json().catch(() => null);
      return NextResponse.json<MeResponse>(
        {
          message: "Failed to fetch transactions",
        },
        {status: backendRes.status},
      );
    }
    
    const data = (await backendRes.json()) as MeResponse;
    
    return NextResponse.json<MeResponse>({
      message: "Transactions fetched successfully",
      transactions: data.transactions,
    });
  } catch (err) {
    console.error("API /transaction error:", err);
    return NextResponse.json<MeResponse>(
      {
        message: "Something went wrong while fetching transactions",
      },
      {status: 500},
    );
  }
}
