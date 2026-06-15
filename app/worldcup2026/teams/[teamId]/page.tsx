import TeamPageWidget from "./TeamPageWidget";

export default async function TeamPage({
	params,
}: {
	params: Promise<{ teamId: string }>;
}) {
	const { teamId } = await params;

	return <TeamPageWidget teamId={teamId} />;
}