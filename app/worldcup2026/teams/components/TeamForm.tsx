import { Team } from "@/types/worldCupTypes"

const TeamForm = ({ team }: { team: Team }) => {
	const wins = team.recentForm.filter(
		(r) => r === "W"
	).length;

	const draws = team.recentForm.filter(
		(r) => r === "D"
	).length;

	const losses = team.recentForm.filter(
		(r) => r === "L"
	).length;

	return (
		<div className="mt-8 rounded-xl border p-5">
			<h2 className="mb-4 text-2xl font-semibold">
				Recent Form
			</h2>

			<div className="mb-4 flex gap-3">
				{team.recentForm.map(
					(result, index) => (
						<div
							key={index}
							className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${result === "W"
								? "bg-green-500"
								: result === "D"
									? "bg-yellow-500"
									: "bg-red-500"
								}`}
						>
							{result}
						</div>
					)
				)}
			</div>

			<div className="flex flex-wrap gap-6 text-sm">
				<p>
					<strong>
						{wins}
					</strong>{" "}
					Wins
				</p>

				<p>
					<strong>
						{draws}
					</strong>{" "}
					Draws
				</p>

				<p>
					<strong>
						{losses}
					</strong>{" "}
					Losses
				</p>
			</div>
		</div>
	)
}
export default TeamForm