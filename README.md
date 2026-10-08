# Film Project

A full-stack Movie and Series management application with JWT authentication, protected routes, and an admin dashboard for managing content.

**Tech stack:** React · Vite · Bootstrap · Node.js · Express · MySQL · JWT

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Endpoints](#api-endpoints)
- [Frontend Routes](#frontend-routes)
- [Authentication Flow](#authentication-flow)
- [Key Files](#key-files)
- [Notes](#notes)
- [Author](#author)

## Features

- User registration and login with JWT authentication
- Protected routes that redirect unauthenticated users to the login page
- Role-based access: the admin panel is available only to users with the `Admin` role
- Home page that lists movies and a Series page that lists TV shows
- Admin dashboard showing movie and series counts
- Add, edit, and delete movies and series (full CRUD)

## Project Structure

```
project---Film/
├── backend/              # Express API and MySQL integration
│   ├── config/db.js      # MySQL connection
│   ├── controllers/      # Auth, movie, and series logic
│   ├── routes/           # authRoutes, movieRoutes, seriesRoutes
│   └── server.js         # Server entry point
├── frontend/             # React app (Vite)
│   └── src/
│       ├── App.jsx                   # Router configuration
│       ├── utils/ProtectedRoutes.jsx # Route protection
│       └── Mycomponent/              # Login, Register, Home, Series, Admin, ...
└── README.md
```

## Tech Stack

**Backend**

- `express`
- `mysql2`
- `jsonwebtoken`
- `dotenv`
- `cors`
- `bcrypt` (included in dependencies)

**Frontend**

- `react`
- `react-router-dom`
- `axios`
- `react-bootstrap` and `bootstrap`
- `vite`
- `tailwindcss` (installed in project dependencies)

## Getting Started

### Prerequisites

- Node.js and npm
- A running MySQL server

### Backend

```bash
cd backend
npm install
# create backend/.env (see Environment Variables)
node server.js
```

The server listens on `http://localhost:5000` by default.

### Frontend

```bash
cd frontend
npm install
# create frontend/.env (see Environment Variables)
npm run dev
```

## Environment Variables

**`backend/.env`**

```env
PORT=5000

db_host=localhost
db_user=your_mysql_user
db_password=your_mysql_password
db_name=cinema

SECRET_KEY=your_jwt_secret
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:5000
```

> Use your own credentials and a strong, private `SECRET_KEY`. Never commit `.env` files to GitHub.

## Database

The backend connects to MySQL through `backend/config/db.js`. The configured database must exist and contain these tables:

| Table | Columns |
| --- | --- |
| `users` | id, username, email, password, role |
| `movies` | movie_id, movie_name, genre, release_year, language, description, rating, image, trailer |
| `series` | series_id, series_name, genre, release_year, season, episode, description, rating, image, trailer |

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/Register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT |
| GET | `/auth/login` | Validate a JWT (protected) |

### Movies

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/movies` | List all movies |
| POST | `/movies` | Add a movie |
| PUT | `/movies/:movie_id` | Update a movie |
| DELETE | `/movies/:id` | Delete a movie |

### Series

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/series` | List all series |
| POST | `/series` | Add a series |
| PUT | `/series/:series_id` | Update a series |
| DELETE | `/series/:id` | Delete a series |

## Frontend Routes

| Route | Page | Access |
| --- | --- | --- |
| `/` | Login | Public |
| `/register` | Register | Public |
| `/home` | Home (movies) | Protected |
| `/viewseries` | Series | Protected |
| `/about` | About Us | Protected |
| `/admin` | Admin panel | Protected, Admin role only |
| `/addseries` | Add Series form | Protected |
| `/editseries` | Edit Series | Protected |
| `/movies` | Add Movies | Protected |
| `/edit` | Edit Movies | Protected |

## Authentication Flow

1. **Register** stores a new user in the database and returns a JWT.
2. **Login** validates credentials and returns a JWT containing the `username` and `role`.
3. The React app saves `token`, `username`, and `role` in `localStorage`.
4. `ProtectedRoutes` redirects users to the login page if no token is present.
5. The admin dashboard additionally checks that `role === "Admin"` before rendering.

## Key Files

| File | Purpose |
| --- | --- |
| `backend/server.js` | Express server entry point |
| `backend/routes/authRoutes.js` | Auth route definitions |
| `backend/routes/movieRoutes.js` | Movie route definitions |
| `backend/routes/seriesRoutes.js` | Series route definitions |
| `backend/controllers/*Controller.js` | CRUD and auth logic |
| `frontend/src/App.jsx` | React router configuration |
| `frontend/src/utils/ProtectedRoutes.jsx` | Route protection logic |
| `frontend/src/Mycomponent/Login.jsx` | Login screen |
| `frontend/src/Mycomponent/Register.jsx` | Registration screen |
| `frontend/src/Mycomponent/Admin.jsx` | Admin panel |
| `frontend/src/Mycomponent/Home.jsx` | Movies page |
| `frontend/src/Mycomponent/Series.jsx` | Series page |

## Notes

- The backend has no `start` script in `package.json`, so run it with `node server.js`.
- The backend requires the configured MySQL database and tables to exist before it starts.
- The frontend fetches all data from the backend with Axios using `VITE_API_URL`.

## Author

**Aman Patil** — [@AmanPatil2002](https://github.com/AmanPatil2002)
