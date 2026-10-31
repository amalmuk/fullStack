
# FullStackPro - TP3

## 1. Présentation du projet

FullStackPro est une application Web Full Stack développée
dans le cadre du TP3.

Le projet permet de gérer des produits et des utilisateurs
avec une interface Angular, un serveur Express et une base
de données MongoDB.

## 2. Technologies utilisées

### Frontend
- Angular
- TypeScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Déploiement
- Render
- Docker
- Docker Compose

## 3. Architecture du projet

- Frontend : application Angular
- Backend : API REST avec Express
- Database : MongoDB Atlas
- Authentication : JWT

## 4. Fonctionnalités principales

- Page d'accueil
- Page de connexion
- Page de contact
- Inscription des utilisateurs
- Authentification avec JWT
- Affichage des produits
- Ajout de produits
- Modification de produits
- Suppression de produits
- Protection des routes avec JWT

## 5. API REST

| Méthode | Route | Description |
|---|---|---|
| POST | /api/auth/register | Inscription |
| POST | /api/auth/login | Connexion |
| GET | /api/produits | Liste des produits |
| GET | /api/produits/:id | Détail produit |
| POST | /api/produits | Ajouter produit |
| PUT | /api/produits/:id | Modifier produit |
| DELETE | /api/produits/:id | Supprimer produit |

Les routes produits nécessitent un token JWT.

## 6. Installation

Installer les dépendances du frontend :

```bash
npm install
```

Installer les dépendances du backend :

```bash
cd backend
npm install
```

## 7. Configuration

Créer un fichier `.env` dans le dossier backend :

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Ne jamais publier le fichier `.env` sur GitHub.

## 8. Déploiement

Frontend :
https://tp3-frontend-amal.onrender.com

Backend :
https://tp3-backend-amal.onrender.com

## 9. Conclusion

Ce projet permet de mettre en pratique le développement
Full Stack, la création d'une API REST, la gestion d'une
base de données MongoDB et l'authentification sécurisée
avec JWT.
