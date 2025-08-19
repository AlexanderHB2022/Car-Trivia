import React from "react";

export default function QuestionNavigation({
  onPrev, onSkip, onNext,
  canPrev, canSkip, canNext
}) {
  return (
    <div className="nav-row" role="group" aria-label="Navegación de preguntas">
      <button className="nav-btn" onClick={onPrev} disabled={!canPrev} aria-label="Anterior">⬅️ Anterior</button>
      <button className="nav-btn" onClick={onSkip} disabled={!canSkip} aria-label="Saltar">⏭️ Saltar</button>
      <button className="nav-btn" onClick={onNext} disabled={!canNext} aria-label="Siguiente">➡️ Siguiente</button>
    </div>
  );
}
