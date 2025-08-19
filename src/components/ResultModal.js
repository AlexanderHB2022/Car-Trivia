import React from "react";

export default function ResultModal({ score, onRestart }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="result-modal">
        <p>Tu puntuación: {score}/10</p>
        <button className="restart-btn" onClick={onRestart} autoFocus>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
