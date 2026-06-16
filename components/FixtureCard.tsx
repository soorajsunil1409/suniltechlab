"use client";

import { STADIUMS } from "@/lib/constants";
import { Game, Stadium, Team } from "@/types/worldCupTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";

const FixtureCard = ({
	game,
	teams,
	home,
	away,
}: {
	game: Game;
	teams: Team[];
	home: string;
	away: string;
}) => {
	const router = useRouter();

	const matchTypes: Record<string, string> = {
		group: "Group Stage",
		r32: "Round of 32",
		r16: "Round of 16",
		qf: "Quarter Final",
		sf: "Semi Final",
		third: "Third Place",
		final: "Final",
	};

	const stadium = STADIUMS.find(
		(s) => s.id === game.stadium_id
	);

	const homeFlag =
		teams.find((team) => team.name_en === home)?.flag ||
		null;

	const awayFlag =
		teams.find((team) => team.name_en === away)?.flag ||
		null;

	const matchStatus =
		game.time_elapsed === "finished"
			? "Finished"
			: game.time_elapsed === "live"
				? "Live"
				: "Upcoming";

	const statusClass =
		game.finished === "TRUE"
			? "bg-green-100 text-green-700"
			: game.time_elapsed !== "notstarted"
				? "bg-red-100 text-red-700"
				: "bg-blue-100 text-blue-700";

	return (
		<div
			onClick={() =>
				router.push(
					`/worldcup2026/matches/${game.id}`
				)
			}
			className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-2xl cursor-pointer"
		>
			<div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">
				<div className="flex flex-wrap gap-2">
					<span className="rounded-full bg-black text-white px-3 py-1 text-xs font-semibold">
						Group {game.group} </span>

					<span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold">
						{matchTypes[game.type] || game.type}
					</span>
				</div>

				<span
					className={`px-3 py-1 rounded-full text-xs font-bold ${statusClass}`}
				>
					{matchStatus}
				</span>
			</div>

			<div className="px-5 py-8">
				<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
					<div className="flex flex-col items-center text-center">
						<div className="w-16 h-16 flex items-center justify-center">
							{homeFlag ? (
								<Image
									src={homeFlag}
									alt={home}
									width={64}
									height={64}
									className="rounded-md border"
								/>
							) : (
								<div className="text-sm text-gray-400">
									TBD
								</div>
							)}
						</div>

						<div className="mt-3 font-bold text-lg">
							{home}
						</div>

						{game.finished === "TRUE" && (
							<div className="mt-2 text-3xl font-black">
								{game.home_score}
							</div>
						)}
					</div>

					<div className="flex flex-col items-center min-w-[180px]">
						<div className="text-xs uppercase tracking-widest text-gray-500">
							Kick Off
						</div>

						<div className="mt-2 font-semibold text-center">
							{game.kickoff_local}
						</div>

						<div className="my-4 text-4xl font-black text-gray-800">
							VS
						</div>

						<div className="text-center text-xs text-gray-500">
							Match #{game.id}
						</div>
					</div>

					<div className="flex flex-col items-center text-center">
						<div className="w-16 h-16 flex items-center justify-center">
							{awayFlag ? (
								<Image
									src={awayFlag}
									alt={away}
									width={64}
									height={64}
									className="rounded-md border"
								/>
							) : (
								<div className="text-sm text-gray-400">
									TBD
								</div>
							)}
						</div>

						<div className="mt-3 font-bold text-lg">
							{away}
						</div>

						{game.finished === "TRUE" && (
							<div className="mt-2 text-3xl font-black">
								{game.away_score}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="border-t bg-gray-50 px-5 py-4">
				<div className="font-medium">
					{stadium?.name_en}
				</div>

				<div className="text-sm text-gray-500 mt-1">
					{stadium?.city_en},{" "}
					{stadium?.country_en}
				</div>
			</div>
		</div>

	);
};

export default FixtureCard;
