const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config({
  path: "./config/.env",
});

const app = express();

app.use(express.json());

//Connecter MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connecté");
});

// route get pour récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
});

//route post pour créer un utilisateur
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  res.json(user);
});

//route put pour mettre à jour un utilisateur
app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(user);
});

//route delete pour supprimer un utilisateur
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "Utilisateur supprimé",
  });
});

//demarre de l'application
app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000 http://127.0.0.1:3000");
});
