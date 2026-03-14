# Local Setup Guide: Run on your PC

This guide walks you through setting up and running the dashboard locally on your computer for development or testing.

## Prerequisites

- **Node.js** (v18.0 or higher recommended)
- **npm** (usually comes with Node.js)
- **MySQL** (or whatever database you are using, as indicated by `mysql2` in dependencies)

## 1. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

## 2. Environment Configuration

You must have a `.env` file in the root directory. If you don't have one, create it and add your local database credentials and other secrets.

```env
# Example .env contents
DATABASE_URL="your_database_connection_string"
NEXT_PUBLIC_SOCKET_SERVER="http://localhost:7000"
# Add other variables as needed
```

## 3. Run Development Server

To start the app in development mode (with hot-reloading):

```bash
npm run dev
```

The dashboard will be available at [http://localhost:7000](http://localhost:7000).

## 4. Production Build (Optional)

If you want to test the production build locally without Docker:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## Troubleshooting

- **Node Version**: Ensure `node -v` shows a compatible version.
- **Port Conflict**: If port 7000 is in use, you can change it using `PORT=7001 npm run dev`.
- **Database**: Ensure your local database is running and accessible via the credentials in `.env`.
