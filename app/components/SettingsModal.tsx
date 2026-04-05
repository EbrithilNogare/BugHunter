import { useState } from "react";
import s from "./SettingsModal.module.css";

interface Props {
  scrollMultiplier: number;
  onScrollMultiplierChange: (val: number) => void;
  onClose: () => void;
}

export function SettingsModal({
  scrollMultiplier,
  onScrollMultiplierChange,
  onClose,
}: Props) {
  const [raw, setRaw] = useState(String(scrollMultiplier));

  const parsed = parseFloat(raw);
  const isValid = !isNaN(parsed) && parsed > 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setRaw(val);
    const n = parseFloat(val);
    if (!isNaN(n) && n > 0) {
      onScrollMultiplierChange(n);
    }
  }

  return (
    <div className={s.backdrop} onClick={onClose}>
      <div className={s.card} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.title}>Settings</h2>
        <div className={s.row}>
          <label className={s.label} htmlFor="scroll-multiplier">
            Scroll sensitivity multiplier
          </label>
          <input
            id="scroll-multiplier"
            className={`${s.input} ${!isValid ? s.inputError : ""}`}
            type="text"
            inputMode="decimal"
            value={raw}
            onChange={handleChange}
          />
        </div>
        {!isValid && (
          <p className={s.error}>Enter a positive number (e.g. 0.5 or 2)</p>
        )}
        <p className={s.hint}>
          Default is 1. Lower values (e.g. 0.5) scroll slower; higher values
          scroll faster.
        </p>
        <button className={s.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
