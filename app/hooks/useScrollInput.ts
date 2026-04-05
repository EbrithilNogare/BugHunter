import { useEffect, type Dispatch, type SetStateAction } from "react";
import CODE_LINES from "../codeLines";
import { LINE_HEIGHT } from "../constants";

type NumberRef = { current: number };

function clampScroll(
  prev: number,
  delta: number,
  visibleLines: number,
): number {
  return Math.max(0, Math.min(CODE_LINES.length - visibleLines, prev + delta));
}

export function useScrollInput(
  active: boolean,
  scrollMultiplierRef: NumberRef,
  visibleLineCountRef: NumberRef,
  setScrollIndex: Dispatch<SetStateAction<number>>,
) {
  // Wheel scroll
  useEffect(() => {
    if (!active) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const m = scrollMultiplierRef.current;
      const vl = visibleLineCountRef.current;
      let delta: number;
      if (e.deltaMode === 2 /* DOM_DELTA_PAGE */) {
        delta = Math.round(e.deltaY * vl * m);
      } else if (e.deltaMode === 1 /* DOM_DELTA_LINE */) {
        delta = Math.round(e.deltaY * m);
      } else {
        delta =
          Math.round((e.deltaY * m) / LINE_HEIGHT) || (e.deltaY > 0 ? 1 : -1);
      }
      setScrollIndex((prev) => clampScroll(prev, delta, vl));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [active, scrollMultiplierRef, visibleLineCountRef, setScrollIndex]);

  // Touch scroll
  useEffect(() => {
    if (!active) return;

    let lastY: number | null = null;
    let pixelAccum = 0;

    const handleTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
      pixelAccum = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (lastY === null) return;
      const deltaY = lastY - e.touches[0].clientY; // positive = scroll down
      lastY = e.touches[0].clientY;
      pixelAccum += deltaY * scrollMultiplierRef.current;
      const lineDelta = Math.trunc(pixelAccum / LINE_HEIGHT);
      if (lineDelta !== 0) {
        pixelAccum -= lineDelta * LINE_HEIGHT;
        setScrollIndex((prev) =>
          clampScroll(prev, lineDelta, visibleLineCountRef.current),
        );
      }
    };

    const handleTouchEnd = () => {
      lastY = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [active, scrollMultiplierRef, visibleLineCountRef, setScrollIndex]);
}
