import { Game, Team } from "@/types/worldCupTypes";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import CurrentMatchWidget from "./CurrentMatchWidget";

const UpcomingMatchWidget = ({ games, teams }: { games: Game[]; teams: Team[] }) => {
	const router = useRouter();

	const nextMatch = useMemo(() => {
		if (!games.length) return null;

		return games
			.sort((a, b) => {
				return a.kickoff_utc - b.kickoff_utc;
			});
	}, [games])?.filter((game) => game.finished === "FALSE")[0];


	return (
		<div className="cursor-pointer p-10 rounded-3xl text-white bg-linear-to-r from-blue-900 via-blue-700 to-blue-500 shadow-lg" onClick={() => nextMatch && router.push(`/worldcup2026/matches/${nextMatch.id}`)}>
			{
				nextMatch ? (
					<CurrentMatchWidget game={nextMatch} teams={teams} dark={true} />
				) : (
					<div className="bg-gray-200 rounded-xl p-8 text-center">
						<div className="text-xl font-semibold text-gray-700">
							No upcoming matches
						</div>
					</div>
				)
			}
		</div>
	)
}
export default UpcomingMatchWidget