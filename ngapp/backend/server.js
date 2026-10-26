
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Données temporaires
let produits = [
  { id: 1, nom: 'Clavier', prix: 50 },
  { id: 2, nom: 'Souris', prix: 25 }
];

// GET : récupérer tous les produits
app.get('/api/produits', (req, res) => {
  res.json(produits);
});

// GET : récupérer un produit par son ID
app.get('/api/produits/:id', (req, res) => {
  const produit = produits.find(p => p.id === Number(req.params.id));

  if (!produit) {
    return res.status(404).json({ erreur: 'Produit introuvable' });
  }

  res.json(produit);
});

// POST : ajouter un produit
app.post('/api/produits', (req, res) => {
  const { nom, prix } = req.body;

  if (typeof nom !== 'string' || !nom.trim() ||
      prix === undefined || prix === null ||
      prix === '' || !Number.isFinite(Number(prix)) ||
      Number(prix) < 0) {
    return res.status(400).json({
      erreur: 'Nom obligatoire et prix valide requis'
    });
  }

  const nouveauProduit = {
    id: produits.length
      ? Math.max(...produits.map(p => p.id)) + 1
      : 1,
    nom: nom.trim(),
    prix: Number(prix)
  };

  produits.push(nouveauProduit);
  res.status(201).json(nouveauProduit);
});

// PUT : modifier un produit
app.put('/api/produits/:id', (req, res) => {
  const produit = produits.find(p => p.id === Number(req.params.id));

  if (!produit) {
    return res.status(404).json({ erreur: 'Produit introuvable' });
  }

  const { nom, prix } = req.body;

  if (typeof nom !== 'string' || !nom.trim() ||
      prix === undefined || prix === null ||
      prix === '' || !Number.isFinite(Number(prix)) ||
      Number(prix) < 0) {
    return res.status(400).json({
      erreur: 'Nom obligatoire et prix valide requis'
    });
  }

  produit.nom = nom.trim();
  produit.prix = Number(prix);

  res.json(produit);
});

// DELETE : supprimer un produit
app.delete('/api/produits/:id', (req, res) => {
  const index = produits.findIndex(
    p => p.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ erreur: 'Produit introuvable' });
  }

  produits.splice(index, 1);
  res.json({ message: 'Produit supprimé avec succès' });
});

// Route inconnue
app.use((req, res) => {
  res.status(404).json({ erreur: 'Route introuvable' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(400).json({ erreur: 'Requête invalide' });
});

app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
});
