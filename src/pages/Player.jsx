import React, { useState } from "react";

export default function Player() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (name.trim()) {
      setJoined(true);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {!joined ? (
        <>
          <h1>Join Game</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: 8, fontSize: 16, marginRight: 8 }}
          />
          <button onClick={handleJoin}>Join</button>
        </>
      ) : (
        <h2>Welcome, {name}!</h2>
      )}
    </div>
  );
}
