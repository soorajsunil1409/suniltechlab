import { useWorldCupStore } from "@/store/worldCupStore";
import { useMemo } from "react";
import GroupTable from "./GroupTable";

const GroupSection = () => {
	const { groups, teams } = useWorldCupStore();

	const sortedGroups = useMemo(() => {
		if (!groups || groups.length === 0) return [];

		return groups.sort((a, b) => a.name.localeCompare(b.name));
	}, [groups]);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
			{sortedGroups.map((group) => {
				const teamsInGroup = teams.filter((t) => t.groupName === group.name);

				return (
					<div
						key={group._id}
						className="bg-white rounded-xl border shadow-sm overflow-hidden"
					>
						<div className="px-4 py-3 border-b bg-black text-white">
							<h2 className="text-xl font-bold">
								{group.name}
							</h2>
						</div>

						<GroupTable teams={teamsInGroup} />
					</div>
				)
			})}
		</div>
	)
}
export default GroupSection