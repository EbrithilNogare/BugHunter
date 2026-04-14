"use client";

import type { ReactNode } from "react";
import CODE_LINES from "../codeLines";
import type { GameState } from "../types";
import s from "./PRHeader.module.css";

/* ── Icons ── */

function HamburgerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z" />
    </svg>
  );
}

function GithubLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 16 16" fill="#e6edf3">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.44 8.53a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

function IssuesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </svg>
  );
}

function PRIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  );
}

function ActionsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-4 3a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 7.75 6Zm-4 3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 3.75 9Z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z" />
    </svg>
  );
}

function OpenPRIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
    </svg>
  );
}

/* ── Data ── */

const REPO_TABS: Array<{
  label: string;
  icon: ReactNode;
  count?: number;
  active?: boolean;
}> = [
  { label: "Code", icon: <CodeIcon /> },
  { label: "Issues", icon: <IssuesIcon />, count: 12 },
  { label: "Pull requests", icon: <PRIcon />, count: 56, active: true },
  { label: "Actions", icon: <ActionsIcon /> },
  { label: "Projects", icon: <ProjectsIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

const PR_TABS: Array<{ label: string; count?: number; active?: boolean }> = [
  { label: "Conversation", count: 4 },
  { label: "Commits", count: 3 },
  { label: "Checks" },
  { label: "Files changed", count: 1, active: true },
];

/* ── Component ── */

interface Props {
  onSettingsClick?: () => void;
  gameState?: GameState;
  onRestartClick?: () => void;
  onScoresClick?: () => void;
  loggingError?: boolean;
}

export function PRHeader({
  onSettingsClick,
  gameState,
  onRestartClick,
  onScoresClick,
  loggingError,
}: Props) {
  return (
    <div className={s.root}>
      {/* Row 1: top bar — burger + logo + repo breadcrumb */}
      <div className={s.topBar}>
        <div className={s.topBarLeft}>
          <button className={s.hamburger} aria-label="Menu">
            <HamburgerIcon />
          </button>
          <GithubLogo />
          <span className={s.repoBreadcrumb}>
            <span className={s.repoOwner}>octocat</span>
            <span className={s.repoSlash}>/</span>
            <span className={s.repoName}>BugHunter</span>
          </span>
        </div>
      </div>

      {/* Row 2: repo-level navigation tabs */}
      <div className={s.repoNav}>
        {REPO_TABS.map((tab) => (
          <div
            key={tab.label}
            className={`${s.repoTab} ${tab.active ? s.repoTabActive : ""} ${tab.label === "Settings" ? `${s.repoTabClickable} ${s.repoTabSettings}` : ""}`}
            onClick={tab.label === "Settings" ? onSettingsClick : undefined}
          >
            <span className={s.repoTabIcon}>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.label === "Settings" && loggingError && (
              <span className={s.loggingErrorBadge} title="Logging failed">!</span>
            )}
            {tab.count !== undefined && (
              <span className={s.repoTabBadge}>{tab.count}</span>
            )}
          </div>
        ))}
        {(gameState === "playing" || gameState === "done") && (
          <div
            className={`${s.repoTab} ${s.repoTabClickable} ${s.repoTabAction}`}
            onClick={onRestartClick}
          >
            <span>{gameState === "done" ? "▶ Play Again" : "↺ Restart"}</span>
          </div>
        )}
        <div
          className={`${s.repoTab} ${s.repoTabClickable} ${s.repoTabAction}`}
          onClick={onScoresClick}
        >
          <span>🏆 Scores</span>
        </div>
      </div>

      {/* PR body */}
      <div className={s.body}>
        <div className={s.prTitle}>
          <h1 className={s.prTitleText}>
            feat: refactor Dashboard component with optimistic updates
          </h1>
          <span className={s.prNumber}>#4821</span>
        </div>

        <div className={s.meta}>
          <span className={s.statusBadge}>
            <OpenPRIcon /> Open
          </span>
          <span className={s.metaText}>
            <strong className={s.metaLink}>octocat</strong> wants to merge 3
            commits into <code className={s.metaCode}>main</code> from{" "}
            <code className={s.metaCode}>feature/dashboard-refactor</code>
          </span>
        </div>

        <div className={s.tabsRow}>
          <div className={s.tabs}>
            {PR_TABS.map((tab) => (
              <div
                key={tab.label}
                className={`${s.tab} ${tab.active ? s.tabActive : ""}`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={s.tabBadge}>{tab.count}</span>
                )}
              </div>
            ))}
          </div>

          <div className={s.diffStat}>
            <span className={s.diffBar}>
              <span className={s.diffBarFill} />
              <span className={s.diffBarFill} />
              <span className={s.diffBarFill} />
              <span className={s.diffBarFill} />
              <span className={s.diffBarFill} />
            </span>
            <span className={s.diffAdded}>+{CODE_LINES.length}</span>
            <span className={s.diffRemoved}>−0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
