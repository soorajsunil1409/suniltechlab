// store/worldCupStore.ts

import { create } from "zustand";
import { Stadium, Game, Group, Team } from "../types/worldCupTypes";

interface WorldCupStore {
  stadiums: Stadium[];
  games: Game[];
  groups: Group[];
  teams: Team[];

  setStadiums: (stadiums: Stadium[]) => void;
  setGames: (games: Game[]) => void;
  setGroups: (groups: Group[]) => void;
  setTeams: (teams: Team[]) => void;

  clearStadiums: () => void;
  clearGames: () => void;
  clearGroups: () => void;
  clearTeams: () => void;
}

export const useWorldCupStore = create<WorldCupStore>((set) => ({
  stadiums: [],
  games: [],
  groups: [],
  teams: [],

  setStadiums: (stadiums) => set({ stadiums }),

  setGames: (games) => set({ games }),

  setGroups: (groups) => set({ groups }),

  setTeams: (teams) => set({ teams }),

  clearStadiums: () => set({ stadiums: [] }),

  clearGames: () => set({ games: [] }),

  clearGroups: () => set({ groups: [] }),

  clearTeams: () => set({ teams: [] }),
}));