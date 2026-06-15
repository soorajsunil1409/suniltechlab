"use client";

import { useMemo, useState } from "react";
import { useWorldCupStore } from "@/store/worldCupStore";
import BackButton from "@/components/BackButton";
import TeamCard from "@/components/TeamCard";

const TeamsPageWidget = () => {
	const { teams, groups } = useWorldCupStore();

	const [search, setSearch] = useState("");
	const [groupFilter, setGroupFilter] = useState("All");

	const filteredTeams = useMemo(() => {
		return teams.filter((team: any) => {
			const matchesSearch =
				team.name_en
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				team.fifa_code
					.toLowerCase()
					.includes(search.toLowerCase());

			const matchesGroup =
				groupFilter === "All" ||
				team.groupName === groupFilter;

			return matchesSearch && matchesGroup;
		});
	}, [teams, search, groupFilter]);

	return (
		<div className="w-full h-full">
			<BackButton destination={"/worldcup2026"} />

			<div className="flex flex-col gap-5 p-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold">
						Teams
					</h1>

					<p className="mt-2 text-gray-500">
						All participating nations and
						their tournament statistics
					</p>
				</div>

				<div className="mb-8 flex flex-col gap-4 md:flex-row">
					<input
						type="text"
						placeholder="Search team..."
						value={search}
						onChange={(e) =>
							setSearch(e.target.value)
						}
						className="w-full rounded-lg border px-4 py-3"
					/>

					<select
						value={groupFilter}
						onChange={(e) =>
							setGroupFilter(e.target.value)
						}
						className="rounded-lg border px-4 py-3"
					>
						<option value="All">
							All Groups
						</option>

						{groups.map((group) => (
							<option
								key={group._id}
								value={group.name}
							>
								{group.name}
							</option>
						))}
					</select>
				</div>

				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
					{filteredTeams.map((team: any) => {
						const opponent =
							team.nextMatch &&
							(team.nextMatch.home_team_id ===
								team.id
								? teams.find(
									(t) =>
										t.id ===
										team.nextMatch
											.away_team_id
								)
								: teams.find(
									(t) =>
										t.id ===
										team.nextMatch
											.home_team_id
								));

						return (
							<TeamCard key={team.id} team={team} opponent={opponent} />
						);
					})}
				</div>
			</div>
		</div>
	);
}
export default TeamsPageWidget