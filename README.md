# Help Desk Ticketing System

## Overview
A web-based help desk ticketing system that allows customers to report and track issues, which support agents can pick up and resolve transparently.

## Tech Stack
- frontend: JavaScript, HTML, CSS
- backend: Node.js, Postgres

## Project Structure
- frontend/
- backend/
- database/
## Getting Started
### Prerequisites
- Git
- `npx vite`
### Installation
1. Click the green "Code" button on the repository
2. Copy the HTTPS web url
3. Run  `git clone [url]`
### How to Run
#### Frontend
1. In the main project directory, run `npx vite`
2. Open `localhost:5467` or as specified by `npx vite`
#### Backend
1. cd backend
2. npm install
3. DB_USER=your_postgres_username npm run db:setup
4. create a .env file in /backend (you can copy from .env.example)
5. npm start
Important note
- Your `db:setup` script uses `DB_USER` from the terminal, so the cleanest command is:

## Team Contributions
- Aaron: create, my/all tickets page, database, backend setup
- Chris: login/signup, nav and search bar, documentation, dashboard and history pages, ER diagram
- Jasneet: ticket details page
## License
