import { Game, Stadium, Team } from "@/types/worldCupTypes"
import FixtureCardGroup from "./FixtureCardGroup"

const FixtureSection = ({ games, teams, groupedGames }: { games: Game[], teams: Team[], groupedGames: Record<string, Game[]> }) => {

	return (
		<div className="w-full px-4 md:px-6" >
			{
				Object.entries(groupedGames)
					.map(([date, matches]: [string, Game[]]) => (
						<FixtureCardGroup key={date} date={date} matches={matches} teams={teams} />
					))
			}
		</div>
	)
}
export default FixtureSection