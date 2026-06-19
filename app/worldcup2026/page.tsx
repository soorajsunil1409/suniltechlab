import WorldCupHomePage from "./WorldCupHomePage";

export default async function WorldCup() {
	const res = await fetch("https://fotmob.com/api/data/leagues?id=77&ccode3=IND");
	const data = await res.json();

	const fixtures = data.fixtures.allMatches;

	const games = fixtures.map((fixture: any) => {
		const scoreStr = fixture.status?.scoreStr;

		const _id = fixture.id;
		const id = fixture.id;
		const home_team_id = fixture.home.id;
		const away_team_id = fixture.home.id;
		const home_score = scoreStr !== undefined ? scoreStr.split("-")[0].trim() : "0";
		const away_score = scoreStr !== undefined ? scoreStr.split("-")[1].trim() : "0";
		// const home_scorers
		// const away_scorers
		// const group
		// const matchday
		// const local_date
		// const persian_date
		// const stadium_id
		const finished = fixture.status.finished;
		// const time_elapsed
		const type = fixture.round;
		const home_team_name_en = fixture.home.name;
		// const home_team_name_fa
		// not required const home_team_label = fixture.home.shortName;
		const away_team_name_en = fixture.away.name;
		// const away_team_name_fa
		// not required const away_team_label = fixture.away.shortName;
		// const timezone
		// const kickoff_local
		const kickoff_utc = fixture.status.utcTime;
		// const group_date = fixture.groupDate;
		
		return {
			_id,
			id,
			home_team_id,
			away_team_id,
			home_score,
			away_score,
			finished,
			type,
			home_team_name_en,
			away_team_name_en,
			kickoff_utc
		};
	});

	console.log(games);

	return (
		<WorldCupHomePage />
	);
}

