import React from "react";
import TopBar from "../components/TopBar.js";

export default function GameLayout({ title, actionEmoji, onAction, children, onContainerClick }) {
  return (
    <div className="app-root">
      <TopBar title={title} actionEmoji={actionEmoji} onAction={onAction} />
      <main className="game-container" onClick={onContainerClick} role="main">
        {children}
      </main>
    </div>
  );
}
