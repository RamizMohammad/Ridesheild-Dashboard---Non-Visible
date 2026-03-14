# Deployment Guide: Next.js Dashboard with Docker

This guide provides instructions on how to build and run the dashboard using Docker on any server.

## Prerequisites

- **Docker** installed on the target server.
- **Node.js** (optional, only for local testing).
- **.env** file containing necessary environment variables.

## 1. Setup on Server

Clone the repository or copy the project files to your server.

```bash
# Example if using git
git clone <your-repo-url>
cd dashboard
```

## 2. Environment Variables

Ensure you have a `.env` file in the root directory. This is critical for database connections and API keys.

```bash
touch .env
# Add your variables here
```

## 3. Deployment with Docker Compose

Run the following command in the project root to build and start the application:

```bash
docker compose up -d
```

## 4. Verification

The dashboard should now be accessible at `http://<server-ip>:3000`.

### Troubleshooting

- **Check Logs**: `docker compose logs -f`
- **Stop Services**: `docker compose stop`
- **Remove Services**: `docker compose down`
