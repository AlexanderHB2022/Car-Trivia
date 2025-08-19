import React from "react";

export default function QuestionCard({ index, total, text }) {
  return (
    <section className="question-card" aria-live="polite">
      <div className="question-meta">{index}/{total} ❓</div>
      <h2 className="question-text">{text}</h2>
    </section>
  );
}
