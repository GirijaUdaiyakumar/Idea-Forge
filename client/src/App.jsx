import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateIdea = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setData(null);

    try {
      const response = await fetch("http://localhost:5000/api/idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idea: input })
      });

      const result = await response.json();
      setData(result);
    } catch (error) {
      setData({ title: "Error", description: "Failed to connect backend" });
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Idea Forge</h1>
      <p style={styles.subtitle}>
        Transform ideas into innovative solutions using AI
      </p>

      <input
        style={styles.input}
        type="text"
        placeholder="Enter your idea (e.g. Smart classroom)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        style={{
          ...styles.button,
          opacity: input.trim() ? 1 : 0.5,
          cursor: input.trim() ? "pointer" : "not-allowed"
        }}
        onClick={generateIdea}
        disabled={!input.trim() || loading}
      >
        {loading ? "Generating..." : "Generate Ideas"}
      </button>

      {data && (
        <div style={styles.card}>
          <h2>{data.title}</h2>
          <p>{data.description}</p>

          {data.features && (
            <>
              <h3>Features</h3>
              <ul>
                {data.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {data.techStack && (
            <>
              <h3>Tech Stack</h3>
              <ul>
                {data.techStack.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "Arial"
  },
  title: {
    color: "#8b5cf6",
    marginBottom: "5px"
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    marginBottom: "10px"
  },
  button: {
    padding: "10px 20px",
    background: "#8b5cf6",
    border: "none",
    borderRadius: "8px",
    color: "white"
  },
  card: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    width: "350px"
  }
};

export default App;