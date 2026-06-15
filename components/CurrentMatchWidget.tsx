import { useWorldCupStore } from "@/store/worldCupStore";
import { Game, Team } from "@/types/worldCupTypes";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CurrentMatchWidgetProps {
	game: Game;
	teams: Team[];
	dark?: boolean;
}

const CurrentMatchWidget = ({ game, teams, dark }: CurrentMatchWidgetProps) => {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const hasStarted = Date.now() >= game.kickoff_utc;

	useEffect(() => {
		if (!game?.kickoff_utc) return;

		const updateTime = () => {
			const now = Date.now();
			const diff = game.kickoff_utc - now;

			if (diff > 0) {
				setTimeLeft({
					days: Math.floor(diff / (1000 * 60 * 60 * 24)),
					hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((diff / (1000 * 60)) % 60),
					seconds: Math.floor((diff / 1000) % 60),
				});
			} else {
				setTimeLeft({
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
				});
			}
		};

		updateTime();

		const interval = setInterval(updateTime, 1000);

		return () => clearInterval(interval);
	}, [game?.kickoff_utc]);

	const homeTeam =
		teams.find((t) => t.name_en === game.home_team_name_en) ||
		teams.find((t) => t.name_en === game.home_team_label);

	const awayTeam =
		teams.find((t) => t.name_en === game.away_team_name_en) ||
		teams.find((t) => t.name_en === game.away_team_label);

	const homeScorers =
		game.home_scorers &&
			game.home_scorers !== "null"
			? game.home_scorers
				.replace(/[{}“”"]/g, "")
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean)
			: [];

	const awayScorers =
		game.away_scorers &&
			game.away_scorers !== "null"
			? game.away_scorers
				.replace(/[{}“”"]/g, "")
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean)
			: [];

	const home_score_color = game.home_score > game.away_score ? "text-green-600" : game.home_score < game.away_score ? "text-red-600" : "text-black";
	const away_score_color = game.away_score > game.home_score ? "text-green-600" : game.away_score < game.home_score ? "text-red-600" : "text-black";

	return (
		<div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 w-full">
			{/* Home Team */}
			<div className="flex-1 flex flex-col items-center lg:items-start">
				<div className="flex items-center gap-4 max-w-full">
					<div className="text-xl md:text-2xl lg:text-3xl font-semibold text-center lg:text-left">
						{game.home_team_name_en ||
							game.home_team_label ||
							"TBD"}
					</div>

					{homeTeam?.flag && (
						<Image
							src={homeTeam.flag}
							alt={
								game.home_team_name_en ||
								game.home_team_label ||
								"Home Team"
							}
							width={64}
							height={64}
							className="h-8 md:h-10 lg:h-12 w-auto border-2"
						/>
					)}
				</div>

				{homeScorers.length > 0 && (
					<div
						className={`mt-3 text-sm text-center lg:text-left ${dark ? "text-gray-200" : "text-gray-500"
							}`}
					>
						{homeScorers.join(", ")}
					</div>
				)}
			</div>

			{/* Match Center */}
			<div className="text-center w-full lg:w-[420px] shrink-0">
				{!hasStarted ? (
					<>
						<div
							className={`text-sm mb-2 ${dark ? "text-gray-200" : "text-gray-500"
								} font-semibold`}
						>
							Kick-off
						</div>

						<div className="text-base md:text-lg font-semibold">
							{game.kickoff_local}
						</div>

						<div className="mt-6">
							<div
								className={`text-sm ${dark ? "text-gray-200" : "text-gray-500"
									} mb-3`}
							>
								Starts In
							</div>

							<div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
								<div className="bg-gray-100 rounded-lg px-2 md:px-4 py-3">
									<div className="text-lg md:text-2xl font-bold text-gray-800">
										{timeLeft.days}
									</div>
									<div className="text-xs text-gray-500">
										Days
									</div>
								</div>

								<div className="bg-gray-100 rounded-lg px-2 md:px-4 py-3">
									<div className="text-lg md:text-2xl font-bold text-gray-800">
										{timeLeft.hours}
									</div>
									<div className="text-xs text-gray-500">
										Hours
									</div>
								</div>

								<div className="bg-gray-100 rounded-lg px-2 md:px-4 py-3">
									<div className="text-lg md:text-2xl font-bold text-gray-800">
										{timeLeft.minutes}
									</div>
									<div className="text-xs text-gray-500">
										Minutes
									</div>
								</div>

								<div className="bg-gray-100 rounded-lg px-2 md:px-4 py-3">
									<div className="text-lg md:text-2xl font-bold text-gray-800">
										{timeLeft.seconds}
									</div>
									<div className="text-xs text-gray-500">
										Seconds
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<>
						{game.time_elapsed === "live" && (
							<div className="text-sm text-red-600 font-semibold mb-2">
								LIVE
							</div>
						)}
						<div className="text-3xl font-black mb-4">
							{game.time_elapsed}
						</div>

						<div className="flex items-center justify-center gap-4">
							<div className={`text-4xl md:text-6xl font-black ${home_score_color}`}>
								{game.home_score ?? 0}
							</div>

							<div className="text-xl md:text-3xl text-gray-400">
								:
							</div>

							<div className={`text-4xl md:text-6xl font-black ${away_score_color}`}>
								{game.away_score ?? 0}
							</div>
						</div>
					</>
				)}
			</div>

			{/* Away Team */}
			<div className="flex-1 flex flex-col items-center lg:items-end">
				<div className="flex items-center gap-4 max-w-full">
					{awayTeam?.flag && (
						<Image
							src={awayTeam.flag}
							alt={
								game.away_team_name_en ||
								game.away_team_label ||
								"Away Team"
							}
							width={64}
							height={64}
							className="h-8 md:h-10 lg:h-12 w-auto border-2"
						/>
					)}

					<div className="text-xl md:text-2xl lg:text-3xl font-semibold text-center lg:text-right">
						{game.away_team_name_en ||
							game.away_team_label ||
							"TBD"}
					</div>
				</div>

				{awayScorers.length > 0 && (
					<div
						className={`mt-3 text-sm text-center lg:text-right ${dark ? "text-gray-200" : "text-gray-500"
							}`}
					>
						{awayScorers.join(", ")}
					</div>
				)}
			</div>
		</div>
	)
};

export default CurrentMatchWidget;