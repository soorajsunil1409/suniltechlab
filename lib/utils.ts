import { Game } from "@/types/worldCupTypes";
import { clsx, type ClassValue } from "clsx"
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge"
import { MAP_BOUNDS } from "./constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export const formatToUTC = (game: Game) => {
  const [datePart, timePart] = game.local_date.split(" ");
  const [month, day, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const localDate = new Date(
    year,
    month - 1,
    day,
    hour,
    minute
  );

  const utcDate = fromZonedTime(
    localDate,
    game.timezone
  );

  return {
    utcDate,
    kickoff_utc: utcDate.getTime(),
  };
};


export const appendLocalTimeToGames = (
  games: Game[]
) => {
  const userTimezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  return games.map((game) => {
    if (!game.kickoff_utc) {
      console.error(
        "Missing kickoff_utc",
        game
      );

      return game;
    }

    const date = new Date(game.kickoff_utc);

    if (isNaN(date.getTime())) {
      console.error(
        "Invalid kickoff_utc",
        game.kickoff_utc,
        game
      );

      return game;
    }

    const localTime = formatInTimeZone(
      date,
      userTimezone,
      "dd MMM yyyy, HH:mm"
    );

    const group_date = formatInTimeZone(
      date,
      userTimezone,
      "MMM dd, yyyy"
    );

    return {
      ...game,
      kickoff_local: localTime,
      group_date,
    };
  });
};


export const projectToMap = (
	lat: number,
	lon: number
) => {
	const left =
		((lon - MAP_BOUNDS.lonMin) /
			(MAP_BOUNDS.lonMax -
				MAP_BOUNDS.lonMin)) *
		100;

	const top =
		((MAP_BOUNDS.latMax - lat) /
			(MAP_BOUNDS.latMax -
				MAP_BOUNDS.latMin)) *
		100;

	return { left, top };
}
