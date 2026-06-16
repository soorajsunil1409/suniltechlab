import { Game, Group, Stadium, Team } from "@/types/worldCupTypes";
import { STADIUM_TIMEZONES } from "./constants";
import { formatToUTC } from "./utils";

export const fetchGames: () => Promise<Game[]> = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_FIFA_WORLD_CUP_API_KEY}/get/games`, {
			method: "GET",
			next: { revalidate: 0 },
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
		});


		const data = await res.json();

		const fetchedGames: Game[] = Array.isArray(data.games) ? data.games : [];

		const gamesWithTimezones = fetchedGames.map((game) => {
			const timezone = STADIUM_TIMEZONES[game.stadium_id];

			if (timezone) {
				return {
					...game,
					timezone: timezone,
				};
			}

			return game;
		});

		const gamesInUTC = gamesWithTimezones.map((game) => {
			const { kickoff_utc } = formatToUTC(game);

			return {
				...game,
				kickoff_utc,
			};
		});

		const sortedGames = gamesInUTC.sort(
			(a, b) => a.kickoff_utc - b.kickoff_utc
		);

		return sortedGames;
	} catch (error) {
		console.error("Error fetching games:", error);
		
		throw error;
	}
};

export const fetchStadiums: () => Promise<Stadium[]> = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_FIFA_WORLD_CUP_API_KEY}/get/stadiums`, {
			method: "GET",
			next: { revalidate: 0 },
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
		});

		const data = await res.json();

		const fetchedStadiums: Stadium[] = Array.isArray(data.stadiums) ? data.stadiums : [];

		return fetchedStadiums;
	} catch (error) {
		console.error("Error fetching stadiums:", error);

		throw error;
	}
};

export const fetchTeams: (groups: Group[], games: Game[]) => Promise<Team[]> = async (groups, games) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_FIFA_WORLD_CUP_API_KEY}/get/teams`,
			{
				method: "GET",
				next: { revalidate: 0 },
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
				},
			}
		);

		const data = await res.json();

		const fetchedTeams: Team[] = Array.isArray(data.teams)
			? data.teams
			: [];

		const teams = fetchedTeams.reduce<Team[]>((acc, team) => {
			const group = groups.find((g) =>
				g.teams.some((t) => t.team_id === team.id)
			);

			const standings = group
				? [...group.teams].sort((a, b) => {
					const ptsDiff =
						Number(b.pts) - Number(a.pts);

					if (ptsDiff !== 0) return ptsDiff;

					const gdDiff =
						Number(b.gd) - Number(a.gd);

					if (gdDiff !== 0) return gdDiff;

					return (
						Number(b.gf) - Number(a.gf)
					);
				})
				: [];

			const position =
				standings.findIndex(
					(t) => t.team_id === team.id
				) + 1;

			const stats = group?.teams.find(
				(t) => t.team_id === team.id
			);

			if (!stats) {
				return acc;
			}

			const teamGames = games
				.filter(
					(game) =>
						game.home_team_id === team.id ||
						game.away_team_id === team.id
				)
				.sort(
					(a, b) =>
						b.kickoff_utc - a.kickoff_utc
				);

			const recentForm = teamGames
				.filter(
					(game) =>
						game.finished === "TRUE" ||
						game.finished === "true"
				)
				.slice(0, 5)
				.map((game) => {
					const homeScore = Number(
						game.home_score
					);

					const awayScore = Number(
						game.away_score
					);

					const isHome =
						game.home_team_id === team.id;

					if (homeScore === awayScore)
						return "D" as const;

					if (
						(isHome &&
							homeScore > awayScore) ||
						(!isHome &&
							awayScore > homeScore)
					)
						return "W" as const;

					return "L" as const;
				});

			const nextMatch = games
				.filter(
					(game) =>
						(game.home_team_id === team.id ||
							game.away_team_id ===
							team.id) &&
						game.kickoff_utc > Date.now() &&
						game.finished !== "TRUE" &&
						game.finished !== "true"
				)
				.sort((a, b) => a.kickoff_utc - b.kickoff_utc)[0] ?? null;

			acc.push({
				...team,
				groupName: group?.name ?? "No group",
				position,

				mp: Number(stats.mp),
				w: Number(stats.w),
				d: Number(stats.d),
				l: Number(stats.l),

				gf: Number(stats.gf),
				ga: Number(stats.ga),
				gd: Number(stats.gd),

				pts: Number(stats.pts),

				recentForm,
				nextMatch,
			});

			return acc;
		}, []);

		const sortedTeams = teams.sort((a, b) => b.pts - a.pts);

		// console.log(groups, games);
		return sortedTeams;
	} catch (error) {
		console.error("Error fetching teams:", error);

		throw error;
	}
};

export const fetchGroups: () => Promise<Group[]> = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_FIFA_WORLD_CUP_API_KEY}/get/groups`, {
			method: "GET",
			next: { revalidate: 0 },
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
			},
		});

		const data = await res.json();

		const fetchedGroups: Group[] = Array.isArray(data.groups) ? data.groups : [];

		return fetchedGroups;
	} catch (error) {
		console.error("Error fetching groups:", error);

		throw error;
	}
};