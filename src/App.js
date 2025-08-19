import React from "react";
import GameLayout from "./layouts/GameLayout.js";
import TopBar from "./components/TopBar.js";
import QuestionCard from "./components/QuestionCard.js";
import OptionsGrid from "./components/OptionsGrid.js";
import ResultModal from "./components/ResultModal.js";
import QuestionNavigation from "./components/QuestionNavigation.js";
import useTrivia from "./game/useTrivia.js";

export default function App() {
  const {
    question,
    options,
    pickOption,
    locked,
    selected,
    correctIndex,
    showResult,
    score,
    restart,
    current,
    total,
    next,
    prev,
    skip,
    status,
    canPrev,
    canNext,
    canSkip,
  } = useTrivia();

  return (
    <GameLayout>
      <TopBar title="Car Trivia" actionIcon="🔁" onAction={restart} />
      <QuestionCard text={question} current={current} total={total} status={status} />
      <OptionsGrid
        options={options}
        onSelect={pickOption}
        locked={locked}
        selected={selected}
        correctIndex={correctIndex}
      />
      <QuestionNavigation
        onPrev={prev}
        onSkip={skip}
        onNext={next}
        canPrev={canPrev}
        canSkip={canSkip}
        canNext={canNext}
      />
      {showResult && <ResultModal score={score} onRestart={restart} />}
    </GameLayout>
  );
}
