import { fetchGames, fetchGroups, fetchTeams } from "@/lib/apiFetches";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const [groups, games] = await Promise.all([
		fetchGroups(),
		fetchGames(),
	]);

	const teams = await fetchTeams(groups, games);

	return NextResponse.json({groups, games, teams});
}