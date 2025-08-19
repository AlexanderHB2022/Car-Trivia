import React from "react";
import GameLayout from "./layouts/GameLayout.js";
import TopBar from "./components/TopBar.js";
import QuestionCard from "./components/QuestionCard.js";
import OptionsGrid from "./components/OptionsGrid.js";
import ResultModal from "./components/ResultModal.js";
import useTrivia from "./game/useTrivia.js";

export default function App() {
  const {
    question,
    options,
    handleOption,
    locked,
    selected,
    correctIndex,
    showResult,
    score,
    restart,
  } = useTrivia();

  return (
    <GameLayout>
      <TopBar title="Car Trivia" actionIcon="🔁" onAction={restart} />
      <QuestionCard text={question} />
      <OptionsGrid
        options={options}
        onSelect={handleOption}
        locked={locked}
        selected={selected}
        correctIndex={correctIndex}
      />
      {showResult && <ResultModal score={score} onRestart={restart} />}
    </GameLayout>
  );
}
