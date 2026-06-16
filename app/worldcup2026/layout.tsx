// app/worldcup2026/layout.tsx

import ApiPoller from "@/components/ApiPoller";
import { getSnapshot } from "@/lib/getSnapshot";

export default async function WorldCupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const snapshot = await getSnapshot();

	const initialGames = snapshot?.games || [];
	const initialGroups = snapshot?.groups || [];
	const initialTeams = snapshot?.teams || [];

	return (
		<>
			<ApiPoller initialGames={initialGames} initialTeams={initialTeams} initialGroups={initialGroups} />
			{children}
		</>
	);
}