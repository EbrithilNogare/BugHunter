import BugLineIllustration from "../assets/tutorial-bug-line.svg";
import ScrollIllustration from "../assets/tutorial-scroll-nav.svg";
import FocusIllustration from "../assets/tutorial-focus-catch.svg";
import s from "./IdleOverlay.module.css";

interface Props {
  onStart: () => void;
}

const CARDS = [
  {
    title: "Locate the Bug",
    body: "The minimap on the right marks the bug's location with a red line. Use it to know where to scroll.",
    Illustration: BugLineIllustration,
  },
  {
    title: "Scroll to Navigate",
    body: "Use your mouse wheel or trackpad to scroll through the code and reach the bug's position.",
    Illustration: ScrollIllustration,
  },
  {
    title: "Focus to Catch",
    body: "Center the bug on the blue line and hold still. Watch the loader fill — when complete, the bug is caught!",
    Illustration: FocusIllustration,
  },
];

export function IdleOverlay({ onStart }: Props) {
  return (
    <div className={s.backdrop}>
      <div className={s.panel}>
        <div className={s.header}>
          <span className={s.emoji}>🐞</span>
          <h2 className={s.title}>BugHunter</h2>
        </div>

        <div className={s.cardsRow}>
          {CARDS.map(({ title, body, Illustration }, i) => (
            <div key={i} className={s.tutorialCard}>
              <div className={s.stepBadge}>{i + 1}</div>
              <div className={s.illustration}>
                <Illustration />
              </div>
              <h3 className={s.cardTitle}>{title}</h3>
              <p className={s.cardBody}>{body}</p>
            </div>
          ))}
        </div>

        <div className={s.footer}>
          <button className={s.startBtn} onClick={onStart}>
            Start Hunt
          </button>
          <p className={s.keyHint}>or press Enter / Space</p>
        </div>
      </div>
    </div>
  );
}
