docker_build_backend:
	docker-compose up -d --build reeq-backend --wait
watch:
	docker compose watch
docker_build:
	docker-compose up -d --build --wait

docker_create_volume:
	docker volume create db_volume

build: docker_create_volume docker_build run_db_push

backup_db:
	docker exec db sh -c "pg_dumpall -c -U postgres > dump.sql"

restore_db:
	cat dump_.sql | docker exec -i db psql -U postgres -d reeq-db

run_db_push:
	npx prisma db push

cp_dump_file:
	docker cp 77725cc46d2b:/dump.sql ./prisma/dumps

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
