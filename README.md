## Installation
### Requirements
- Installer Make
- Installer Docker
### Etapes
- Cloner le répo
- Lancer la commande "make dev" pour l'environnement DEV et "make prod" pour l'environnement PRODUCTION, dans le répertoire racine de l'application

## Présentation du site
- Page d'accueil 
- Page de connexion
- Page de chat + commande "/dab"
- Page documentation (Swagger)

## Architecture

/ (racine du projet)

│

├── src/

│ ── ├── config/

│ ── ├── controller/

│ ── ├── models/

│ ── ├── public/

│ ── ├── routes/

│ ── ├── services/

│ ── ├── views/

│ ── ├──  app.js

│ ── └── router.js

├── Makefile

├── .env

├── compose.yaml


├── Dockerfile

├── eslint.config.js

├── package-lock.json

└── package.json

## ORM 
Utilisation de Sequelize

## Connexion BDD
Voir config/database.js

## POSTMAN + Collection + JWT/Token
API REST

## Mise en production
Application sous Docker (Voir étape installation Prod)
