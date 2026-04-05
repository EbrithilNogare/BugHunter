import { useState, useEffect, useCallback } from "react";
import { LeaderboardEntry } from "../types";

const STORAGE_KEY = "bughunter_leaderboard";

function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    // Migrate old entries that predate the id/name fields
    const parsed = JSON.parse(raw) as Partial<LeaderboardEntry>[];
    return parsed.map((e, i) => ({
      id: e.id ?? String(i),
      time: e.time ?? 0,
      date: e.date ?? "",
      name: e.name ?? "",
    }));
  } catch {
    return [];
  }
}

function persist(entries: LeaderboardEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);

  useEffect(() => {
    setLeaderboard(loadLeaderboard());
  }, []);

  const saveScore = useCallback((time: number) => {
    const id = Date.now().toString();
    setCurrentEntryId(id);
    const entry: LeaderboardEntry = {
      id,
      time,
      date: new Date().toLocaleString(undefined, {
        dateStyle: "short",
        timeStyle: "medium",
      }),
      name: "",
    };
    setLeaderboard((prev) => {
      const updated = [...prev, entry].sort((a, b) => a.time - b.time);
      persist(updated);
      return updated;
    });
  }, []);

  const updateName = useCallback(
    (name: string) => {
      if (!currentEntryId) return;
      setLeaderboard((prev) => {
        const updated = prev.map((e) =>
          e.id === currentEntryId ? { ...e, name } : e,
        );
        persist(updated);
        return updated;
      });
    },
    [currentEntryId],
  );

  return { leaderboard, currentEntryId, saveScore, updateName };
}
