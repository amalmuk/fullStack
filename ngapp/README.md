# Ngapp — Application Full Stack Angular + Express

## 1. Présentation du projet

Ce projet a été réalisé dans le cadre du TP2 de développement Full Stack.

Il consiste à développer une application web avec :
- **Frontend :** Angular
- **Backend :** Node.js et Express
- **Communication :** API REST avec JSON et Fetch API

L'application permet de consulter et de gérer une liste de produits.

## 2. Prérequis

Avant de lancer le projet, il faut installer :
- Node.js et npm
- Angular CLI
- Un navigateur web

## 3. Installation

Ouvrir un terminal dans le dossier du projet et exécuter :

```bash
npm install
```

## 4. Lancement du backend

Dans un premier terminal :

```bash
node backend/server.js
```

Le serveur Express fonctionne sur :

`http://localhost:3000`

## 5. Lancement du frontend

Dans un deuxième terminal, à la racine du projet :

```bash
npm start
```

Ouvrir ensuite le navigateur à l'adresse :

`http://localhost:4200`

## 6. Routes de l'API REST

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/produits` | Récupérer tous les produits |
| GET | `/api/produits/:id` | Récupérer un produit par son identifiant |
| POST | `/api/produits` | Ajouter un produit |
| PUT | `/api/produits/:id` | Modifier un produit |
| DELETE | `/api/produits/:id` | Supprimer un produit |

## 7. Validation et gestion des erreurs

L'API vérifie les données envoyées lors de l'ajout et de la modification d'un produit.

- **400 Bad Request :** données invalides.
- **404 Not Found :** produit ou route introuvable.

Les données sont échangées au format JSON.

## 8. Tests de l'API

Les routes ont été testées avec PowerShell à l'aide de requêtes HTTP.

Les tests réalisés comprennent :
- Consultation de la liste des produits.
- Ajout, modification et suppression d'un produit.
- Vérification des données invalides.
- Vérification des produits inexistants et des routes inconnues.

## 9. Remarque

Les produits sont stockés en mémoire dans le serveur. Les modifications effectuées sont donc réinitialisées lorsque le backend redémarre.

## 10. Auteur

Projet réalisé dans le cadre du TP2 — Développement Full Stack.
