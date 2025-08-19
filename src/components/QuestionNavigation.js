import React from "react";

export default function QuestionNavigation({
  onPrev,
  onSkip,
  onNext,
  canPrev,
  canSkip,
  canNext,
}) {
  return (
    <div className="question-nav" role="navigation">
      <button
        className="nav-btn"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Ir a la pregunta anterior"
      >
        Anterior
      </button>
      <button
        className="nav-btn"
        onClick={onSkip}
        disabled={!canSkip}
        aria-label="Saltar pregunta"
      >
        Saltar
      </button>
      <button
        className="nav-btn"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Ir a la siguiente pregunta"
      >
        Siguiente
      </button>
    </div>
  );
}
