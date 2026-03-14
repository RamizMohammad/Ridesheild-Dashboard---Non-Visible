# Run with Docker on your PC

This guide explains how to run the dashboard on your local machine using Docker. This is often easier than manual setup as it packages all dependencies.

## Prerequisites

- **Docker Desktop** installed and running on your PC.
- A **.env** file in the project root.

## 1. Prepare Environment

Ensure you have a `.env` file. If you are running the database locally on your PC (outside Docker), you may need to use `host.docker.internal` instead of `localhost` in your database connection string so the container can reach your host machine.

```env
# Example for Windows/Mac Docker Desktop to reach host MySQL
DATABASE_URL="mysql://user:password@host.docker.internal:3306/dbname"
```

## 2. Run with Docker Compose

Open your terminal in the project folder and run:

```bash
docker compose -f docker-compose.local.yml up --build -d
```

## 3. Access the App

Open your browser and go to:
[http://localhost:3000](http://localhost:3000)

## Quick Commands

- **Stop**: `docker compose -f docker-compose.local.yml stop`
- **View Logs**: `docker compose -f docker-compose.local.yml logs -f`
- **Down (cleanup)**: `docker compose -f docker-compose.local.yml down`
