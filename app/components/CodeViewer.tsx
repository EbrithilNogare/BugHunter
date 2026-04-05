import React from "react";
import CODE_LINES from "../codeLines";
import { FILE_HEADER_HEIGHT, LINE_HEIGHT } from "../constants";
import s from "./CodeViewer.module.css";

interface Props {
  lines: string[];
  startLineNumber: number;
  bugLine: number; // absolute index, -1 = no active bug
  scrollIndex: number;
  centerOffset: number;
  bugCentered: boolean;
}

export function CodeViewer({
  lines,
  startLineNumber,
  bugLine,
  scrollIndex,
  centerOffset,
  bugCentered,
}: Props) {
  return (
    <div className={s.root}>
      {/* File name header */}
      <div className={s.fileHeader}>
        <FileIcon />
        <span>src/components/Dashboard.tsx</span>
        <span className={s.fileHeaderRight}>+{CODE_LINES.length} lines</span>
      </div>

      {/* Active-line highlight band — top calculated from file header height + center offset */}
      <div
        className={s.activeLine}
        style={{ top: FILE_HEADER_HEIGHT + (centerOffset - 2) * LINE_HEIGHT }}
      />

      {/* Code rows */}
      {lines.map((lineText, i) => {
        const absoluteIndex = scrollIndex + i;
        const isBugLine = bugLine !== -1 && absoluteIndex === bugLine;

        let codeContent: React.ReactNode = lineText || " ";
        if (isBugLine) {
          const bug = (
            <span className={`${s.bugRing} ${bugCentered ? s.bugRingActive : ""}`}>
              <span className={`${s.bugIcon} ${bugCentered ? s.bugIconCentered : ""}`}>
                🐞
              </span>
            </span>
          );
          if (!lineText || lineText.trim().length === 0) {
            codeContent = <>{lineText ?? " "}{bug}</>;
          } else {
            const indent = lineText.length - lineText.trimStart().length;
            const contentLen = lineText.trimStart().length;
            const factor = 0.3 + (bugLine % 8) * 0.05;
            const insertAt = indent + Math.max(1, Math.floor(contentLen * factor));
            codeContent = (
              <>
                {lineText.slice(0, insertAt)}
                {bug}
                {lineText.slice(insertAt)}
              </>
            );
          }
        }

        return (
          <div
            key={absoluteIndex}
            className={`${s.codeLine} ${isBugLine && bugCentered ? s.codeLineBug : ""}`}
          >
            <span className={s.lineNumber}>{startLineNumber + i}</span>
            <span className={s.diffGutter}>+</span>
            <span className={s.codeText}>{codeContent}</span>
          </div>
        );
      })}
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e">
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
    </svg>
  );
}
