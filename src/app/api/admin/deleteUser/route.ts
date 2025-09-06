import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

type backendResponse = {
  success: boolean;
  message: string;
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const {userId} = body;
    
    const cookieHeader: string | null = req.headers.get("cookie");
    
    if (!userId) {
      return NextResponse.json(
        {success: false, message: "userId is required"},
        {status: 400},
      );
    }
    
    const backendRes: AxiosResponse<backendResponse> = await axios.delete(
      `${ process.env.NEXT_PUBLIC_BACKEND_URL }/backend/admin/deleteUser`,
      {
        data: {userId},
        headers: {
          "Content-Type": "application/json",
          cookie: cookieHeader || "",
        },
      },
    );
    
    const {data} = backendRes;
    return NextResponse.json(data, {status: backendRes.status});
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || "Something went wrong",
        },
        {status: error.response?.status || 500},
      );
    } else if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Something went wrong",
        },
        {status: 500},
      );
    } else {
      return NextResponse.json(
        {success: false, message: "Unknown error"},
        {status: 500},
      );
    }
    
  }
}
