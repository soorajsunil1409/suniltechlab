// lib/getSnapshot.ts

import { prisma } from "@/lib/prisma";
import {
	Game,
	Group,
	Team,
} from "@/types/worldCupTypes";

export async function getSnapshot() {
	const snapshot =
		await prisma.worldCupSnapshot.findUnique({
			where: {
				id: 1,
			},
		});

	if (!snapshot) {
		return null;
	}

	return {
		games: JSON.parse(snapshot.games) as Game[],
		groups: JSON.parse(snapshot.groups) as Group[],
		teams: JSON.parse(snapshot.teams) as Team[],
		updatedAt: snapshot.updatedAt,
	};
}