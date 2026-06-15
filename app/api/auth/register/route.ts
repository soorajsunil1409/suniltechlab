import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, password } = body;

  const res = await fetch(`${process.env.NEXT_PUBLIC_FIFA_WORLD_CUP_API_KEY}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });

  const data = await res.json();
  
  return NextResponse.json(data);
}