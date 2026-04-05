import { useState, useEffect, useRef, useCallback } from "react";

const STORAGE_KEY = "bughunter_scroll_multiplier";

export function useScrollMultiplier() {
  const [scrollMultiplier, setScrollMultiplier] = useState(1);
  const scrollMultiplierRef = useRef(1);

  useEffect(() => {
    try {
      const val = parseFloat(localStorage.getItem(STORAGE_KEY) ?? "1");
      if (!isNaN(val) && val > 0) setScrollMultiplier(val);
    } catch {}
  }, []);

  // Sync state into ref so event handlers always read the latest value
  // without needing to re-register listeners on every change.
  useEffect(() => {
    scrollMultiplierRef.current = scrollMultiplier;
  });

  const updateScrollMultiplier = useCallback((val: number) => {
    if (isNaN(val) || val <= 0) return;
    setScrollMultiplier(val);
    try {
      localStorage.setItem(STORAGE_KEY, String(val));
    } catch {}
  }, []);

  return { scrollMultiplier, scrollMultiplierRef, updateScrollMultiplier };
}
