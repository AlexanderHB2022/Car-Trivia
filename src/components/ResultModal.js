import React from "react";

export default function ResultModal({ open, score, total, onRestart }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Resultados">
      <div className="modal-card">
        <div className="modal-emoji">🏁</div>
        <h3 className="modal-title">¡Terminaste!</h3>
        <p className="modal-body">Puntaje: <strong>{score}</strong> / {total}</p>
        <button className="primary-btn" onClick={onRestart} autoFocus>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
