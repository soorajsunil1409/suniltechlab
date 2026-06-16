// store/worldCupStore.ts

import { create } from "zustand";
import { Stadium, Game, Group, Team } from "../types/worldCupTypes";

interface WorldCupStore {
  games: Game[];
  groups: Group[];
  teams: Team[];

  setGames: (games: Game[]) => void;
  setGroups: (groups: Group[]) => void;
  setTeams: (teams: Team[]) => void;

  clearGames: () => void;
  clearGroups: () => void;
  clearTeams: () => void;
}

export const useWorldCupStore = create<WorldCupStore>((set) => ({
  games: [],
  groups: [],
  teams: [],


  setGames: (games) => set({ games }),

  setGroups: (groups) => set({ groups }),

  setTeams: (teams) => set({ teams }),


  clearGames: () => set({ games: [] }),

  clearGroups: () => set({ groups: [] }),

  clearTeams: () => set({ teams: [] }),
}));