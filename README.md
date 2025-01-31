## Installation
### Requirements
- Installer Make
- Installer Docker
### Etapes
- Cloner le répo
- Lancer la commande "make dev" pour l'environnement DEV et "make prod" pour l'environnement PRODUCTION, dans le répertoire racine de l'application

## Architecture

/ (racine du projet)

│

├── src/

│   ├── config/

│   ├── controller/

│   ├── models/

│   ├── public/

│   ├── routes/

│   ├── services/

│   └── views/

│

├── app.js

├── router.js

├── Makefile

├── .env

├── compose.yaml


├── Dockerfile

├── eslint.config.js

├── package-lock.json

└── package.json

## Présentation du site
- Page d'accueil 
- Page de connexion
- Page de chat + commande "/dab"
- Page documentation (Swagger)

## ORM 
Utilisation de Sequelize

## Connexion BDD
Voir config/database.js

## POSTMAN + Collection + JWT/Token

## Mise en production
Application sous Docker (Voir étape installation Prod)
