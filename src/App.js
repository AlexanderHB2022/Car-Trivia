import React from "react";
import GameLayout from "./layouts/GameLayout.js";
import TopBar from "./components/TopBar.js";
import QuestionCard from "./components/QuestionCard.js";
import OptionsGrid from "./components/OptionsGrid.js";
import ResultModal from "./components/ResultModal.js";
import QuestionNavigation from "./components/QuestionNavigation.js";
import { useTrivia } from "./game/useTrivia.js";

export default function App() {
  const {
    current,
    questionIndex,
    total,
    optionsState,
    pickOption,
    next,
    prev,
    skip,
    finished,
    score,
    restart,
    handleKeyDown,
    canPrev,
    canNext,
    canSkip,
    status,
  } = useTrivia();

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <GameLayout>
      <TopBar title="Car Trivia" actionEmoji="🔁" onAction={restart} />
      <QuestionCard
        text={current.question}
        current={questionIndex}
        total={total}
        status={status}
      />
      <OptionsGrid
        options={current.options}
        onPick={pickOption}
        state={optionsState}
      />
      <QuestionNavigation
        onPrev={prev}
        onSkip={skip}
        onNext={next}
        canPrev={canPrev}
        canSkip={canSkip}
        canNext={canNext}
      />
      {finished && <ResultModal score={score} onRestart={restart} />}
    </GameLayout>
  );
}
