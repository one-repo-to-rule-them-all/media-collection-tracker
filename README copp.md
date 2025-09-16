# Book & Media Collection Tracker

## Overview

This is a full-stack project to manage your personal collection of books, movies, and games. It is a complete end-to-end application with:

* **Backend:** FastAPI with CRUD API endpoints
* **Database:** SQLite for storing media items
* **Frontend:** React (planned) to display and manage your collection
* **Testing:** Unit and integration tests using pytest
* **Automation:** npm scripts for running backend and frontend together, including automatic setup of dependencies and database
* **Documentation:** Complete README for setup and usage

## Project Structure

```
book-tracker/
│-- backend/
│   │-- main.py
│   │-- database_setup.py
│   │-- models.py (optional)
│   │-- crud.py (optional)
│   │-- requirements.txt
│-- frontend/
│   │-- package.json
│   │-- src/
│       │-- App.jsx
│       │-- index.jsx
│       │-- components/
│-- tests/
│   │-- test_main.py
│-- database/
│   │-- media.db
│-- prestart.py
│-- package.json
│-- README.md
│-- README_UPDATED.md
│-- venv/
```

## Setup Instructions

### 1. Clone the project

```bash
git clone <your-repo-url>
cd book-tracker
```

### 2. Ensure Python and Node.js are installed

* Python 3.x (with pip)
* Node.js and npm

### 3. Run the project using npm

```bash
npm install       # Install npm dependencies
npm run start     # Automatically sets up backend, database, and starts frontend + backend
```

✅ The `prestart` script will:

1. Install Python backend dependencies if not already installed.
2. Initialize the SQLite database if missing.
3. Seed the database with sample data if the table is empty.

No manual Python environment setup is required beyond having Python installed.

## API Usage

### Add a new item

```
POST /items
Body:
{
  "title": "The Great Gatsby",
  "creator": "F. Scott Fitzgerald",
  "category": "Book",
  "status": "Unread"
}
```

### Get all items

```
GET /items
```

## Testing

Run automated tests:

```bash
pytest -v tests/
```

* Unit tests for functions
* Integration tests for API endpoints

## Notes

* Backend automatically uses the SQLite database in `database/media.db`
* Frontend (React) is configured to interact with the backend API
* npm scripts include a `prestart` script to automatically install backend dependencies and populate database

## Final Remarks

This project demonstrates modern software engineering practices:

* Full-stack application structure
* Clean folder organization
* Automated testing
* Automated setup for dependencies and database seeding
* Easily extensible for updates, deletes, or cloud deployment

New users can clone the repository and run `npm run start` to have the entire environment ready with sample data.
