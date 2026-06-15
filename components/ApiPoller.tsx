"use client";

import { useEffect, useRef } from "react";
import { appendLocalTimeToGames } from "@/lib/utils";
import { useWorldCupStore } from "@/store/worldCupStore";
import {
	Game,
	Group,
	Stadium,
	Team,
} from "@/types/worldCupTypes";

type TeamsResponse = {
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
		setGames(appendLocalTimeToGames(initialGames));
		setTeams(initialTeams);
		setGroups(initialGroups);

		const poll = async () => {
			if (isPollingRef.current) return;

			isPollingRef.current = true;

			try {
				const [teamsRes] =
					await Promise.all([
						fetch("/api/teams", {
							cache: "no-store",
						}),
					]);

				if (!teamsRes.ok) {
					throw new Error(
						`Teams API failed: ${teamsRes.status}`
					);
				}

				const [
					{
						games: gamesData,
						groups: groupsData,
						teams: teamsData,
					}
				] = (await Promise.all([
					teamsRes.json()
				])) as [TeamsResponse];

				if (
					!Array.isArray(gamesData) ||
					!Array.isArray(groupsData) ||
					!Array.isArray(teamsData)
				) {
					throw new Error(
						"Invalid polling response"
					);
				}

				setGames(
					appendLocalTimeToGames(gamesData)
				);
				setTeams(teamsData);
				setGroups(groupsData);
			} catch (error) {
				console.error(
					"Polling failed:",
					error
				);
			} finally {
				isPollingRef.current = false;
			}
		};

		poll();

		const interval = setInterval(
			poll,
			3 * 60 * 1000
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