import { TOTAL_BUGS } from "../constants";
import s from "./BugCounter.module.css";

interface Props {
  found: number;
}

export function BugCounter({ found }: Props) {
  return (
    <div className={s.root}>
      {Array.from({ length: TOTAL_BUGS }).map((_, i) => (
        <span
          key={i}
          className={`${s.bug} ${i < found ? s.bugFound : s.bugMissing}`}
        >
          🐞
        </span>
      ))}
      <span className={s.label}>
        {found}/{TOTAL_BUGS}
      </span>
    </div>
  );
}
