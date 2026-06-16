// app/api/test-db/route.ts

import { prisma } from "@/lib/prisma";
import { Game, Group, Team } from "@/types/worldCupTypes";
import { NextResponse } from "next/server";

export async function GET() {
	const snapshot =
		await prisma.worldCupSnapshot.findUnique({
			where: { id: 1 },
		});

	const games = JSON.parse(snapshot!.games) as Game[];
	const groups = JSON.parse(snapshot!.groups) as Group[];
	const teams = JSON.parse(snapshot!.teams) as Team[];

	return NextResponse.json({
		exists: !!snapshot,
		updatedAt: snapshot?.updatedAt,
		games:
			Array.isArray(games)
				? games.length
				: 0,
		groups:
			Array.isArray(groups)
				? groups.length
				: 0,
		teams:
			Array.isArray(teams)
				? teams.length
				: 0,
	});
}