import React from "react";

export default function QuestionCard({ text, current = 0, total = 10, status = [] }) {
  const chips = Array.from({ length: total }).map((_, i) => {
    const st = status[i] || "pending";
    const cls =
      st === "correct"
        ? "is-correct"
        : st === "incorrect"
        ? "is-incorrect"
        : "is-skipped";
    return <span key={i} className={`chip ${cls}`} />;
  });

  return (
    <section className="question-wrapper fade-in">
      <div className="question-meta">
        <span>
          Pregunta {current + 1} / {total}
        </span>
        <div className="progress" aria-hidden="true">
          {chips}
        </div>
      </div>
      <div key={text} className="question-card card" aria-live="polite">
        {text}
      </div>
    </section>
  );
}
