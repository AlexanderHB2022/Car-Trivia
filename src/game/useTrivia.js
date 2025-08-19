import React from "react";
import raw from "../data/questions.json";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useTrivia() {
  const TOTAL = 10;
  const [deck, setDeck] = React.useState(() => shuffle(raw).slice(0, TOTAL));
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);

  // "pending" | "skipped" | "correct" | "incorrect"
  const [status, setStatus] = React.useState(() => Array(TOTAL).fill("pending"));
  // Sólo controla el locking visual de opciones de la pregunta actual
  const [optionsState, setOptionsState] = React.useState({
    locked: false, correctIndex: null, chosenIndex: null
  });

  const finished = questionIndex >= deck.length;
  const current = finished ? { question:"", options:[], answerIndex:0 } : deck[questionIndex];

  const mark = (idx, val) => setStatus(prev => {
    const next = [...prev]; next[idx] = val; return next;
  });

  const pickOption = (idx) => {
    if (finished || optionsState.locked) return;
    const correctIndex = current.answerIndex;
    const isCorrect = idx === correctIndex;

    setOptionsState({ locked: true, correctIndex, chosenIndex: idx });
    mark(questionIndex, isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore(s => s + 1);

    // Auto-avance sólo si es correcta
    if (isCorrect) {
      window.setTimeout(() => { next(); }, 600);
    }
  };

  const next = () => {
    if (finished) return;
    // sólo permitir next si no está pendiente (respondida o saltada)
    if (status[questionIndex] === "pending") return;
    setQuestionIndex(i => i + 1);
    setOptionsState({ locked: false, correctIndex: null, chosenIndex: null });
  };

  const prev = () => {
    if (questionIndex === 0) return;
    const target = questionIndex - 1;
    setQuestionIndex(target);
    // reconstruir el estado visual de la pregunta previa
    const prevStatus = status[target];
    if (prevStatus === "correct" || prevStatus === "incorrect") {
      const correctIndex = deck[target].answerIndex;
      setOptionsState({
        locked: true,
        correctIndex,
        chosenIndex: prevStatus === "correct" ? correctIndex : null
      });
    } else {
      setOptionsState({ locked: false, correctIndex: null, chosenIndex: null });
    }
  };

  const skip = () => {
    if (finished) return;
    if (status[questionIndex] === "pending") {
      mark(questionIndex, "skipped");
    }
    next();
  };

  const restart = () => {
    const fresh = shuffle(raw).slice(0, TOTAL);
    setDeck(fresh);
    setQuestionIndex(0);
    setScore(0);
    setStatus(Array(TOTAL).fill("pending"));
    setOptionsState({ locked: false, correctIndex: null, chosenIndex: null });
  };

  const canPrev = questionIndex > 0;
  const canNext = !finished && status[questionIndex] !== "pending";
  const canSkip = !finished && status[questionIndex] === "pending";

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === "Escape") {
      e.preventDefault();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (finished) restart();
      else next();
    } else if (!optionsState.locked && !finished && ["1","2","3","4"].includes(e.key)) {
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < 4) pickOption(idx);
    }
  }, [optionsState.locked, finished, questionIndex, status]);

  return {
    current, questionIndex, total: TOTAL,
    optionsState, pickOption, next, prev, skip,
    finished, score, restart, handleKeyDown,
    canPrev, canNext, canSkip, status
  };
}
