import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_FIFA_WORLD_CUP_API_KEY}/get/team/${teamId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}