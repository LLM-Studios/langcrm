# Makefile

setup:
	@echo "Setting up the environment..."
	@echo "Starting supabase"
	supabase start --workdir ./packages/database/
	@echo "Setting up doppler"
	doppler setup
	@echo "Setting up prisma"
	doppler run -- bunx prisma migrate dev --schema=./packages/database/prisma/schema.prisma
	doppler run -- bunx prisma db push --schema=./packages/database/prisma/schema.prisma
	doppler run -- bunx prisma generate --schema=./packages/database/prisma/schema.prisma

start:
	@echo "Starting the application..."
	doppler run -- turbo dev