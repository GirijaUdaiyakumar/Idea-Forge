import { useState, useEffect } from "react";
import axios from "axios";

export default function Ideas() {
  const [text, setText] = useState("");
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    const res = await axios.get("http://localhost:5000/api/ideas");
    setIdeas(res.data);
  };

  const addIdea = async () => {
    await axios.post("http://localhost:5000/api/ideas", { text });
    setText("");
    fetchIdeas();
  };

  const deleteIdea = async (id) => {
    await axios.delete(`http://localhost:5000/api/ideas/${id}`);
    fetchIdeas();
  };

  const updateIdea = async (id) => {
    const newText = prompt("Enter new idea:");
    await axios.put(`http://localhost:5000/api/ideas/${id}`, {
      text: newText
    });
    fetchIdeas();
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div>
      <h2>Ideas CRUD</h2>

      <input
        value={text}
        placeholder="Enter idea"
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addIdea}>Add</button>

      {ideas.map((idea) => (
        <div key={idea.id}>
          <p>{idea.text}</p>
          <button onClick={() => updateIdea(idea.id)}>Edit</button>
          <button onClick={() => deleteIdea(idea.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}