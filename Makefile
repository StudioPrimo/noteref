.DEFAULT_GOAL := help

# env
ENV_LOCAL_FILE := .env.local
ENV_LOCAL       = $(shell cat $(ENV_LOCAL_FILE))

GO           := go run

# docker
DOCKER_FILE_DIR                 := ./docker
DOCKER_COMPOSE_LOCAL            := $(DOCKER_FILE_DIR)/docker-compose.yml
DOCKER_COMPOSE_LOCAL_DATABASE   := $(DOCKER_FILE_DIR)/docker-compose.database.yml
DOCKER_COMPOSE_LOCAL_SERVER     := $(DOCKER_FILE_DIR)/docker-compose.server.yml
DOCKER_COMPOSE_LOCAL_FRONT      := $(DOCKER_FILE_DIR)/docker-compose.front.yml
DOCKER_EXEC                     := docker exec -it
GITHUB_REPOSITORY_NAME          := noteref
DB_CONTAINER_NAME               := $(GITHUB_REPOSITORY_NAME)-database

# dir
DATA_DIR := ./database/data

# rm
RM:=rm -rf

.PHONY: up
up: ## docker環境を立ち上げる
	$(ENV_LOCAL) docker compose \
	-f $(DOCKER_COMPOSE_LOCAL) \
	-f $(DOCKER_COMPOSE_LOCAL_DATABASE) \
	-f $(DOCKER_COMPOSE_LOCAL_FRONT) \
	-f $(DOCKER_COMPOSE_LOCAL_SERVER) up -d

.PHONY: down
down: ## dockerイメージを削除し、docker環境を閉じる
	docker compose \
	-f $(DOCKER_COMPOSE_LOCAL) \
	-f $(DOCKER_COMPOSE_LOCAL_DATABASE) \
	-f $(DOCKER_COMPOSE_LOCAL_FRONT) \
	-f $(DOCKER_COMPOSE_LOCAL_SERVER) down \
	--rmi all --volumes --remove-orphans

.PHONY: fclean
fclean:down del-volumes ## マウントしたデータを削除、またdockerイメージも削除する

.PHONY: re
re:fclean up

.PHONY: del-volumes
del-volumes:del-data

.PHONY: del-data
del-data:
	sudo $(RM) $(DATA_DIR)

.PHONY: down-volume
down-volume:
	docker compose down -v

.PHONY: f
f:
	docker compose exec frontend bash

.PHONY: b
b:
	docker compose exec backend sh

.PHONY: backend-test
backend-test:
	docker compose exec backend go test ./...