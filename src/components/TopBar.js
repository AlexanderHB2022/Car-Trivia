import React from "react";

export default function TopBar({ title, actionEmoji, onAction }) {
  return (
    <header className="topbar" role="banner" aria-label={title}>
      <div className="edge-action">
        <button className="icon-btn" onClick={onAction} aria-label="Reiniciar">
          {actionEmoji}
        </button>
      </div>
      <h1 className="topbar-title">{title}</h1>
      <div className="edge-spacer" aria-hidden="true"></div>
    </header>
  );
}
