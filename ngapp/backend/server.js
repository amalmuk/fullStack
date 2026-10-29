
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Produit = require('./models/Produit');
const User = require('./models/User');

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// Middleware : vérifier le token JWT
function verifierToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      erreur: 'Accès refusé : token manquant'
    });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      erreur: 'Configuration JWT manquante'
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.sub;
    next();
  } catch (error) {
    return res.status(401).json({
      erreur: 'Token invalide ou expiré'
    });
  }
}

// POST : inscription
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { nom, email, password } = req.body;

    if (
      typeof nom !== 'string' || !nom.trim() ||
      typeof email !== 'string' || !email.trim() ||
      typeof password !== 'string' || password.length < 8
    ) {
      return res.status(400).json({
        erreur: 'Nom, email et mot de passe (8 caractères minimum) requis'
      });
    }

    const emailNormalise = email.trim().toLowerCase();
    const utilisateurExistant = await User.findOne({
      email: emailNormalise
    });

    if (utilisateurExistant) {
      return res.status(409).json({
        erreur: 'Cet email est déjà utilisé'
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const utilisateur = await User.create({
      nom: nom.trim(),
      email: emailNormalise,
      password: passwordHash
    });

    res.status(201).json({
      message: 'Inscription réussie',
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        erreur: 'Cet email est déjà utilisé'
      });
    }
    next(error);
  }
});

// POST : connexion
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' || !email.trim() ||
      typeof password !== 'string' || !password
    ) {
      return res.status(400).json({
        erreur: 'Email et mot de passe requis'
      });
    }

    const utilisateur = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (
      !utilisateur ||
      !(await bcrypt.compare(password, utilisateur.password))
    ) {
      return res.status(401).json({
        erreur: 'Email ou mot de passe incorrect'
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        erreur: 'Configuration JWT manquante'
      });
    }

    const token = jwt.sign(
      { sub: utilisateur._id.toString() },
      secret,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      utilisateur: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET : récupérer tous les produits (protégé)
app.get('/api/produits', verifierToken, async (req, res, next) => {
  try {
    const produits = await Produit.find().sort({ createdAt: -1 });
    res.json(produits);
  } catch (error) {
    next(error);
  }
});

// GET : récupérer un produit par son ID (protégé)
app.get('/api/produits/:id', verifierToken, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ erreur: 'ID invalide' });
    }

    const produit = await Produit.findById(req.params.id);

    if (!produit) {
      return res.status(404).json({ erreur: 'Produit introuvable' });
    }

    res.json(produit);
  } catch (error) {
    next(error);
  }
});

// POST : ajouter un produit (protégé)
app.post('/api/produits', verifierToken, async (req, res, next) => {
  try {
    const { nom, prix } = req.body;

    if (
      typeof nom !== 'string' ||
      !nom.trim() ||
      prix === undefined ||
      prix === null ||
      prix === '' ||
      !Number.isFinite(Number(prix)) ||
      Number(prix) < 0
    ) {
      return res.status(400).json({
        erreur: 'Nom obligatoire et prix valide requis'
      });
    }

    const nouveauProduit = await Produit.create({
      nom: nom.trim(),
      prix: Number(prix)
    });

    res.status(201).json(nouveauProduit);
  } catch (error) {
    next(error);
  }
});

// PUT : modifier un produit (protégé)
app.put('/api/produits/:id', verifierToken, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ erreur: 'ID invalide' });
    }

    const { nom, prix } = req.body;

    if (
      typeof nom !== 'string' ||
      !nom.trim() ||
      prix === undefined ||
      prix === null ||
      prix === '' ||
      !Number.isFinite(Number(prix)) ||
      Number(prix) < 0
    ) {
      return res.status(400).json({
        erreur: 'Nom obligatoire et prix valide requis'
      });
    }

    const produit = await Produit.findByIdAndUpdate(
  req.params.id,
  { nom: nom.trim(), prix: Number(prix) },
  { returnDocument: 'after', runValidators: true }
);

    if (!produit) {
      return res.status(404).json({ erreur: 'Produit introuvable' });
    }

    res.json(produit);
  } catch (error) {
    next(error);
  }
});

// DELETE : supprimer un produit (protégé)
app.delete('/api/produits/:id', verifierToken, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ erreur: 'ID invalide' });
    }

    const produit = await Produit.findByIdAndDelete(req.params.id);

    if (!produit) {
      return res.status(404).json({ erreur: 'Produit introuvable' });
    }

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    next(error);
  }
});

// Route inconnue
app.use((req, res) => {
  res.status(404).json({ erreur: 'Route introuvable' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.message);

  if (
    err.name === 'ValidationError' ||
    err.name === 'CastError'
  ) {
    return res.status(400).json({
      erreur: 'Données invalides'
    });
  }

  res.status(500).json({
    erreur: 'Erreur interne du serveur'
  });
});

// Connexion MongoDB puis démarrage du serveur
async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tp3db'
    );

    console.log('MongoDB connecté avec succès');

    app.listen(PORT, () => {
      console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erreur de connexion MongoDB :', error.message);
    process.exit(1);
  }
}

startServer();
