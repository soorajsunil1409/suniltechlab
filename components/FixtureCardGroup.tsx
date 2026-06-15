"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Game, Stadium, Team } from "@/types/worldCupTypes";
import FixtureCard from "./FixtureCard";

const FixtureCardGroup = ({
  date,
  matches,
  teams,
  stadiums,
}: {
  date: string;
  matches: Game[];
  teams: Team[];
  stadiums: Stadium[];
}) => {
  const [open, setOpen] = useState(true);

  return (
    <section className="mb-8 flex flex-col gap-10">
      <button
        onClick={() => setOpen(!open)}
        className="
          sticky top-0 z-20
          w-full
          bg-gray-100/95
          backdrop-blur-md
          rounded-2xl
          px-5 py-4
          flex items-center justify-between
          border border-gray-200
          hover:bg-white
          transition-all
        "
      >
        <div className="flex items-center gap-3">
          <h3 className="text-xl md:text-2xl font-bold">
            {date}
          </h3>

          <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
            {matches.length} Match{matches.length > 1 ? "es" : ""}
          </span>
        </div>

        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`
          transition-all
          duration-300
          ${open ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="grid gap-5">
          {matches.map((game) => {
            const home =
              game.home_team_name_en ||
              game.home_team_label ||
              "TBD";

            const away =
              game.away_team_name_en ||
              game.away_team_label ||
              "TBD";

            return (
              <FixtureCard
                key={game.id}
                game={game}
                teams={teams}
                stadiums={stadiums}
                home={home}
                away={away}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FixtureCardGroup;