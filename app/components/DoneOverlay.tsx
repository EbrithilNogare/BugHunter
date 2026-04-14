import { formatTime } from "../utils";
import s from "./DoneOverlay.module.css";

interface Props {
  finalTime: number;
  playerName: string;
  playerEmail: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPlayAgain: () => void;
  onShowLeaderboard: () => void;
}

export function DoneOverlay({
  finalTime,
  playerName,
  playerEmail,
  onNameChange,
  onEmailChange,
  onPlayAgain,
  onShowLeaderboard,
}: Props) {
  return (
    <div className={s.backdrop}>
      <div className={s.card}>
        <div className={s.emoji}>🎉</div>
        <h2 className={s.title}>All bugs found!</h2>
        <p className={s.time}>
          Your time:{" "}
          <strong className={s.timeValue}>{formatTime(finalTime)}</strong>
        </p>
        <input
          className={s.nameInput}
          type="text"
          placeholder="Your name (optional)"
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore="true"
          data-form-type="other"
          maxLength={64}
          value={playerName}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onShowLeaderboard();
          }}
        />
        <input
          className={s.nameInput}
          type="email"
          placeholder="Your email (optional, for prize notifications)"
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore="true"
          data-form-type="other"
          maxLength={254}
          value={playerEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onShowLeaderboard();
          }}
        />
        <div className={s.actions}>
          <button className={s.btnGreen} onClick={onPlayAgain}>
            Play Again
          </button>
          <button className={s.btnGray} onClick={onShowLeaderboard}>
            🏆 Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
