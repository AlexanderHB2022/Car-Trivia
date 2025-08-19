import React from "react";

export default function QuestionCard({ text, current = 0, total = 10, status = [] }) {
  const dots = Array.from({ length: total }).map((_, i) => {
    const st = status[i];
    let cls = "progress-dot";
    if (i === current) cls += " is-current";
    if (st === "correct") cls += " is-correct";
    else if (st === "incorrect") cls += " is-incorrect";
    else if (st === "skipped" || st === "pending") cls += " is-skipped";
    return <span key={i} className={cls} />;
  });

  return (
    <section className="question-wrapper fade-in">
      <div className="question-meta">
        <span>
          Pregunta {current + 1} / {total}
        </span>
        <div className="progress" aria-hidden="true">
          {dots}
        </div>
      </div>
      <div key={text} className="question-card" aria-live="polite">
        {text}
      </div>
    </section>
  );
}
