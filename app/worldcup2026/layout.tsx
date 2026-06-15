// app/worldcup2026/layout.tsx

import { fetchGames, fetchGroups, fetchStadiums, fetchTeams } from "@/lib/apiFetches";
import ApiPoller from "@/components/ApiPoller";

export default async function WorldCupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [initialGames, initialStadiums, initialGroups] =
		await Promise.all([
			fetchGames(),
			fetchStadiums(),
			fetchGroups(),
		]);

	const initialTeams = await fetchTeams(
		initialGroups,
		initialGames
	);

	return (
		<>
			<ApiPoller initialGames={initialGames} initialTeams={initialTeams} initialStadiums={initialStadiums} initialGroups={initialGroups} />
			{children}
		</>
	);
}