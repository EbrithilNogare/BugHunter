export type GameState = "idle" | "playing" | "done";

export interface LeaderboardEntry {
  id: string;
  time: number;
  date: string;
  name: string;
  email: string;
}
