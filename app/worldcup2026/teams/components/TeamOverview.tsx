import { Team } from "@/types/worldCupTypes"

const TeamOverview = ({ team }: { team: Team }) => {
	const winRate =
		team.mp > 0
			? Math.round(
				(Number(team.w) /
					Number(team.mp)) *
				100
			)
			: 0;

	return (
		<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div className="rounded-xl border p-4">
				<p className="text-xs uppercase text-gray-500">
					Position
				</p>

				<p className="text-3xl font-bold">
					#{team.position}
				</p>
			</div>

			<div className="rounded-xl border p-4">
				<p className="text-xs uppercase text-gray-500">
					Points
				</p>

				<p className="text-3xl font-bold">
					{team.pts}
				</p>
			</div>

			<div className="rounded-xl border p-4">
				<p className="text-xs uppercase text-gray-500">
					Goal Difference
				</p>

				<p className="text-3xl font-bold">
					{team.gd > 0
						? `+${team.gd}`
						: team.gd}
				</p>
			</div>

			<div className="rounded-xl border p-4">
				<p className="text-xs uppercase text-gray-500">
					Win Rate
				</p>

				<p className="text-3xl font-bold">
					{winRate}%
				</p>
			</div>
		</div>
	)
}
export default TeamOverview