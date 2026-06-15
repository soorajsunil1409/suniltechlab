import { Team } from "@/types/worldCupTypes";
import Image from "next/image"
import { useRouter } from "next/navigation";

const TeamCard = ({ team, opponent }: { team: Team; opponent: Team }) => {
	const router = useRouter();

	return (
		<div
			key={team.id}
			className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-xl transition"
			onClick={() => router.push(`/worldcup2026/teams/${team.id}`)}
		>
			<div className="mb-4 flex items-center gap-4">
				<Image
					src={team.flag}
					alt={team.name_en}
					width={60}
					height={40}
					className="rounded"
				/>

				<div>
					<h2 className="text-xl font-bold">
						{team.name_en}
					</h2>

					<p className="text-sm text-gray-500">
						{
							team.fifa_code
						}{" "}
						•{" "}
						{
							team.groupName
						}
					</p>
				</div>
			</div>

			<div className="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-3">
				<div>
					<p className="text-xs text-gray-500">
						Position
					</p>
					<p className="font-bold">
						#
						{
							team.position
						}
					</p>
				</div>

				<div>
					<p className="text-xs text-gray-500">
						Points
					</p>
					<p className="font-bold">
						{team.pts}
					</p>
				</div>

				<div>
					<p className="text-xs text-gray-500">
						GD
					</p>
					<p className="font-bold">
						{team.gd >
							0
							? `+${team.gd}`
							: team.gd}
					</p>
				</div>
			</div>

			<div className="mb-4 grid grid-cols-4 gap-2 text-center">
				<div>
					<p className="text-xs text-gray-500">
						MP
					</p>
					<p className="font-bold">
						{team.mp}
					</p>
				</div>

				<div>
					<p className="text-xs text-gray-500">
						W
					</p>
					<p className="font-bold">
						{team.w}
					</p>
				</div>

				<div>
					<p className="text-xs text-gray-500">
						D
					</p>
					<p className="font-bold">
						{team.d}
					</p>
				</div>

				<div>
					<p className="text-xs text-gray-500">
						L
					</p>
					<p className="font-bold">
						{team.l}
					</p>
				</div>
			</div>

			<div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-gray-50 p-3 text-center">
				<div>
					<p className="text-xs text-gray-500">
						GF
					</p>
					<p className="font-bold">
						{team.gf}
					</p>
				</div>

				<div>
					<p className="text-xs text-gray-500">
						GA
					</p>
					<p className="font-bold">
						{team.ga}
					</p>
				</div>

				<div>
					<p className="text-xs text-gray-500">
						GD
					</p>
					<p className="font-bold">
						{team.gd}
					</p>
				</div>
			</div>

			<div className="mb-4">
				<p className="mb-2 text-sm font-semibold">
					Recent Form
				</p>

				<div className="flex gap-2">
					{team.recentForm.length >
						0 ? (
						team.recentForm.map(
							(
								result: string,
								index: number
							) => (
								<div
									key={
										index
									}
									className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${result ===
										"W"
										? "bg-green-500"
										: result ===
											"D"
											? "bg-yellow-500"
											: "bg-red-500"
										}`}
								>
									{
										result
									}
								</div>
							)
						)
					) : (
						<p className="text-sm text-gray-400">
							No matches
						</p>
					)}
				</div>
			</div>

			<div className="border-t pt-4">
				<p className="mb-2 text-sm font-semibold">
					Next Match
				</p>

				{team.nextMatch ? (
					<>
						<p className="font-medium">
							vs{" "}
							{
								opponent?.name_en
							}
						</p>

						<p className="text-sm text-gray-500">
							{new Date(
								team.nextMatch.kickoff_utc
							).toLocaleString(
								"en-IN",
								{
									timeZone:
										"Asia/Kolkata",
								}
							)}
						</p>
					</>
				) : (
					<p className="text-sm text-gray-400">
						No upcoming match
					</p>
				)}
			</div>
		</div>
	)
}
export default TeamCard