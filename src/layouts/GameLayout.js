import React from "react";

export default function GameLayout({ children }) {
  return (
    <main className="game-container">
      <div className="container game-stack">{children}</div>
    </main>
  );
}
