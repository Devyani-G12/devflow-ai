import { useState } from "react";
import api from "../services/api";

function AIAssistant() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  async function explainCode(e) {
    e.preventDefault();

    setLoading(true);
    setExplanation("");

    try {
      const res = await api.post("/ai/explain", {
        code,
      });

      setExplanation(res.data.explanation);
    } catch (err) {
      setExplanation("Something went wrong. Please check backend.");
    }

    setLoading(false);
  }

  return (
    <div>
      <h1>AI Assistant</h1>
      <p>Paste code and DevFlow AI will explain it.</p>

      <form className="form" onSubmit={explainCode}>
        <textarea
          rows="8"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button type="submit">
          {loading ? "Explaining..." : "Explain Code"}
        </button>
      </form>

      {explanation && (
        <div className="card">
          <h3>AI Explanation</h3>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;