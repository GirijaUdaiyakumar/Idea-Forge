const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "IdeaForge API running 🚀" });
});

// idea generator API
app.post("/api/idea", (req, res) => {
  const { idea } = req.body;

  res.json({
    title: `Smart ${idea} System`,
    description: `AI-powered solution for ${idea}`,
    features: [
      "Automation",
      "AI integration",
      "Real-time processing"
    ],
    techStack: ["React", "Node.js", "Express"]
  });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});