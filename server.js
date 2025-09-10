const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("Home page");
});

// Récupérer les tâches
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Envoyer une tâche
app.post("/tasks", (req, res) => {
  let { title, status = false } = req.body;

  if (title === undefined) {
    return res.status(400).json({ error: "Le champ 'title' est obligatoire." });
  }

  if (typeof title !== "string") {
    return res.status(400).json({ error: "Le champ 'title' doit être une chaîne de caractères." });
  }

  if (typeof status !== "boolean") {
    return res.status(400).json({ error: "Le champ 'status' doit être soit true ou false." });
  }

  // Données de la tâche
  const task = {
    id: nextId++,
    title: title.trim(),
    status: Boolean(status) == true ? "completed" : "not completed",
  };

  tasks.push(task);
  res.status(201).json(task);
});

// Modifier une tâche avec son ID
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tâche introuvable." });
  }

  let { title, status } = req.body;

  if (title !== undefined) task.title = String(title);
  if (status !== undefined) {
    task.status = Boolean(status) == true ? "completed" : "not completed";
  }

  res.json(task);
});

// Marquer une tâche comme complétée ou non
app.patch("/tasks/:id/completed", (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "ID invalide." });

  const task = findTask(id);
  if (!task) return res.status(404).json({ error: "Tâche introuvable." });

  const { status, completed } = req.body ?? {};
  if (typeof status === "boolean") {
    task.status = status;
  } else if (typeof completed === "boolean") {
    task.status = completed;
  } else {
    task.status = !task.status;
  }

  res.json(task);
});

// Supprimer une tâche avec son ID
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Tâche introuvable." });
  }

  res.status(204).end();
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});