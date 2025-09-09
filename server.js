const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, completed = 0 } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Le champ 'title' est obligatoire." });
  }

  const task = {
    id: nextId++,
    title,
    completed: Number(completed) === 1 ? "completed" : "not completed",
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tâche introuvable." });
  }

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) {
    task.completed = Number(completed) === 1 ? "completed" : "not completed";
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Tâche introuvable." });
  }

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});