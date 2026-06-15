"use client"

import { Game, Group, Stadium, Team } from "@/types/worldCupTypes";
import { useParams } from "next/navigation";
import CurrentMatchWidget from "../../../../components/CurrentMatchWidget";
import GroupTable from "../../../../components/GroupTable";
import { useWorldCupStore } from "@/store/worldCupStore";
import { useEffect, useState } from "react";
import BackButton from "../../../../components/BackButton";

const MatchPageWidget = () => {
	const { matchId } = useParams();

	const {games, stadiums, teams, groups} = useWorldCupStore();


	const [game, setGame] = useState<Game | null>(null);
	const [stadium, setStadium] = useState<Stadium | null>(null);

	useEffect(() => {
		if (!matchId || games.length === 0) return;

		const foundGame = games.find(
			(g) => String(g.id) === String(matchId)
		);

		const foundStadium = stadiums.find(
			(s) => s.id === foundGame?.stadium_id
		);

		if (foundStadium) {
			setStadium(foundStadium);
		}

		if (foundGame) {
			setGame(foundGame);
		}
	}, [matchId, games]);

	if (!game) {
		return (
			<div className="max-w-6xl mx-auto py-20 text-center">
				Match not found
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<BackButton destination="/worldcup2026/matches" />

			<div className="bg-white border-b">
				<div className="max-w-7xl mx-auto py-8 md:py-16 px-4 md:px-6">
					<div className="text-sm text-gray-500 mb-6 md:mb-12 text-center lg:text-left">
						{game.group} • Match {game.id}
					</div>

					<CurrentMatchWidget game={game} teams={teams} />

					<div className="mt-8 md:mt-12 text-center">
						<div className="mt-4 text-gray-500">
							{stadium?.fifa_name} ({stadium?.country_en})
						</div>
					</div>
				</div>
			</div>

			{game.type === "group" && (
				<div className="max-w-7xl mx-auto py-6 md:py-10 px-2 md:px-6">
					<div className="bg-white rounded-xl border overflow-x-auto">
						<div className="px-6 py-5 border-b">
							<h3 className="text-2xl font-bold">
								{game.group}
							</h3>
						</div>

						<GroupTable teams={teams.filter((t) => t.groupName === game.group)} />
					</div>
				</div>
			)}
		</div>
	)
}
export default MatchPageWidget