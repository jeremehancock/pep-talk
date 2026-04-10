import { useState } from "react";
import "./App.css";

export default function App() {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  async function getPepTalk() {
    setLoading(true);
    setShake(true);
    setTimeout(() => setShake(false), 400);
    try {
      const res = await fetch("/api/peptalk");
      const data = await res.json();
      setCurrent(data.message);
      setHistory((h) => [data.message, ...h].slice(0, 5));
    } catch (err) {
      setCurrent("Couldn't reach the pep talk server. But here's one from me: you've got this.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (current) navigator.clipboard.writeText(current);
  }

  return (
    <div className="app">
      <h1>Pep Talk ✨</h1>
      <p className="tagline">Feeling meh? Click the button.</p>

      <button
        className={`big-button ${shake ? "shake" : ""}`}
        onClick={getPepTalk}
        disabled={loading}
      >
        {loading ? "Thinking..." : current ? "Another one" : "Give me a pep talk"}
      </button>

      {current && (
        <div className="pep-card">
          <p>"{current}"</p>
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      )}

      {history.length > 1 && (
        <div className="history">
          <h2>Recent</h2>
          <ul>
            {history.slice(1).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
