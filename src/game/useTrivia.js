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
  const [status, setStatus] = useState([]); // "pending" | "skipped" | "correct" | "incorrect"
  const [answers, setAnswers] = useState([]);

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
    setStatus(new Array(shuffled.length).fill("pending"));
    setAnswers(new Array(shuffled.length).fill(null));
  }, []);

  useEffect(() => {
    restart();
  }, [restart]);

  const next = useCallback(() => {
    if (status[current] === "pending") return false;
    if (current + 1 >= questions.length) {
      setShowResult(true);
    } else {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setLocked(status[nextIndex] === "correct" || status[nextIndex] === "incorrect");
      setSelected(answers[nextIndex]);
    }
    return true;
  }, [current, questions.length, status, answers]);

  const prev = useCallback(() => {
    if (current === 0) return;
    const prevIndex = current - 1;
    setCurrent(prevIndex);
    setLocked(status[prevIndex] === "correct" || status[prevIndex] === "incorrect");
    setSelected(answers[prevIndex]);
  }, [current, status, answers]);

  const skip = useCallback(() => {
    if (status[current] !== "pending") return;
    setStatus((s) => {
      const copy = [...s];
      copy[current] = "skipped";
      return copy;
    });
    next();
  }, [current, next, status]);

  const pickOption = useCallback(
    (index) => {
      if (locked) return;
      setSelected(index);
      setAnswers((a) => {
        const copy = [...a];
        copy[current] = index;
        return copy;
      });
      const isCorrect = index === correctIndex;
      setStatus((s) => {
        const copy = [...s];
        copy[current] = isCorrect ? "correct" : "incorrect";
        return copy;
      });
      setLocked(true);
      if (isCorrect) {
        setScore((s) => s + 1);
        setTimeout(() => next(), 600);
      }
    },
    [locked, correctIndex, current, next]
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
        pickOption(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickOption, next, restart, showResult, closeModal]);

  return {
    question: currentQuestion.question || "",
    options,
    pickOption,
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
    status,
    canPrev: current > 0,
    canNext: status[current] !== "pending",
    canSkip: status[current] === "pending",
  };
}
