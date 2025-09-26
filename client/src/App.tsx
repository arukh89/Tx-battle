import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch daftar player dari backend
  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data.players || []))
      .catch((err) => console.error("Error fetching players:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();

      if (data.success) {
        setPlayers((prev) => [...prev, username]);
        setUsername("");
      }
    } catch (err) {
      console.error("Error saving player:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">⚔️ TX Battle</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={username}
          placeholder="Enter Farcaster username"
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Saving..." : "Join Battle"}
        </button>
      </form>

      <h2 className="subtitle">Players</h2>
      <ul className="player-list">
        {players.map((player, i) => (
          <li key={i} className="player-item">
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
