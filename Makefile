docker_build_backend:
	docker-compose up -d --build reeq-backend --wait
watch:
	docker compose watch
docker_build:
	docker-compose up -d --build --wait

docker_create_volume:
	docker volume create db_volume

build: docker_create_volume docker_build run_db_push

run_db_push:
	npx prisma db push

run_migrations:
	npx prisma migrate deploy
## Для загрузки дампа
## заходим в контейнер базы и пишем
# pg_dump <name_db> -U <name_user> < reeq-db.dump
#
# Windows
prisma_add_migrate :
	docker-compose exec reeq-backend sh -c 'npx prisma migrate dev --name %migration_name%'
# Mac/Linux
#prisma_add_migrate:
#    @read -p "Enter migration name: " migration_name; \
#    npx prisma migrate dev --name $$migration_name
