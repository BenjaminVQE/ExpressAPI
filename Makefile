DOCKER_COMPOSE = docker-compose
SERVICE_NAME = expressapi

.PHONY: help dev prod logs down clean rebuild

help:
	@echo "Commandes disponibles :"
	@echo "  make dev      - Démarrer l'environnement de développement"
	@echo "  make prod     - Démarrer l'environnement de production"
	@echo "  make logs     - Afficher les logs des conteneurs"
	@echo "  make down     - Arrêter les conteneurs et supprimer les conteneurs"

dev:
	@echo "Démarrage de l'environnement de développement..."
	$(DOCKER_COMPOSE) up app-dev -d

prod:
	@echo "Démarrage de l'environnement de production..."
	$(DOCKER_COMPOSE) up app-prod -d

logs:
	@echo "Affichage des logs des conteneurs..."
	$(DOCKER_COMPOSE) logs -f

down:
	@echo "Arrêt des conteneurs définis dans docker-compose.yml..."
	$(DOCKER_COMPOSE) -f compose.yaml down

remove-image:
	@echo "Arrêt des conteneurs et suppression de l'image..."
	$(DOCKER_COMPOSE) down --rmi all