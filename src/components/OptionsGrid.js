import React from "react";

/**
 * state: {
 *  locked: boolean,
 *  correctIndex: number|null,
 *  chosenIndex: number|null
 * }
 */
export default function OptionsGrid({ options, state, onPick }) {
  return (
    <div className="options-grid" role="group" aria-label="Opciones">
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
