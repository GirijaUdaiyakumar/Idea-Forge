app.post("/api/idea", (req, res) => {
  try {
    const { idea } = req.body;

    res.json({
      title: `Smart ${idea} System`,
      description: `AI-powered solution for ${idea}`,
      features: [
        "Automation",
        "Real-time processing",
        "User-friendly UI"
      ],
      techStack: ["React", "Node.js", "Express"]
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});