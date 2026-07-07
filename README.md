# DevFlow AI

DevFlow AI is a full-stack developer productivity platform built to help developers manage their projects, tasks, profile, and basic AI-assisted code explanation in one place.

This project was created as a fresher-level full-stack project to practice React, FastAPI, REST APIs, authentication, database operations, and frontend-backend integration.

## Project Tagline

The all-in-one AI-powered workspace for developers.

## Features

- User signup and login
- JWT-based authentication
- Dashboard with project and task statistics
- Create, view, and delete projects
- Create, view, update, and delete tasks
- Task priority and status management
- AI code explanation feature
- User profile update
- Frontend and backend integration using REST APIs

## Tech Stack

### Frontend

- React
- JavaScript
- React Router DOM
- Axios
- CSS

### Backend

- FastAPI
- Python
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib and bcrypt for password hashing

### Database

- SQLite for local development

## Folder Structure

```text
devflow-ai/
  backend/
    app/
      main.py
      database.py
      models.py
      schemas.py
      auth.py
      routes.py
    requirements.txt

  frontend/
    src/
      pages/
        Login.jsx
        Signup.jsx
        Dashboard.jsx
        Projects.jsx
        Tasks.jsx
        AIAssistant.jsx
        Profile.jsx
      services/
        api.js
      App.jsx
      main.jsx
      style.css
    package.json

  README.md
