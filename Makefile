# Makefile

setup:
	@echo "Setting up the environment..."
	@echo "Starting supabase"
	supabase start --workdir ./packages/database/
	@echo "Setting up prisma"
	bunx prisma migrate dev --schema=./packages/database/prisma/schema.prisma
	bunx prisma db push --schema=./packages/database/prisma/schema.prisma
	bunx prisma generate --schema=./packages/database/prisma/schema.prisma
	@echo "Setting up doppler"
	doppler setup
	@echo "Starting the application..."
	doppler run -- turbo dev

start:
	@echo "Starting the application..."
	doppler run -- turbo dev