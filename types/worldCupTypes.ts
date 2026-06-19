export interface Stadium {
	id: string;
	name_en: string;
	name_fa: string;
	fifa_name: string;
	city_en: string;
	country_en: string;
	capacity: number;
	lat: number;
	lon: number;
}

export interface Game {
	_id: string;
	id: string;
	home_team_id: string;
	away_team_id: string;
	home_score: string;
	away_score: string;
	home_scorers: string | null;
	away_scorers: string | null;
	group: string;
	matchday: string;
	local_date: string;
	persian_date: string;
	stadium_id: string;
	finished: string;
	time_elapsed: string;
	type: string;
	home_team_name_en?: string;
	home_team_name_fa?: string;
	home_team_label?: string;
	away_team_name_en?: string;
	away_team_name_fa?: string;
	away_team_label?: string;
	timezone: string;
	kickoff_local: string;
	kickoff_utc: number;
}

export interface Team {
	id: string;
	name_en: string;
	name_fa: string;
	fifa_code: string;
	groups: string;
	flag: string;

	groupName: string;

	position: number;

	mp: number;
	w: number;
	l: number;
	d: number;

	pts: number;
	gf: number;
	ga: number;
	gd: number;

	recentForm: ("W" | "D" | "L")[];

	nextMatch: Game | null;
}

export interface GroupTeam {
	team_id: string;
	mp: string;
	w: string;
	l: string;
	d: string;
	pts: string;
	gf: string;
	ga: string;
	gd: string;
	_id: string;
}

export interface Group {
	_id: string;
	name: string;
	teams: GroupTeam[];
	createdAt: string;
	__v: number;
}