import { LeaderboardEntry } from "../types";
import { formatTime } from "../utils";
import s from "./Leaderboard.module.css";

const MEDAL = ["🥇", "🥈", "🥉"];

interface Props {
  entries: LeaderboardEntry[];
  onClose: () => void;
  currentId?: string | null;
}

export function Leaderboard({ entries, onClose, currentId }: Props) {
  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.card} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.title}>🏆 Leaderboard</h2>

        {entries.length === 0 ? (
          <p className={s.empty}>No scores yet. Play the game!</p>
        ) : (
          <div className={s.tableWrap} onWheel={(e) => e.stopPropagation()}>
            <table className={s.table}>
              <thead className={s.tableHead}>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => (
                  <tr key={entry.id} className={`${s.tableRow} ${entry.id === currentId ? s.tableRowCurrent : ""}`}>
                    <td className={`${s.rank} ${i < 3 ? s.rankTop : s.rankOther}`}>
                      {i < 3 ? MEDAL[i] : `${i + 1}.`}
                    </td>
                    <td className={s.nameCell}>{entry.name || <span className={s.anon}>—</span>}</td>
                    <td className={s.timeCell}>{formatTime(entry.time)}</td>
                    <td className={s.dateCell}>{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button className={s.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
