"use client";

import { useMemo } from "react";
import { useWorldCupStore } from "@/store/worldCupStore";
import TeamHeader from "../components/TeamHeader";
import TeamOverview from "../components/TeamOverview";
import TeamStats from "../components/TeamStats";
import TeamForm from "../components/TeamForm";
import TeamFixtures from "../components/TeamFixtures";
import BackButton from "@/components/BackButton";

export default function TeamPageWidget({
	teamId,
}: {
	teamId: string;
}) {
	const { teams, games } = useWorldCupStore();

	const team = useMemo(
		() => teams.find((t) => t.id === teamId),
		[teams, teamId]
	);

	if (!team) {
		return (
			<div className="container mx-auto p-6">
				<h1 className="text-2xl font-bold">
					Team not found
				</h1>
			</div>
		);
	}

	const upcomingMatches = games
		.filter(
			(game) =>
				(game.home_team_id === team.id ||
					game.away_team_id === team.id) &&
				game.kickoff_utc > Date.now()
		)
		.sort(
			(a, b) =>
				a.kickoff_utc - b.kickoff_utc
		);

	return (
		<div className="size-full flex flex-col gap-2 items-center">
			<BackButton destination={"/worldcup2026/teams"} />

			<div className="rounded-3xl p-8 shadow-md flex flex-col gap-2 w-full md:w-[70%]">
				<TeamHeader team={team} />

				<TeamOverview team={team} />

				<TeamStats team={team} />

				<TeamForm team={team} />

				<TeamFixtures upcomingMatches={upcomingMatches} teams={teams} team={team} />
			</div>
		</div>
	);
}