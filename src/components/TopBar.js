import React from "react";

export default function TopBar({ title, actionIcon = "❓", onAction }) {
  return (
    <header className="top-bar shadow-soft" role="banner">
      <div />
      <h1>{title}</h1>
      <button className="top-bar-action" onClick={onAction} aria-label="Reiniciar">
        {actionIcon}
      </button>
    </header>
  );
}
