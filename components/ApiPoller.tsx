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
	initialStadiums,
	initialGroups,
}: {
	initialGames: Game[];
	initialTeams: Team[];
	initialStadiums: Stadium[];
	initialGroups: Group[];
}) => {
	const {
		setGames,
		setTeams,
		setStadiums,
		setGroups,
	} = useWorldCupStore();

	const isPollingRef = useRef(false);

	useEffect(() => {
		setGames(appendLocalTimeToGames(initialGames));
		setTeams(initialTeams);
		setStadiums(initialStadiums);
		setGroups(initialGroups);

		const poll = async () => {
			if (isPollingRef.current) return;

			isPollingRef.current = true;

			try {
				const [teamsRes, stadiumsRes] =
					await Promise.all([
						fetch("/api/teams", {
							cache: "no-store",
						}),
						fetch("/api/stadiums", {
							cache: "no-store",
						}),
					]);

				if (!teamsRes.ok) {
					throw new Error(
						`Teams API failed: ${teamsRes.status}`
					);
				}

				if (!stadiumsRes.ok) {
					throw new Error(
						`Stadiums API failed: ${stadiumsRes.status}`
					);
				}

				const [
					{
						games: gamesData,
						groups: groupsData,
						teams: teamsData,
					},
					stadiumsData,
				] = (await Promise.all([
					teamsRes.json(),
					stadiumsRes.json(),
				])) as [TeamsResponse, Stadium[]];

				if (
					!Array.isArray(gamesData) ||
					!Array.isArray(groupsData) ||
					!Array.isArray(teamsData) ||
					!Array.isArray(stadiumsData)
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
				setStadiums(stadiumsData);
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
			60 * 1000
		);

		return () => {
			clearInterval(interval);
		};
	}, [
		initialGames,
		initialTeams,
		initialStadiums,
		initialGroups,
		setGames,
		setTeams,
		setStadiums,
		setGroups,
	]);

	return null;
};

export default ApiPoller;