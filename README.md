# E-commerce Full-Stack Monorepo

React + TypeScript frontend with an Express + MongoDB backend. This repo bundles both apps so you can develop and deploy them together.

## Contents
- `frontend/` – Vite + React + TypeScript UI with product catalog pages and shared assets.
- `backend/` – Express API with MongoDB models, controllers, and routes for products, categories, users, and orders.
- `.gitignore` – Shared ignores for both apps.

## Prerequisites
- Node.js 18+ and npm
- MongoDB running locally (default connection string in `backend/server.js` is `mongodb://localhost:27017/ordersDB`)

## Setup
```bash
git clone https://github.com/Rithik-Sharon-A/e-commerce-website.git
cd e-commerce-website
```

Install dependencies:
```bash
cd frontend
npm install
cd ../backend
npm install
```

## Running the apps
Backend (Express + MongoDB):
```bash
cd backend
# Update the MongoDB URI in server.js or use an env var if you add one
npm run dev   # uses nodemon
```

Frontend (Vite dev server):
```bash
cd frontend
npm run dev   # defaults to http://localhost:5173
```

## Build
```bash
cd frontend
npm run build
```

## Testing
- Frontend: add tests under `frontend/src/test/` and run with your preferred runner (Vitest config is currently removed; reintroduce as needed).
- Backend: add tests under `backend/` and run with your preferred Node test runner.

## Project structure (trimmed)
```
frontend/
  src/
    components/Navbar/
    Assets/
  package.json
backend/
  controller/
  model/
  route/
  middleware/
  server.js
.gitignore
README.md
```

## Notes
- The backend currently hardcodes the MongoDB URI; set an environment variable or config file before production use.
- Ports: backend `3000`, frontend `5173` (default Vite). Update as needed if you run both together.

