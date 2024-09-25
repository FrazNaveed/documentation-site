#!/bin/bash
# This script will clean and bootstrap a new Docker based env for local testing.
# NB! Not for production use! See the README.md for details

confirm() {
    # Prompt the user
    read -r -p "This will clean and delete the current Docker compose environment (if it exists) and bootstrap a fresh one. Are you sure you want to do this? [y/N]: " response

    # Default to "no" if the user presses enter without typing anything
    response=${response:-N}

    # Check if the user typed 'y' or 'Y'
    if [[ "$response" =~ ^([yY])$ ]]; then
        return 0
    else
        return 1
    fi
}

# Ask for confirmation
if confirm; then
    echo "Ok, here goes! Cleaning up any existing Docker compose setups..."
    docker-compose -f docker-compose-postgres.dev.yml down --rmi all -v
    docker-compose -f docker-compose-next.dev.yml down --rmi all
    echo "Starting PostgreSQL in the background..."
    docker-compose -f docker-compose-postgres.dev.yml up -d
    sleep 4
    echo "Starting NextJS in dev mode in the background..."
    (npm run dev&)
    sleep 11
    echo "Seeding data into the Postgres database..."
    npm run seed:news-types
    sleep 4
    npm run seed:news
    sleep 3
    echo "Stopping NextJS in Dev mode and building the Next/Payload stack in Docker..."
    kill -9 $(lsof -ti:3000)
    docker-compose -f docker-compose-next.dev.yml up --build -d
    docker-compose -f docker-compose-next.dev.yml down
    echo "Docker is all set up. Run 'npm run docker:up' and go to http://localhost:3000 to see the stack in action."

else
    echo "Action cancelled."
    exit 1
fi

