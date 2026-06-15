import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FIFA_WORLD_CUP_API_KEY}/get/teams`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });

  const data = await res.json();
  
  return NextResponse.json(data);
}