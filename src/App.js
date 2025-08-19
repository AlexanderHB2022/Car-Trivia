import React from "react";
import GameLayout from "./layouts/GameLayout.js";
import QuestionCard from "./components/QuestionCard.js";
import OptionsGrid from "./components/OptionsGrid.js";
import ResultModal from "./components/ResultModal.js";
import { useTrivia } from "./game/useTrivia.js";

export default function App() {
  const {
    current,
    questionIndex,
    total,
    optionsState,
    pickOption,
    nextIfNeeded,
    finished,
    score,
    restart,
    handleKeyDown,
  } = useTrivia();

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <GameLayout
      title="Car Trivia"
      actionEmoji="🔁"
      onAction={restart}
      onContainerClick={nextIfNeeded}
    >
      {!finished ? (
        <>
          <QuestionCard
            index={questionIndex + 1}
            total={total}
            text={current.question}
          />
          <OptionsGrid
            options={current.options}
            state={optionsState}
            onPick={pickOption}
          />
        </>
      ) : (
        <ResultModal
          open={finished}
          score={score}
          total={total}
          onRestart={restart}
        />
      )}
    </GameLayout>
  );
}
