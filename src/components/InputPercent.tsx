import React, { useEffect, useState } from "react";

interface Props {
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;   // NEW: allows showing % but not editing
}

export default function InputPercent({
  value,
  onChange,
  step = 1,
  min = 0,
  max = 100,
  disabled = false,
  readOnly = false,
}: Props) {
  const [text, setText] = useState<string>(String(value ?? 0));

  // Sync from parent → text (unless user is actively clearing)
  useEffect(() => {
    if (text !== "") {
      setText(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return; // do nothing if locked
    const val = e.target.value;
    setText(val);

    if (val === "") {
      onChange(0);
      return;
    }

    const num = Number(val);
    if (!Number.isNaN(num)) {
      const clamped = Math.min(max, Math.max(min, num));
      onChange(clamped);
    }
  };

  return (
    <div className="relative">
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={text}
        placeholder="0"
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        className={`bg-neutral-800 rounded-xl pl-3 pr-10 py-2 outline-none w-full ${disabled || readOnly ? "opacity-60 cursor-not-allowed" : ""
          }`}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">%</span>
    </div>
  );
}
