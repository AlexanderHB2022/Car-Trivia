import React from "react";

export default function OptionsGrid({ options, onPick, state }) {
  return (
    <div key={options.join("-")} className="options-grid" role="group">
      {options.map((opt, i) => {
        let cls = "option-btn";
        if (state.locked) {
          if (i === state.correctIndex) cls += " is-correct";
          else if (i === state.chosenIndex) cls += " is-incorrect";
        }
        return (
          <button
            key={i}
            className={cls}
            disabled={state.locked}
            onClick={() => onPick(i)}
            aria-pressed={state.chosenIndex === i}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
