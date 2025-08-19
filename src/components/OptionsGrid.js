import React from "react";

export default function OptionsGrid({ options, onSelect, locked, selected, correctIndex }) {
  return (
    <div className="options-grid" role="group" style={{ display: "grid", gap: "0.5rem", width: "100%" }}>
      {options.map((opt, idx) => {
        const baseStyle = {
          background: "var(--color3)",
          color: "var(--text-color)",
          border: "2px solid var(--color3)",
          borderRadius: "8px",
          padding: "0.5rem 1rem",
          cursor: locked ? "default" : "pointer",
          margin: 0,
        };
        if (locked) {
          if (idx === correctIndex) {
            baseStyle.background = "var(--correct)";
            baseStyle.borderColor = "var(--correct)";
          } else if (idx === selected) {
            baseStyle.background = "var(--absent)";
            baseStyle.borderColor = "var(--absent)";
          }
        }
        return (
          <button
            key={idx}
            className="option-btn give-up-btn"
            style={baseStyle}
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
