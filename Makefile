# Makefile

setup:
	@echo "Setting up the environment..."
	@echo "Installing dependencies"
	bun i
	@echo "Starting supabase"
	supabase start --workdir ./packages/database/
	@echo "Setting up doppler"
	doppler setup
	@echo "Setting up prisma"
	doppler run -- bun run prisma:dev
	doppler run -- bun run prisma:generate

start:
	@echo "Starting the application..."
	doppler run -- turbo dev --env-mode=loose