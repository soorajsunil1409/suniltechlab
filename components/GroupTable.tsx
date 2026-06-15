import { Group, Team } from "@/types/worldCupTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GroupTable = ({ teams }: { teams: Team[] }) => {
	const router = useRouter();

	return (
		<table className="w-full text-sm">
			<thead className="bg-gray-50">
				<tr>
					<th className="text-left px-3 py-2">Team</th>
					<th className="px-2 py-2">MP</th>
					<th className="px-2 py-2">W</th>
					<th className="px-2 py-2">D</th>
					<th className="px-2 py-2">L</th>
					<th className="px-2 py-2">GF</th>
					<th className="px-2 py-2">GA</th>
					<th className="px-2 py-2">GD</th>
					<th className="px-2 py-2 font-bold">Pts</th>
				</tr>
			</thead>

			<tbody>
				{
					teams.sort((a, b) => Number(b.pts) - Number(a.pts)).map((team) => (
						<tr
							key={team.id}
							className="border-t h-15 items-center hover:bg-gray-100"
							onClick={() => router.push(`/worldcup2026/teams/${team.id}`)}
						>
							<td className="px-3 py-2 font-medium items-center justify-start gap-4 hover:underline">
								<div
									className="flex items-center gap-2"
								>
									<Image className="border" src={`${team.flag}`} width={20} height={20} alt="flag" />
									{team.name_en || "Unknown Team"}
								</div>
							</td>

							<td className="text-center">
								{team.mp}
							</td>

							<td className="text-center">
								{team.w}
							</td>

							<td className="text-center">
								{team.d}
							</td>

							<td className="text-center">
								{team.l}
							</td>

							<td className="text-center">
								{team.gf}
							</td>

							<td className="text-center">
								{team.ga}
							</td>

							<td className="text-center">
								{team.gd}
							</td>

							<td className="text-center font-bold">
								{team.pts}
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	)
}
export default GroupTable