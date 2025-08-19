import React from "react";

export default function OptionsGrid({ options, onSelect, locked, selected, correctIndex }) {
  return (
    <div key={options.join("-")} className="options-grid fade-in" role="group">
      {options.map((opt, idx) => {
        let state = "";
        if (locked) {
          if (idx === correctIndex) state = "is-correct pop";
          else if (idx === selected) state = "is-incorrect shake";
        }
        return (
          <button
            key={idx}
            className={`option-btn ${state}`}
            onClick={() => onSelect(idx)}
            disabled={locked}
            aria-pressed={selected === idx}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
