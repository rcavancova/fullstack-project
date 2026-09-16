# Full-Stack Task Manager

A simple task management application built from scratch to practice the full stack: TypeScript on both ends, a REST API with Express, PostgreSQL for persistence, and React for the UI.

## Tech Stack

**Backend**
- Node.js + Express
- TypeScript
- PostgreSQL (via `pg`)
- `dotenv` for configuration

**Frontend**
- React + TypeScript
- Vite

## Project Structure

```
proyecto_fullstack/
├── back-end/     Express API + PostgreSQL
└── front-end/    React (Vite) client
```

## Status

- ✅ Backend REST API with full CRUD (Create, Read, Update, Delete), tested against a real PostgreSQL database
- ✅ SQL injection protection via parameterized queries
- ✅ Environment variables for database credentials (`.env`, not committed)
- ✅ Frontend connected to the backend: fetches and displays tasks on load, and creates new tasks through the UI
- 🔲 Edit / delete actions not yet wired up in the UI (available in the API)
- 🔲 Deployment

This project is under active development — see the roadmap below.

## API Endpoints

| Method | Endpoint       | Description                  |
|--------|----------------|-------------------------------|
| GET    | `/tareas`      | List all tasks                |
| POST   | `/tareas`      | Create a new task              |
| PUT    | `/tareas/:id`  | Update an existing task        |
| DELETE | `/tareas/:id`  | Delete a task                  |

### Request/response example

**POST `/tareas`**
```json
// Request body
{ "titulo": "Buy milk", "hecha": false }

// Response
{
  "mensaje": "tarea creada con exito",
  "datos": { "id": 1, "titulo": "Buy milk", "hecha": false }
}
```

## Getting Started

### Prerequisites
- Node.js (v24+ recommended — the backend runs TypeScript directly via type stripping)
- PostgreSQL running locally (or accessible remotely)

### 1. Clone the repository
```bash
git clone https://github.com/rcavancova/fullstack-project.git
cd fullstack-project
```

### 2. Set up the database
Create a PostgreSQL database and the `tareas` table:
```sql
CREATE TABLE tareas (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200),
  hecha BOOLEAN
);
```

### 3. Backend setup
```bash
cd back-end
npm install
```

Create a `.env` file in `back-end/` (see `.env.example`):
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name
```

Run the server:
```bash
node index.ts
```
The API will be available at `http://localhost:3000`.

### 4. Frontend setup
```bash
cd front-end
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## Roadmap

- [ ] Wire up edit / delete actions in the UI
- [ ] Move to a `.env`-based config with sensible defaults
- [ ] Deploy backend and frontend
- [ ] Add automated tests

## Author

Rolando Cavanzón — [GitHub](https://github.com/rcavancova) · [LinkedIn](https://linkedin.com/in/rolando-cavanzon)
