import { Team } from "@/types/worldCupTypes"
import Image from "next/image"

const TeamHeader = ({ team }: { team: Team }) => {
	return (
		<div className="flex flex-col gap-6 md:flex-row md:items-center">
			<Image
				src={team.flag}
				alt={team.name_en}
				width={120}
				height={80}
				style={{
					width: "120px",
					height: "auto",
				}}
			/>

			<div>
				<h1 className="text-4xl font-bold">
					{team.name_en}
				</h1>

				<p className="mt-2 text-lg text-gray-500">
					{team.fifa_code} •{" "}
					{team.groupName}
				</p>
			</div>
		</div>
	)
}
export default TeamHeader