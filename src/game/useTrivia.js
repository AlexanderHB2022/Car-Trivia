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

  const [optionsState, setOptionsState] = React.useState({
    locked: false, correctIndex: null, chosenIndex: null
  });

  const finished = questionIndex >= deck.length;
  const current = finished ? { question:"", options:[], answerIndex:0 } : deck[questionIndex];

  const markStatus = (idx, value) => {
    setStatus(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const pickOption = (idx) => {
    if (optionsState.locked || finished) return;
    const correctIndex = current.answerIndex;
    const isCorrect = idx === correctIndex;

    setOptionsState({ locked: true, correctIndex, chosenIndex: idx });
    markStatus(questionIndex, isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore(s => s + 1);

    // Auto-avance si acierta
    if (isCorrect) {
      window.setTimeout(() => { next(); }, 600);
    }
  };

  const next = () => {
    if (finished) return;
    // Solo permitir next si no está pendiente (respondida o saltada)
    if (status[questionIndex] === "pending") return;
    setQuestionIndex(i => i + 1);
    setOptionsState({ locked: false, correctIndex: null, chosenIndex: null });
  };

  const prev = () => {
    if (questionIndex === 0) return;
    setQuestionIndex(i => i - 1);
    // mostrar estado previo si ya estaba respondida
    const prevIdx = questionIndex - 1;
    const was = status[prevIdx];
    if (was === "correct" || was === "incorrect") {
      const correctIndex = deck[prevIdx].answerIndex;
      const chosenIndex = was === "correct" ? correctIndex : null; // si quieres recordar la elegida, guárdala aparte
      setOptionsState({ locked: true, correctIndex, chosenIndex });
    } else {
      setOptionsState({ locked: false, correctIndex: null, chosenIndex: null });
    }
  };

  const skip = () => {
    if (finished) return;
    // Marca saltada solo si estaba pendiente
    if (status[questionIndex] === "pending") {
      markStatus(questionIndex, "skipped");
    }
    next(); // avanza
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
  const canNext = !finished && status[questionIndex] !== "pending";   // “Siguiente” solo si respondida/saltada
  const canSkip = !finished && status[questionIndex] === "pending";   // “Saltar” solo si pendiente

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      // si manejas visibilidad de modal, podrías cerrarlo aquí
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
