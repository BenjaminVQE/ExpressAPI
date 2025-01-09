FROM node:22 AS base

WORKDIR /app

RUN npm init -y

# Installer nodemon globalement
RUN npm install -g nodemon

RUN npm install express

COPY . .

EXPOSE 3000

FROM base AS dev

# Démarrer l'application avec nodemon
CMD ["npm", "run", "start"]