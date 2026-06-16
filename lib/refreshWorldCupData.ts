// lib/refreshWorldCupData.ts

import {
	fetchGames,
	fetchGroups,
	fetchTeams,
} from "@/lib/apiFetches";

import { prisma } from "@/lib/prisma";

async function retry<T>(
	fn: () => Promise<T>,
	retries = 3
): Promise<T> {
	let error;

	for (let i = 0; i < retries; i++) {
		try {
			return await fn();
		} catch (err) {
			error = err;

			await new Promise((r) =>
				setTimeout(
					r,
					1000 * (i + 1)
				)
			);
		}
	}

	throw error;
}

export async function refreshWorldCupData() {
	console.log("Refreshing World Cup data...");

	try {
		const [groups, games] =
			await Promise.all([
				retry(fetchGroups),
				retry(fetchGames),
			]);

		const teams = await retry(() =>
			fetchTeams(groups, games)
		);

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
	} catch (error) {
		console.error(
			"Refresh failed, keeping existing snapshot",
			error
		);
	}
}