import React from "react";

export default function QuestionNavigation({
  onPrev,
  onNext,
  onSkip,
  disablePrev,
  disableNext,
  disableSkip,
}) {
  return (
    <div className="question-nav" role="navigation">
      <button
        className="btn-lg"
        onClick={onPrev}
        disabled={disablePrev}
        aria-label="Ir a la pregunta anterior"
      >
        ⬅️ Anterior
      </button>
      <button
        className="btn-lg"
        onClick={onSkip}
        disabled={disableSkip}
        aria-label="Saltar pregunta"
      >
        ↩️ Saltar
      </button>
      <button
        className="btn-lg"
        onClick={onNext}
        disabled={disableNext}
        aria-label="Ir a la siguiente pregunta"
      >
        ➡️ Siguiente
      </button>
    </div>
  );
}
