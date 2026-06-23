const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "ideaForgeSecret";

let users = [];
let ideas = [];

/* ================= AUTH ================= */

// REGISTER
app.post("/api/register", async (req, res) => {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    users.push({ email, password: hashed });

    res.json({ message: "User registered" });
});

// LOGIN
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });

    res.json({ token });
});

/* ================= CRUD ================= */

// CREATE
app.post("/api/ideas", (req, res) => {
    ideas.push({ text: req.body.text });
    res.json(ideas);
});

// READ
app.get("/api/ideas", (req, res) => {
    res.json(ideas);
});

// DELETE
app.delete("/api/ideas/:id", (req, res) => {
    ideas.splice(req.params.id, 1);
    res.json(ideas);
});

app.listen(5000, () => console.log("Server running on port 5000"));