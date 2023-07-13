.PHONY: warning
warning:
	@echo "Please specify a target."

.PHONY: build
build:
	docker-compose -f ./docker-compose.yml -p tvshows build

.PHONY: start
start:
	docker-compose -f ./docker-compose.yml -p tvshows up -d 

.PHONY: stop
stop:
	docker-compose -f ./docker-compose.yml -p tvshows down
