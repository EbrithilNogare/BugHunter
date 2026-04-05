"use client";

import { useEffect, useRef } from "react";
import CODE_LINES from "../codeLines";
import s from "./Minimap.module.css";

interface Props {
  scrollIndex: number;
  visibleLineCount: number;
  bugLine: number; // -1 = no bug
}

const TOTAL = CODE_LINES.length;

function lineColor(line: string): string {
  return line.trim() ? "#6e7681" : "";
}

function drawMinimap(canvas: HTMLCanvasElement, W: number, H: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, W, H);

  const lineH = H / TOTAL;

  CODE_LINES.forEach((line, i) => {
    const color = lineColor(line);
    if (!color) return;

    const indent = line.length - line.trimStart().length;
    const content = line.trim();
    const x = 2 + indent * 0.55;
    const w = Math.min(content.length * 0.75, W - x - 2);
    const y = i * lineH;
    const h = Math.max(lineH - 0.4, 0.8);

    ctx.fillStyle = color;
    ctx.fillRect(x, y, Math.max(w, 2), h);
  });
}

export function Minimap({ scrollIndex, visibleLineCount, bugLine }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const dpr = Math.round(window.devicePixelRatio || 1);
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawMinimap(canvas, w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const viewportTop = `${(scrollIndex / TOTAL) * 100}%`;
  const viewportHeight = `${(visibleLineCount / TOTAL) * 100}%`;
  const bugTop = bugLine >= 0 ? `${(bugLine / TOTAL) * 100}%` : undefined;

  return (
    <div className={s.root} ref={containerRef}>
      <canvas ref={canvasRef} className={s.canvas} />
      <div className={s.viewport} style={{ top: viewportTop, height: viewportHeight }} />
      {bugTop !== undefined && (
        <div className={s.bugLine} style={{ top: bugTop }} />
      )}
    </div>
  );
}
