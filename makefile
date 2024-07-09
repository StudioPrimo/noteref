.PHONY: up

up:
	docker compose up -d --build

.PHONY: down
down:
	docker compose down

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
	docker compose exec backend go test backend/...