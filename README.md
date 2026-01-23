# Projet Gestion des Dons - L'espoir des pauvres

Application web complète pour la gestion des dons, stocks et redistributions.

## Prérequis

- Node.js installé
- SQLite (inclus via fichier local)

## Installation Rapide

1.  Ouvrez un terminal à la racine du projet.
2.  Installez toutes les dépendances :
    ```bash
    npm run install-all
    ```
    _(Ou manuellement : `npm install` à la racine, puis dans `server/` et `client/`)_

## Lancement

Pour lancer le Backend et le Frontend en même temps :

```bash
npm run dev
```

- **Frontend** : [http://localhost:5173](http://localhost:5173)
- **Backend** : [http://localhost:5000](http://localhost:5000)

## Identifiants de Test (Créés au premier lancement si vide)

Vous pouvez utiliser l'inscription sur la page de login, ou créer un admin via l'API.
Par défaut, la base de données est vide. Inscrivez-vous via le formulaire "/login" -> (Ajouter un bouton d'inscription serait mieux, mais pour l'instant utilisez Postman ou l'inscription si implémentée, sinon je vais ajouter un script de seed).

### Script de Seed (Optionnel)

Pour peupler la base avec un admin par défaut :
Lancer `node server/seed.js` (à créer si besoin, sinon inscrivez-vous).

## Fonctionnalités

- **Authentification** : Login/Register
- **Offres** : Création, Validation, PDF
- **Stock** : QR Code, Changement de lieu
- **Stats** : Dashboard
