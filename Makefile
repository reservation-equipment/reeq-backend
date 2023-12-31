docker_backend_build:
	docker-compose up -d --build reeq-backend
docker_build:
	docker-compose up -d --build

# Windows
prisma_add_migrate :
	docker-compose exec reeq-backend sh -c 'npx prisma migrate dev --name %migration_name%'
# Mac/Linux
#prisma_add_migrate:
#    @read -p "Enter migration name: " migration_name; \
#    npx prisma migrate dev --name $$migration_name
