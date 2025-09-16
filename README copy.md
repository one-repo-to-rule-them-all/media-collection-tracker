# Book & Media Collection Tracker

## Overview

This is a full-stack project to manage your personal collection of books, movies, and games. It is a complete end-to-end application with:

* **Backend:** FastAPI with CRUD API endpoints
* **Database:** SQLite for storing media items
* **Frontend:** React (planned) to display and manage your collection
* **Testing:** Unit and integration tests using pytest
* **Automation:** npm scripts for running backend and frontend together
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

### 2. Set up Python environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r backend/requirements.txt
```

### 3. Initialize the database

```bash
python backend/database_setup.py
```

### 4. Run the project using npm

```bash
npm install
npm run start  # Runs backend and frontend together
```

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
* npm scripts include a `prestart` script to install backend dependencies automatically

## Final Remarks

This project demonstrates modern software engineering practices:

* Full-stack application structure
* Clean folder organization
* Automated testing
* Documentation and setup automation
* Easily extensible for updates, deletes, or cloud deployment
