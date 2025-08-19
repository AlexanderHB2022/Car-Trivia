import React from "react";

export default function ResultModal({ score, onRestart }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="result-modal card fade-in">
        <div className="result-emoji" aria-hidden="true">🏁</div>
        <h2>Resultado</h2>
        <p className="result-score">{score}/10</p>
        <button className="restart-btn btn-lg" onClick={onRestart} autoFocus>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
