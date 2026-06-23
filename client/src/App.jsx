import { useState } from "react";

export default function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");

  const generateIdea = async () => {
    setResult("Generating...");

    try {
      const res = await fetch("http://localhost:5000/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idea })
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Error: Failed to connect backend");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🚀 Idea Forge</h1>
        <p style={styles.subtitle}>
          Transform ideas into innovative solutions using AI
        </p>

        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your idea (e.g. Smart classroom)"
          style={styles.input}
        />

        <button onClick={generateIdea} style={styles.button}>
          Generate Ideas
        </button>

        {result && (
          <div style={styles.resultBox}>
            <pre style={styles.resultText}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "420px",
    padding: "30px",
    borderRadius: "15px",
    background: "#111827",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
    color: "white"
  },

  title: {
    marginBottom: "10px",
    fontSize: "28px"
  },

  subtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    marginBottom: "15px",
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#6366f1",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#0b1220",
    borderRadius: "10px",
    textAlign: "left"
  },

  resultText: {
    whiteSpace: "pre-wrap",
    fontSize: "13px",
    color: "#d1d5db"
  }
};