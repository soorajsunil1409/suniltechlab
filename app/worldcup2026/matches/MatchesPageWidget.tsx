"use client"

import { Game } from "@/types/worldCupTypes";
import { useMemo, useState } from "react";
import { useWorldCupStore } from "@/store/worldCupStore";
import { Filter, Search } from "lucide-react";
import BackButton from "@/components/BackButton";
import FixtureSection from "@/components/FixtureSection";
import { STADIUMS } from "@/lib/constants";

const MatchesPageWidget = () => {
	const { games, teams } = useWorldCupStore();
	const [search, setSearch] = useState<string>("");
	const [filter, setFilter] = useState("all");

	const teamsMap = useMemo(
		() => new Map(teams.map((team) => [team.id, team.name_en])),
		[teams]
	);

	const stadiumsMap = STADIUMS.map((stadium) => [stadium.id, stadium.name_en]);

	const filteredGames = useMemo(() => {
		const searchTerm = search.toLowerCase();

		return games.filter((game) => {
			const homeTeam = teamsMap.get(game.home_team_id) ?? "";
			const awayTeam = teamsMap.get(game.away_team_id) ?? "";
			const stadium = stadiumsMap.find(([id]) => id === game.stadium_id)?.[1] ?? "";

			const matchesSearch =
				homeTeam.toLowerCase().includes(searchTerm) ||
				awayTeam.toLowerCase().includes(searchTerm) ||
				stadium.toLowerCase().includes(searchTerm);

			const matchesFilter =
				filter === "all" ||
				(filter === "live" && game.time_elapsed === "live") ||
				(filter === "upcoming" && game.time_elapsed === "notstarted") ||
				(filter === "finished" && game.time_elapsed === "finished");

			return matchesSearch && matchesFilter;
		});
	}, [games, teamsMap, search, filter]);

	const groupedGames = useMemo(() => {
		if (!Array.isArray(filteredGames)) return {};

		return filteredGames.reduce((acc: Record<string, Game[]>, game) => {
			const date = game.group_date || "TBD";

			if (!acc[date]) {
				acc[date] = [];
			}

			acc[date].push(game);

			return acc;
		}, {});
	}, [filteredGames]);

	return (
		<div className="mx-auto w-full flex flex-col">
			<BackButton destination="/worldcup2026" />

			<div className="w-full h-full  px-4 md:px-6 flex flex-col">
				<div className="flex py-5 z-30 items-center justify-between w-full">
					<div className="w-full">
						<h2 className="text-4xl font-bold text-gray-900 z-0 w-full">
							Fixtures
						</h2>

						<p className="text-gray-500 mt-2">
							Complete FIFA World Cup 2026 Schedule
						</p>
					</div>

					<div className="bg-white rounded-xl px-5 py-3 shadow-sm border">
						<div className="text-sm text-gray-500">
							Total Matches
						</div>

						<div className="text-2xl font-bold">
							{games.length}
						</div>
					</div>
				</div>
				<div className="w-full py-4">
					<div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">

						<div className="relative flex-1">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

							<input
								type="text"
								placeholder="Search teams or matches..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-black placeholder:text-gray-500 outline-none border transition-all"
							/>
						</div>

						<div className="flex items-center gap-2 rounded-xl bg-white border px-3">
							<Filter className="size-4 text-gray-500 shrink-0" />

							<select
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
								className="min-w-[180px] outline-0 rounded-xl bg-white py-3 text-sm font-medium text-gray-700 transition"
							>
								<option value="all">All Matches</option>
								<option value="live">Live</option>
								<option value="upcoming">Upcoming</option>
								<option value="finished">Finished</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<FixtureSection games={filteredGames} teams={teams} groupedGames={groupedGames} />
		</div>
	)
}
export default MatchesPageWidget