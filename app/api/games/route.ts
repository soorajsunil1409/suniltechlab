import { fetchGames } from "@/lib/apiFetches";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const gamesData = await fetchGames();
	return NextResponse.json(gamesData);
}