
import React, { useState } from "react";
import "./App.css";

const emojis = ["🍎", "🚗", "🐱", "⚽", "🍎", "🚗", "🐱", "⚽"];

function App() {
  const [cards, setCards] = useState(
    [...emojis].sort(() => Math.random() - 0.5)
  );

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  function flipCard(index) {
    if (flipped.length === 2 ||
        flipped.includes(index) ||
        matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);

      const first = newFlipped[0];
      const second = newFlipped[1];

      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  }

  function restartGame() {
    setCards([...emojis].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  return (
    <div className="app">
      <h1>MindMatch 🧠</h1>
      <p>Find all matching pairs!</p>

      <h3>Moves: {moves}</h3>

      <div className="grid">
        {cards.map((emoji, index) => (
          <button
            key={index}
            className="card"
            onClick={() => flipCard(index)}
          >
            {flipped.includes(index) || matched.includes(index)
              ? emoji
              : "❓"}
          </button>
        ))}
      </div>

      {matched.length === cards.length && (
        <h2>You Won! 🎉</h2>
      )}

      <button className="restart" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
