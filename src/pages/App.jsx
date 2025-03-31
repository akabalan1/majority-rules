import React, { useState } from "react";

const questions = [
  {
    text: "What’s the best date night activity?",
    options: ["Dinner", "Netflix & Chill", "Game Night", "Long Walk"]
  },
  {
    text: "Who usually says 'I love you' first?",
    options: ["Her", "Him", "Neither", "At the same time"]
  }
];

export default function App() {
  const [step, setStep] = useState(-1);
  const [votes, setVotes] = useState({});
  const [tally, setTally] = useState({});

  const startGame = () => setStep(0);

  const submitVote = (qIndex, option) => {
    const updated = { ...votes };
    if (!updated[qIndex]) updated[qIndex] = [];
    updated[qIndex].push(option);
    setVotes(updated);
  };

  const calculateTally = (qIndex) => {
    const currentVotes = votes[qIndex] || [];
    const counts = {};
    currentVotes.forEach((v) => {
      counts[v] = (counts[v] || 0) + 1;
    });
    setTally(counts);
  };

  const nextQuestion = () => {
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setStep("done");
    }
  };

  if (step === -1) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Majority Rules</h1>
        <button onClick={startGame}>Start Game</button>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div style={{ padding: 20 }}>
        <h2>Game Over!</h2>
        <pre>{JSON.stringify(tally, null, 2)}</pre>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div style={{ padding: 20 }}>
      <h2>{q.text}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => submitVote(step, opt)}>
            {opt}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => calculateTally(step)}>Show Results</button>
        <button onClick={nextQuestion} style={{ marginLeft: 10 }}>
          Next
        </button>
      </div>
      <div style={{ marginTop: 20 }}>
        <pre>{JSON.stringify(tally, null, 2)}</pre>
      </div>
    </div>
  );
}
