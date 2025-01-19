FROM node:22 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

FROM base AS dev

# Démarrer l'application avec nodemon
CMD ["npm", "run", "dev"]

FROM base AS prod

RUN npm install --production

# Démarrer l'application avec nodemon
CMD ["npm", "run", "start"]