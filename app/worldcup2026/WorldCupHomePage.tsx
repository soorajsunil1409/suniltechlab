"use client"

import Link from "next/link"
import { CalendarDays, MapPin, Trophy, Users } from "lucide-react"
import { Game, Team } from "@/types/worldCupTypes"
import { useEffect, useState } from "react"
import { appendLocalTimeToGames } from "@/lib/utils"
import { useWorldCupStore } from "@/store/worldCupStore"
import CountDownBar from "@/components/CountdownBar"
import UpcomingMatchWidget from "@/components/UpcomingMatchWidget"

// const WorldCupHomePage = ({ games, teams }: { games: Game[]; teams: Team[] }) => {
const WorldCupHomePage = () => {
	const {games, teams} = useWorldCupStore();
	const [localGames, setLocalGames] = useState<Game[]>([]);

	useEffect(() => {
		const gamesWithLocalTime = appendLocalTimeToGames(games);
		setLocalGames(gamesWithLocalTime);
	}, [games]);

	return (
		<div className="bg-gray-100 h-full">
			<div className="bg-linear-to-r from-black via-gray-900 to-black">
				<CountDownBar />
			</div>

			<div className="max-w-6xl mx-auto px-4 py-8 z-20 flex flex-col gap-6">
				<UpcomingMatchWidget games={localGames} teams={teams} />

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<Link href="/worldcup2026/matches">
						<div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition cursor-pointer border">
							<CalendarDays className="w-8 h-8 mb-3" />
							<h3 className="font-semibold">Fixtures</h3>
							<p className="text-sm text-gray-500">
								Full match schedule
							</p>
						</div>
					</Link>

					<Link href="/worldcup2026/groups">
						<div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition cursor-pointer border">
							<Trophy className="w-8 h-8 mb-3" />
							<h3 className="font-semibold">Groups</h3>
							<p className="text-sm text-gray-500">
								Standings & tables
							</p>
						</div>
					</Link>

					<Link href="/worldcup2026/teams">
						<div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition cursor-pointer border">
							<Users className="w-8 h-8 mb-3" />
							<h3 className="font-semibold">Teams</h3>
							<p className="text-sm text-gray-500">
								All qualified teams
							</p>
						</div>
					</Link>

					<Link href="/worldcup2026/stadiums">
						<div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition cursor-pointer border">
							<MapPin className="w-8 h-8 mb-3" />
							<h3 className="font-semibold">Stadiums</h3>
							<p className="text-sm text-gray-500">
								Host venues
							</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}
export default WorldCupHomePage