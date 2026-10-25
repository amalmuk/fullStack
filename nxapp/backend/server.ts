import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: "Amal", email: "amal@example.com" },
];

let nextId = 2;

app.get("/api/users", (_req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "Utilisateur introuvable" });
  }

  res.json(user);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim()
  ) {
    return res.status(400).json({
      error: "Le nom et l'email sont obligatoires",
    });
  }

  const user: User = {
    id: nextId++,
    name: name.trim(),
    email: email.trim(),
  };

  users.push(user);
  res.status(201).json(user);
});

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "Utilisateur introuvable" });
  }

  const { name, email } = req.body;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !email.trim()
  ) {
    return res.status(400).json({
      error: "Le nom et l'email sont obligatoires",
    });
  }

  user.name = name.trim();
  user.email = email.trim();
  res.json(user);
});

app.delete("/api/users/:id", (_req, res) => {
  const id = Number(_req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Utilisateur introuvable" });
  }

  users.splice(index, 1);
  res.json({ message: "Utilisateur supprimé avec succès" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
