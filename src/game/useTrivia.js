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
  const [optionsState, setOptionsState] = React.useState({
    locked: false,
    correctIndex: null,
    chosenIndex: null
  });

  const finished = questionIndex >= deck.length;
  const current = finished ? { question:"", options:[], answerIndex:0 } : deck[questionIndex];

  const pickOption = (idx) => {
    if (optionsState.locked || finished) return;
    const correctIndex = current.answerIndex;
    const isCorrect = idx === correctIndex;
    setOptionsState({ locked: true, correctIndex, chosenIndex: idx });
    if (isCorrect) setScore(s => s + 1);
  };

  const nextIfNeeded = () => {
    if (!optionsState.locked) return;
    setQuestionIndex(i => i + 1);
    setOptionsState({ locked: false, correctIndex: null, chosenIndex: null });
  };

  const restart = () => {
    setDeck(shuffle(raw).slice(0, TOTAL));
    setQuestionIndex(0);
    setScore(0);
    setOptionsState({ locked: false, correctIndex: null, chosenIndex: null });
  };

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      // Si luego manejas estado de "modal abierta", aquí podrías cerrarla.
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (!finished && optionsState.locked) nextIfNeeded();
      else if (finished) restart();
    } else if (!optionsState.locked && !finished && ["1","2","3","4"].includes(e.key)) {
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < 4) pickOption(idx);
    }
  }, [optionsState, finished]);

  return {
    current, questionIndex, total: TOTAL,
    optionsState, pickOption, nextIfNeeded,
    finished, score, restart, handleKeyDown
  };
}
