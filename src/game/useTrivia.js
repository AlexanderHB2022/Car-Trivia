import { useState, useEffect, useCallback } from "react";
import questionsData from "../data/questions.json";

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

export default function useTrivia() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [skipped, setSkipped] = useState([]);

  const currentQuestion = questions[current] || {};
  const correctIndex = currentQuestion.answerIndex;
  const options = currentQuestion.options || [];

  const restart = useCallback(() => {
    const shuffled = shuffle([...questionsData]).slice(0, 10);
    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setLocked(false);
    setSelected(null);
    setShowResult(false);
    setSkipped([]);
  }, []);

  useEffect(() => {
    restart();
  }, [restart]);

  const next = useCallback(() => {
    if (current + 1 >= questions.length) {
      setShowResult(true);
    } else {
      setCurrent((c) => c + 1);
      setLocked(false);
      setSelected(null);
    }
  }, [current, questions.length]);

  const prev = useCallback(() => {
    if (current === 0) return;
    setCurrent((c) => c - 1);
    setLocked(false);
    setSelected(null);
  }, [current]);

  const skip = useCallback(() => {
    setSkipped((s) => [...s, current]);
    next();
  }, [current, next]);

  const handleOption = useCallback(
    (index) => {
      if (locked) return;
      setSelected(index);
      setLocked(true);
      if (index === correctIndex) {
        setScore((s) => s + 1);
        setTimeout(next, 800);
      }
    },
    [locked, correctIndex, next]
  );

  const closeModal = useCallback(() => setShowResult(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if (showResult) {
        if (e.key === "Enter") restart();
        if (e.key === "Escape") closeModal();
        return;
      }
      if (e.key === "Enter") {
        next();
      } else if (e.key >= "1" && e.key <= "4") {
        handleOption(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleOption, next, restart, showResult, closeModal]);

  return {
    question: currentQuestion.question || "",
    options,
    handleOption,
    locked,
    selected,
    correctIndex,
    showResult,
    score,
    restart,
    closeModal,
    current,
    total: questions.length,
    next,
    prev,
    skip,
    skipped,
  };
}
