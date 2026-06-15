import { Game, Team } from "@/types/worldCupTypes";
import { useRouter } from "next/navigation";

const TeamFixtures = ({ upcomingMatches, teams, team }: { upcomingMatches: Game[], teams: Team[], team: Team }) => {
	const router = useRouter();

	return (
		<div className="mt-8">
			<h2 className="mb-4 text-2xl font-semibold">
				Upcoming Fixtures
			</h2>

			{upcomingMatches.length ? (
				<div
					className="space-y-3"
				>
					{upcomingMatches.map(
						(match) => {
							const opponent =
								match.home_team_id ===
									team.id
									? teams.find((t) =>
										t.id ===
										match.away_team_id
									)
									: teams.find((t) =>
										t.id ===
										match.home_team_id
									);

							return (
								<div
									key={match.id}
									className="rounded-xl border p-4 hover:shadow-md transition ease-in-out"
									onClick={() => router.push(`/worldcup2026/matches/${match.id}`)}
								>
									<div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
										<div>
											<p className="font-semibold">
												{
													team.name_en
												}{" "}
												vs{" "}
												{
													opponent?.name_en
												}
											</p>
										</div>

										<p className="text-sm text-gray-500">
											{new Date(
												match.kickoff_utc
											).toLocaleString(
												"en-IN",
												{
													timeZone:
														"Asia/Kolkata",
												}
											)}
										</p>
									</div>
								</div>
							);
						}
					)}
				</div>
			) : (
				<div className="rounded-xl border p-4 text-gray-500">
					No upcoming fixtures.
				</div>
			)}
		</div>
	)
}
export default TeamFixtures