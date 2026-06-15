// app/worldcup2026/layout.tsx

import { fetchGames, fetchGroups, fetchStadiums, fetchTeams } from "@/lib/apiFetches";
import ApiPoller from "@/components/ApiPoller";

export default async function WorldCupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const initialGames = await fetchGames();
	const initialGroups = await fetchGroups();
	const initialTeams = await fetchTeams(initialGroups, initialGames);
	const initialStadiums = await fetchStadiums();

	return (
		<>
			<ApiPoller initialGames={initialGames} initialTeams={initialTeams} initialStadiums={initialStadiums} initialGroups={initialGroups} />
			{children}
		</>
	);
}