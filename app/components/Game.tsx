"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import CODE_LINES from "../codeLines";
import {
  FILE_HEADER_HEIGHT,
  HOVER_MS,
  LINE_HEIGHT,
  TOTAL_BUGS,
  VISIBLE_LINES,
} from "../constants";
import { GameState } from "../types";
import { formatTime } from "../utils";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { useScrollMultiplier } from "../hooks/useScrollMultiplier";
import { useScrollInput } from "../hooks/useScrollInput";
import { useNewRelicLogger } from "../hooks/useNewRelicLogger";
import { BugCounter } from "./BugCounter";
import { CodeViewer } from "./CodeViewer";
import { Minimap } from "./Minimap";
import { Leaderboard } from "./Leaderboard";
import { PRHeader } from "./PRHeader";
import { IdleOverlay } from "./IdleOverlay";
import { DoneOverlay } from "./DoneOverlay";
import { SettingsModal } from "./SettingsModal";
import s from "./Game.module.css";

function pickBugLine(usedLines: Set<number>, min: number, max: number): number {
  const range = max - min + 1;
  let line = min;
  let attempts = 0;
  do {
    line = min + Math.floor(Math.random() * range);
    attempts++;
    if (attempts > range * 2) break;
  } while (usedLines.has(line));
  return line;
}

export function Game() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [bugLine, setBugLine] = useState(0);
  const [foundCount, setFoundCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState(VISIBLE_LINES);
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { leaderboard, currentEntryId, saveScore, updateName, updateEmail } =
    useLeaderboard();
  const { scrollMultiplier, scrollMultiplierRef, updateScrollMultiplier } =
    useScrollMultiplier();
  const { loggingSettings, loggingError, updateLoggingSettings, log } =
    useNewRelicLogger();

  const usedLinesRef = useRef<Set<number>>(new Set());
  const foundCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const visibleLineCountRef = useRef(VISIBLE_LINES);
  const codeAreaRef = useRef<HTMLDivElement>(null);

  const centerOffset = Math.floor(visibleLineCount / 2);
  const bugCentered = Math.abs(bugLine - (scrollIndex + centerOffset)) <= 2;

  // Measure code area height and compute visible line count
  useEffect(() => {
    const el = codeAreaRef.current;
    if (!el) return;
    const measure = () => {
      const count = Math.max(
        1,
        Math.floor((el.clientHeight - FILE_HEADER_HEIGHT) / LINE_HEIGHT),
      );
      visibleLineCountRef.current = count;
      setVisibleLineCount(count);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useScrollInput(
    gameState === "playing",
    scrollMultiplierRef,
    visibleLineCountRef,
    setScrollIndex,
  );

  const spawnBug = useCallback(() => {
    const vl = Math.min(visibleLineCountRef.current, CODE_LINES.length);
    const co = Math.floor(vl / 2);
    const min = co;
    const max = Math.max(min, CODE_LINES.length - vl + co);
    const line = pickBugLine(usedLinesRef.current, min, max);
    usedLinesRef.current.add(line);
    setBugLine(line);
  }, []);

  const catchBug = useCallback(() => {
    foundCountRef.current += 1;
    setFoundCount(foundCountRef.current);

    if (foundCountRef.current >= TOTAL_BUGS) {
      if (timerRef.current) clearInterval(timerRef.current);
      const time = Date.now() - startTimeRef.current;
      setFinalTime(time);
      setGameState("done");
      saveScore(time);
    } else {
      spawnBug();
    }
  }, [spawnBug, saveScore]);

  // Catch bug when the center line holds on it for HOVER_MS
  useEffect(() => {
    if (gameState !== "playing" || !bugCentered) return;
    const timer = setTimeout(catchBug, HOVER_MS);
    return () => clearTimeout(timer);
  }, [bugCentered, gameState, catchBug]);

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    usedLinesRef.current = new Set();
    foundCountRef.current = 0;

    setFoundCount(0);
    setScrollIndex(0);
    setElapsed(0);
    setPlayerName("");
    setPlayerEmail("");
    setGameState("playing");

    const now = Date.now();
    startTimeRef.current = now;
    timerRef.current = setInterval(() => setElapsed(Date.now() - now), 100);

    spawnBug();
  }, [spawnBug]);

  // Start game on Enter or Space when idle
  useEffect(() => {
    if (gameState !== "idle") return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, startGame]);

  // Cleanup timer on unmount
  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [],
  );

  const handleLogScore = useCallback(
    (name: string, email: string, time: number) => {
      log({ event: "score", name, email, gameTime: time, bugCount: TOTAL_BUGS });
    },
    [log],
  );

  const visibleLines = CODE_LINES.slice(
    scrollIndex,
    scrollIndex + visibleLineCount,
  );
  const activeBugLine = gameState === "playing" ? bugLine : -1;

  return (
    <div className={s.root}>
      <PRHeader
        onSettingsClick={() => setShowSettings(true)}
        gameState={gameState}
        onRestartClick={startGame}
        onScoresClick={() => setShowLeaderboard((v) => !v)}
        loggingError={loggingError}
      />

      <div className={s.toolbar}>
        <div className={s.toolbarLeft}>
          <BugCounter found={foundCount} />
          {gameState === "playing" && (
            <span className={s.timer}>⏱ {formatTime(elapsed)}</span>
          )}
        </div>
      </div>

      {gameState === "idle" && <IdleOverlay onStart={startGame} />}

      {gameState === "done" && (
        <DoneOverlay
          finalTime={finalTime}
          playerName={playerName}
          playerEmail={playerEmail}
          onNameChange={(name) => {
            setPlayerName(name);
            updateName(name);
          }}
          onEmailChange={(email) => {
            setPlayerEmail(email);
            updateEmail(email);
          }}
          onPlayAgain={() => {
            handleLogScore(playerName, playerEmail, finalTime);
            startGame();
          }}
          onShowLeaderboard={() => {
            handleLogScore(playerName, playerEmail, finalTime);
            setShowLeaderboard(true);
          }}
        />
      )}

      {showLeaderboard && (
        <Leaderboard
          entries={leaderboard}
          onClose={() => {
            setShowLeaderboard(false);
            if (gameState !== "playing") setGameState("idle");
          }}
          currentId={currentEntryId}
        />
      )}

      {showSettings && (
        <SettingsModal
          scrollMultiplier={scrollMultiplier}
          onScrollMultiplierChange={updateScrollMultiplier}
          loggingSettings={loggingSettings}
          onLoggingSettingsChange={updateLoggingSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      <div className={s.codeArea} ref={codeAreaRef}>
        <CodeViewer
          lines={visibleLines}
          startLineNumber={scrollIndex + 1}
          bugLine={activeBugLine}
          scrollIndex={scrollIndex}
          centerOffset={centerOffset}
          bugCentered={bugCentered}
        />
        <Minimap
          scrollIndex={scrollIndex}
          visibleLineCount={visibleLineCount}
          bugLine={activeBugLine}
        />
      </div>
    </div>
  );
}
