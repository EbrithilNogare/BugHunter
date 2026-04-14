"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { NEW_RELIC_API_KEY } from "../config";

const SETTINGS_KEY = "bughunter_logging_settings";
const LOCAL_LOG_KEY = "bughunter_local_logs";
const NR_ENDPOINT = "https://log-api.eu.newrelic.com/log/v1";
const ENVIRONMENT =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "dev"
    : "prod";

type LogLevel = "Info" | "Warn" | "Error";

export interface LoggingSettings {
  enabled: boolean;
}

export interface LogEvent {
  event: string;
  name?: string;
  email?: string;
  gameTime?: number;
  bugCount?: number;
}

interface LocalLogEntry extends LogEvent {
  timestamp: number;
  level: LogLevel;
}

function loadSettings(): LoggingSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { enabled: true };
    const parsed = JSON.parse(raw);
    return { enabled: parsed.enabled ?? true };
  } catch {
    return { enabled: true };
  }
}

function persistSettings(s: LoggingSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {}
}

function appendLocalLog(entry: LocalLogEntry) {
  try {
    const raw = localStorage.getItem(LOCAL_LOG_KEY);
    const logs: LocalLogEntry[] = raw ? JSON.parse(raw) : [];
    logs.push(entry);
    if (logs.length > 200) logs.splice(0, logs.length - 200);
    localStorage.setItem(LOCAL_LOG_KEY, JSON.stringify(logs));
  } catch {}
}

async function sendToNewRelic(entry: LocalLogEntry): Promise<boolean> {
  if (!NEW_RELIC_API_KEY) return false;
  try {
    const res = await fetch(NR_ENDPOINT, {
      method: "POST",
      headers: {
        "Api-Key": NEW_RELIC_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          common: {
            attributes: {
              app: "BugHunter",
              application: "BugHunter",
              environment: ENVIRONMENT,
            },
          },
          logs: [
            {
              timestamp: entry.timestamp,
              message: entry.event,
              level: entry.level,
              attributes: {
                event: entry.event,
                level: entry.level,
                environment: ENVIRONMENT,
                ...(entry.name !== undefined && { name: entry.name }),
                ...(entry.email !== undefined && { email: entry.email }),
                ...(entry.gameTime !== undefined && {
                  gameTime: entry.gameTime,
                }),
                ...(entry.bugCount !== undefined && {
                  bugCount: entry.bugCount,
                }),
              },
            },
          ],
        },
      ]),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Module-level flag so the console interceptor is installed only once
// even if the hook mounts multiple times.
let consoleInterceptorInstalled = false;

export function useNewRelicLogger() {
  const [settings, setSettings] = useState<LoggingSettings>({ enabled: true });
  const [loggingError, setLoggingError] = useState(false);
  const pageOpenLoggedRef = useRef(false);
  // Keep a ref to the latest enabled flag so the console interceptor
  // (installed once) always sees the current value.
  const enabledRef = useRef(settings.enabled);
  enabledRef.current = settings.enabled;

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  // Fire a page-open log once settings are loaded (if key is configured and enabled)
  useEffect(() => {
    if (pageOpenLoggedRef.current) return;
    if (!settings.enabled || !NEW_RELIC_API_KEY) return;

    pageOpenLoggedRef.current = true;
    const entry: LocalLogEntry = {
      timestamp: Date.now(),
      event: "page_open",
      level: "Info",
    };

    console.log("[BugHunter Log]", entry);
    appendLocalLog(entry);

    sendToNewRelic(entry).then((ok) => {
      if (!ok) setLoggingError(true);
    });
  }, [settings.enabled]);

  // Intercept console.warn / console.error and forward to New Relic
  useEffect(() => {
    if (consoleInterceptorInstalled) return;
    consoleInterceptorInstalled = true;

    const originalWarn = console.warn.bind(console);
    const originalError = console.error.bind(console);

    function forward(level: LogLevel, args: unknown[]) {
      if (!enabledRef.current || !NEW_RELIC_API_KEY) return;
      const message = args
        .map((a) =>
          typeof a === "string" ? a : JSON.stringify(a),
        )
        .join(" ");
      const entry: LocalLogEntry = {
        timestamp: Date.now(),
        event: message,
        level,
      };
      appendLocalLog(entry);
      sendToNewRelic(entry);
    }

    console.warn = (...args: unknown[]) => {
      originalWarn(...args);
      forward("Warn", args);
    };

    console.error = (...args: unknown[]) => {
      originalError(...args);
      forward("Error", args);
    };

    // No cleanup — the interceptor intentionally persists for the page lifetime.
  }, []);

  const log = useCallback(
    (event: LogEvent) => {
      const entry: LocalLogEntry = {
        ...event,
        timestamp: Date.now(),
        level: "Info",
      };

      // Always log locally
      console.log("[BugHunter Log]", entry);
      appendLocalLog(entry);

      // Send to New Relic if enabled and key is configured
      if (settings.enabled && NEW_RELIC_API_KEY) {
        sendToNewRelic(entry).then((ok) => {
          if (!ok) setLoggingError(true);
        });
      }
    },
    [settings.enabled],
  );

  const updateLoggingSettings = useCallback(
    (updates: Partial<LoggingSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...updates };
        persistSettings(next);
        return next;
      });
      setLoggingError(false);
    },
    [],
  );

  return {
    loggingSettings: settings,
    loggingError,
    updateLoggingSettings,
    log,
  };
}
