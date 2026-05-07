# Novice

A mentorship and coaching platform focused on helping users discover experts, start conversations, and take early career steps with more confidence. The project currently includes a simple landing page, dashboard flow, authentication wiring, and an expert marketplace UI.

## Project Structure

- **`api/`** - Backend API built with Express, TypeScript, and tRPC
- **`web/`** - Frontend React application built with Vite, TypeScript, and React Router
- **`compose.yml`** - Local PostgreSQL service definition for development

## Getting Started

The project currently requires:

- Node.js 20+
- npm 10+
- Docker 20.10+
- PostgreSQL 17 (provided through Docker)

Quick start:

```bash
npm install
docker compose up -d
cd api && npm run dev   # Terminal 1
cd web && npm run dev   # Terminal 2
```

To run the linter locally:

```bash
npm run lint
```

The app will be available at:

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5555`

## Database

Uses PostgreSQL as the primary database for local development. The schema is initialized from `api/schema.sql` when the Docker container starts for the first time.

## Quality Assurance

### Development Setup

- **TypeScript**: Used across both the frontend and backend
- **tRPC**: Shared API contract between the client and server
- **Docker Compose**: Local Postgres setup for consistent development
- **ESLint**: Repo-level linting for both `api` and `web`

### Current Project State

- Landing page and dashboard routes are implemented in the frontend
- Expert marketplace UI is available at `/find-coach`
- Authentication-related frontend and backend wiring is present
- Backend includes Express routes and a small tRPC API

### Build and Run

- **Frontend build**: `cd web && npm run build`
- **Frontend dev server**: `cd web && npm run dev`
- **Backend dev server**: `cd api && npm run dev`
- **Lint the repo**: `npm run lint`

As the project grows, additional linting, testing, and deployment workflows can be added here.
