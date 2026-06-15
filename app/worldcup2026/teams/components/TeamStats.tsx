import { Team } from "@/types/worldCupTypes"

const TeamStats = ({ team }: { team: Team }) => {
	return (
		<div className="mt-8">
			<h2 className="mb-4 text-2xl font-semibold">
				Tournament Statistics
			</h2>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-7">
				<div className="rounded-lg bg-gray-50 p-4 text-center">
					<p className="text-xs text-gray-500">
						MP
					</p>

					<p className="text-xl font-bold">
						{team.mp}
					</p>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 text-center">
					<p className="text-xs text-gray-500">
						W
					</p>

					<p className="text-xl font-bold">
						{team.w}
					</p>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 text-center">
					<p className="text-xs text-gray-500">
						D
					</p>

					<p className="text-xl font-bold">
						{team.d}
					</p>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 text-center">
					<p className="text-xs text-gray-500">
						L
					</p>

					<p className="text-xl font-bold">
						{team.l}
					</p>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 text-center">
					<p className="text-xs text-gray-500">
						GF
					</p>

					<p className="text-xl font-bold">
						{team.gf}
					</p>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 text-center">
					<p className="text-xs text-gray-500">
						GA
					</p>

					<p className="text-xl font-bold">
						{team.ga}
					</p>
				</div>

				<div className="rounded-lg bg-gray-50 p-4 text-center">
					<p className="text-xs text-gray-500">
						GD
					</p>

					<p className="text-xl font-bold">
						{team.gd}
					</p>
				</div>
			</div>
		</div>
	)
}
export default TeamStats