import { fetchStadiums } from "@/lib/apiFetches";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const stadiumsData = await fetchStadiums();
	return NextResponse.json(stadiumsData);
}