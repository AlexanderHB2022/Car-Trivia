import React from "react";

export default function TopBar({ title, actionIcon = "❓", onAction }) {
  return (
    <header className="top-bar" role="banner">
      <div className="top-bar-spacer" aria-hidden="true" />
      <h1>{title}</h1>
      <button
        className="top-bar-action"
        onClick={onAction}
        aria-label="Reiniciar"
      >
        {actionIcon}
      </button>
    </header>
  );
}
