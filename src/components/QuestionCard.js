import React from "react";

export default function QuestionCard({ text, current = 0, total = 10, score = 0 }) {
  const chips = Array.from({ length: total }).map((_, i) => (
    <span
      key={i}
      className={`chip${i < current ? " is-filled" : i === current ? " is-current" : ""}`}
    />
  ));

  return (
    <section className="question-wrapper fade-in">
      <div className="progress" aria-hidden="true">
        {chips}
      </div>
      <div className="question-meta">
        <span>
          Pregunta {current + 1} / {total}
        </span>
        <span className="score">Puntos: {score}</span>
      </div>
      <div key={text} className="question-card card" aria-live="polite">
        {text}
      </div>
    </section>
  );
}
