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
DOCKER_COMPOSE_LOCAL_MINIO		:= $(DOCKER_FILE_DIR)/docker-compose.minio.yml
DOCKER_EXEC                     := docker exec -it
GITHUB_REPOSITORY_NAME          := noteref
DB_CONTAINER_NAME               := $(GITHUB_REPOSITORY_NAME)-database

# dir
DATA_DIR := ./database/data
NODE_MODULES := ./frontend/src/node_modules
PACKAGE_LOCK := ./frontend/src/package-lock.json
minio := ./docker/minio

# rm
RM:=rm -rf

FILE := -f $(DOCKER_COMPOSE_LOCAL) \
	-f $(DOCKER_COMPOSE_LOCAL_DATABASE) \
	-f $(DOCKER_COMPOSE_LOCAL_FRONT) \
	-f $(DOCKER_COMPOSE_LOCAL_SERVER) \
	-f $(DOCKER_COMPOSE_LOCAL_MINIO)

.PHONY: up
up: ## docker環境を立ち上げる
	$(ENV_LOCAL) docker compose $(FILE) up -d

.PHONY: down
down:
	docker compose $(FILE) down

.PHONY: down-all
down-all: ## dockerイメージを削除し、docker環境を閉じる
	docker compose $(FILE) down \
	--rmi all --volumes --remove-orphans
	$(MAKE) del-data

.PHONY: fclean
fclean:down del-volumes ## マウントしたデータを削除、またdockerイメージも削除する

.PHONY: re
re:fclean up

.PHONY: del-volumes
del-volumes:del-data

.PHONY: del-data
del-data:
	sudo $(RM) $(DATA_DIR)

.PHONY: del-node-modules-and-package-lock
del-node-modules-and-package-lock:
	sudo $(RM) $(NODE_MODULES)
	sudo $(RM) $(PACKAGE_LOCK)

.PHONY: del-minio
del-minio:
	sudo $(RM) $(minio)

.PHONY: down-volume
down-volume:
	docker compose $(FILE) down \
	-v
	$(MAKE) del-data
	$(MAKE) del-node-modules-and-package-lock
	$(MAKE) del-minio

.PHONY: f
f:
	docker compose --env-file .env.local $(FILE) exec frontend bash

.PHONY: b
b:
	docker compose --env-file .env.local $(FILE) exec backend sh

.PHONY: backend-test
backend-test:
	docker compose exec backend go test ./...

.PHONY: up-build
up-build:
	$(MAKE) del-node-modules-and-package-lock
	mkdir -p $(NODE_MODULES)
	$(ENV_LOCAL) docker compose $(FILE) up -d --build
