"use client";

import { useEffect } from "react";
import { appendLocalTimeToGames, formatToUTC } from "@/lib/utils";
import { useWorldCupStore } from "@/store/worldCupStore";
import {
	Game,
	Group,
	Stadium,
	Team,
} from "@/types/worldCupTypes";
import { fetchGames, fetchGroups, fetchStadiums, fetchTeams } from "@/lib/apiFetches";

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

	useEffect(() => {
		setGames(appendLocalTimeToGames(initialGames));
		setTeams(initialTeams);
		setStadiums(initialStadiums);
		setGroups(initialGroups);

		const poll = async () => {
			try {
				const [
					gamesData,
					stadiumsData,
					groupsData,
				] = await Promise.all([
					fetchGames(),
					fetchStadiums(),
					fetchGroups(),
				]);

				const teamsData = await fetchTeams(
					groupsData,
					gamesData
				);

				const sortedGames = [...gamesData].sort(
					(a, b) => a.kickoff_utc - b.kickoff_utc
				);

				setGames(
					appendLocalTimeToGames(sortedGames)
				);

				setTeams(teamsData);
				setStadiums(stadiumsData);
				setGroups(groupsData);
			} catch (error) {
				console.error("Polling failed:", error);
			}
		};

		poll();

		const interval = setInterval(
			poll,
			30 * 1000
		);

		return () => clearInterval(interval);
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