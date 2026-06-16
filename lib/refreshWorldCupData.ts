// lib/refreshWorldCupData.ts

import {
	fetchGames,
	fetchGroups,
	fetchTeams,
} from "@/lib/apiFetches";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function refreshWorldCupData() {
	console.log("Refreshing World Cup data...");

	const groups = await fetchGroups();
	const games = await fetchGames();
	const teams = await fetchTeams(groups, games);

	if (
		groups.length === 0 ||
		games.length === 0 ||
		teams.length === 0
	) {
		throw new Error(
			"Refresh aborted because data is incomplete"
		);
	}

	await prisma.worldCupSnapshot.upsert({
		where: { id: 1 },
		update: {
			games: JSON.stringify(games),
			groups: JSON.stringify(groups),
			teams: JSON.stringify(teams),
		},
		create: {
			id: 1,
			games: JSON.stringify(games),
			groups: JSON.stringify(groups),
			teams: JSON.stringify(teams),
		},
	});

	console.log("Snapshot saved");
}