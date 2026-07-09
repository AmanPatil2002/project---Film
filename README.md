# Film Project

A full-stack Movie and Series management project built with React, Vite, Bootstrap, Node.js, Express, MySQL, and JWT authentication.

## Project Structure

- `backend/` - Express API and MySQL database integration
- `frontend/` - React app with authentication, protected routing, and admin content management

## Backend Overview

The backend is an Express server with JWT-based authentication and MySQL queries.

### Key features

- User registration: `POST /auth/Register`
- User login: `POST /auth/login`
- JWT-protected auth validation: `GET /auth/login`
- Movies CRUD:
  - `GET /movies`
  - `POST /movies`
  - `PUT /movies/:movie_id`
  - `DELETE /movies/:id`
- Series CRUD:
  - `GET /series`
  - `POST /series`
  - `PUT /series/:series_id`
  - `DELETE /series/:id`

### Backend stack

- `express`
- `mysql2`
- `jsonwebtoken`
- `dotenv`
- `cors`
- `bcrypt` (included in dependencies)

### Database config

The backend connects to a MySQL database using `backend/config/db.js` and environment variables in `backend/.env`.

Expected tables:

- `users` (id, username, email, password, role)
- `movies` (movie_id, movie_name, genre, release_year, language, description, rating, image, trailer)
- `series` (series_id, series_name, genre, release_year, season, episode, description, rating, image, trailer)

### Example backend `.env`

```env
PORT=5000

db_host=localhost
db_user=root
db_password=1234
db_name=cinema

SECRET_KEY=mysecretkey
```

## Frontend Overview

The frontend is a Vite-powered React application.

### Key features

- Login and registration screens
- Protected routes using `frontend/src/utils/ProtectedRoutes.jsx`
- Home page displaying movies
- Series page displaying TV shows
- Admin dashboard with movie/series counts
- Add movie and add series forms
- Route protection and role-based admin access

### Frontend stack

- `react`
- `react-router-dom`
- `axios`
- `react-bootstrap`
- `bootstrap`
- `vite`
- `tailwindcss` (installed in project dependencies)

### Routes

- `/` → Login
- `/register` → Register
- `/home` → Home (protected)
- `/viewseries` → Series (protected)
- `/about` → About Us (protected)
- `/admin` → Admin panel (protected, only for Admin role)
- `/addseries` → Add Series form (protected)
- `/editseries` → Edit Series page (protected)
- `/movies` → Add Movies page (protected)
- `/edit` → Edit Movies page (protected)

### API Integration

The frontend calls the backend API using Axios and the `VITE_API_URL` environment variable.

### Example frontend `.env`

Create a `.env` file inside `frontend/` with:

```env
VITE_API_URL=http://localhost:5000
```

## How to Run

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. The backend listens on `http://localhost:5000` by default.

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `frontend/.env` with `VITE_API_URL=http://localhost:5000`
4. Start the frontend app:
   ```bash
   npm run dev
   ```

## Authentication Flow

- `Register` stores a new user in the database and returns a JWT.
- `Login` validates credentials and returns a JWT with `username` and `role`.
- The React app saves `token`, `username`, and `role` in `localStorage`.
- `ProtectedRoutes` redirects users to login if no token is present.
- The admin dashboard also checks `role === "Admin"` before rendering.

## Notes

- The backend does not include a `start` script in `package.json`, so use `node server.js`.
- The backend uses MySQL and requires the configured database to exist.
- The frontend uses `axios` to fetch data from the backend.

## Helpful files

- `backend/server.js` - Express server entrypoint
- `backend/routes/authRoutes.js` - Auth route definitions
- `backend/routes/movieRoutes.js` - Movie route definitions
- `backend/routes/seriesRoutes.js` - Series route definitions
- `backend/controllers/*Controller.js` - CRUD and auth logic
- `frontend/src/App.jsx` - React router configuration
- `frontend/src/utils/ProtectedRoutes.jsx` - Route protection logic
- `frontend/src/Mycomponent/Login.jsx` - Login screen
- `frontend/src/Mycomponent/Register.jsx` - Registration screen
- `frontend/src/Mycomponent/Admin.jsx` - Admin panel
- `frontend/src/Mycomponent/Home.jsx` - Movies page
- `frontend/src/Mycomponent/Series.jsx` - Series page
