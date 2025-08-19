import React from "react";

export default function QuestionCard({ text }) {
  return (
    <div className="question-card" aria-live="polite">
      {text}
    </div>
  );
}
