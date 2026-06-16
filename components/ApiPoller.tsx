"use client";

import { useEffect, useRef } from "react";
import { appendLocalTimeToGames } from "@/lib/utils";
import { useWorldCupStore } from "@/store/worldCupStore";
import {
	Game,
	Group,
	Team,
} from "@/types/worldCupTypes";

type SnapshotResponse = {
	games: Game[];
	groups: Group[];
	teams: Team[];
};

const ApiPoller = ({
	initialGames,
	initialTeams,
	initialGroups,
}: {
	initialGames: Game[];
	initialTeams: Team[];
	initialGroups: Group[];
}) => {
	const {
		setGames,
		setTeams,
		setGroups,
	} = useWorldCupStore();

	const isPollingRef = useRef(false);

	useEffect(() => {
		setGames(
			appendLocalTimeToGames(initialGames)
		);
		setTeams(initialTeams);
		setGroups(initialGroups);

		const poll = async () => {
			if (isPollingRef.current) return;

			isPollingRef.current = true;

			try {
				const response = await fetch(
					"/api/snapshot",
					{
						cache: "no-store",
					}
				);

				if (!response.ok) {
					throw new Error(
						`Snapshot API failed: ${response.status}`
					);
				}

				const {
					games: gamesData,
					groups: groupsData,
					teams: teamsData,
				} =
					(await response.json()) as SnapshotResponse;

				if (
					!Array.isArray(gamesData) ||
					!Array.isArray(groupsData) ||
					!Array.isArray(teamsData)
				) {
					throw new Error(
						"Invalid snapshot response"
					);
				}

				setGames(
					appendLocalTimeToGames(
						gamesData
					)
				);

				setGroups(groupsData);
				setTeams(teamsData);
			} catch (error) {
				console.error(
					"Snapshot polling failed:",
					error
				);
			} finally {
				isPollingRef.current = false;
			}
		};
		
		poll();

		const interval = setInterval(
			poll,
			30 * 1000
		);

		return () => {
			clearInterval(interval);
		};
	}, [
		initialGames,
		initialTeams,
		initialGroups,
		setGames,
		setTeams,
		setGroups,
	]);

	return null;
};

export default ApiPoller;