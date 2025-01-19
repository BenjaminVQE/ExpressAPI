DOCKER_COMPOSE = docker-compose
COMPOSE_FILE = compose.yaml

.PHONY: help dev prod logs stop clean rebuild

help:
	@echo "Commandes disponibles :"
	@echo "  make dev      - Démarrer l'environnement de développement"
	@echo "  make prod     - Démarrer l'environnement de production"
	@echo "  make logs     - Afficher les logs des conteneurs"
	@echo "  make stop     - Arrêter les conteneurs"
	@echo "  make clean    - Supprimer les conteneurs et volumes"
	@echo "  make rebuild  - Reconstruire les images"

dev:
	@echo "Démarrage de l'environnement de développement..."
	$(DOCKER_COMPOSE) up app-dev -d

prod:
	@echo "Démarrage de l'environnement de production..."
	$(DOCKER_COMPOSE) up app-prod -d