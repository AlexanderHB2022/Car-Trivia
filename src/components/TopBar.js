import React from "react";

export default function TopBar({ title, actionEmoji = "❓", onAction }) {
  return (
    <header className="top-bar" role="banner">
      <div className="top-bar-spacer" aria-hidden="true" />
      <h1>{title}</h1>
      <button className="icon-btn" onClick={onAction} aria-label="Reiniciar">
        {actionEmoji}
      </button>
    </header>
  );
}
