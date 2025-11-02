Here’s an updated version of your README, keeping all original content, but reflecting that the frontend is now completed with validation and minor tweaks for clarity and accuracy:

---

# 📚 Book/Media Collection Tracker

A beginner-friendly **full-stack project** to track books, movies, and games.
This project demonstrates the use of **FastAPI (backend)**, **SQLite (database)**, and a **React frontend** with form validation.

---

## 🚀 Features

* Add new items (book, movie, or game) with **validated fields**
* View all items in the collection
* Track status (`unread`, `in-progress`, `read/watched`, `wishlist`)
* Full CRUD support (Create, Read, Update, Delete)
* SQLite database storage
* Auto-generated API docs with FastAPI
* Frontend form validation to prevent empty required fields
* Basic automated tests with pytest

---

## 🛠️ Tech Stack

* **Backend:** FastAPI (Python)
* **Database:** SQLite
* **Frontend:** React + Tailwind CSS
* **Server:** Uvicorn
* **Testing:** pytest

---

## 📂 Project Structure

```
media-collection-tracker/
│-- backend/
│   │-- main.py
│   │-- requirements.txt
│-- database/
│   │-- media.db
│   │-- database_setup.py
│-- frontend/
│   │-- package.json
│   │-- src/
│       │-- App.jsx
│       │-- index.jsx
│       │-- components/
│           │-- AddItemForm.jsx   # frontend form with validation
│-- tests/
│   │-- test_main.py
│-- package.json
│-- prestart.py
│-- README.md
```

---

## 🔧 Setup Instructions

### 1. Clone or Create Project

```bash
git clone git@github.com:one-repo-to-rule-them-all/media-collection-tracker.git
cd media-collection-tracker
```

### 2. Ensure Python and Node.js are installed

* Python 3.x (with pip)
* Node.js and npm

### 3. Run the project using npm

```bash
npm run start     # Automatically sets up backend, database, and starts frontend + backend
```

✅ The `prestart` script will:

1. Install Python backend dependencies if not already installed.
2. Initialize the SQLite database if missing.
3. Seed the database with sample data if the table is empty.
4. Install frontend dependencies automatically.

No manual Python environment setup is required beyond having Python installed.

---

## 🔍 API Usage

```bash
- API root: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
- API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
```

### Add New Item

POST `/items`

```json
{
  "title": "The Hobbit",
  "creator": "J.R.R. Tolkien",
  "category": "book",
  "status": "unread"
}
```

### Update Item

PUT `/items/{id}`

```json
{
  "status": "read"
}
```

---

## 🧪 Testing the Backend

1. In a bash terminal, ensure your virtual environment is active (`(venv)` should appear in terminal).

```bash
cd tests
python3 -m venv venv
venv\Scripts\active or 
source venv/Scripts/activate
```
2. Install pytest if not already installed, else skip step:

```bash
pip install pytest
```

3. Run tests with:

```bash
npm run tests
```

4. Run specific test with:

```bash
pytest -v 
pytest -v test_database.py
pytest -v test_main.py
```

Tests cover:

* Adding an item
* Reading items
* Updating an item
* Deleting an item
* Edge cases (e.g., deleting non-existent items)

---

## Notes

* Backend automatically uses the SQLite database in `database/media.db`
* Frontend (React) is now fully functional and validates required fields (`title`, `creator`, `category`, `status`) before submission
* npm scripts include a `prestart` script to automatically install backend dependencies, populate database, and install frontend dependencies
* Frontend and backend are run concurrently via `npm run start`, if making changes you should just run `npm run backend` and `npm run frontend` in their own bash terminal

✅ Tip: Always activate the virtual environment before running backend scripts, e.g., python prestart.py or uvicorn main:app --reload.
---

## 📌 Next Steps

* Add filtering/searching in frontend
* Add more detailed status options if needed (e.g., “Not Started”, “In Progress”, “Completed”, “Wishlist”)
* Add update and delete capability in frontend
* Add logic to not allow duplicate entries
* Create a script to revert db back to original state
* Add frontend test using Jest/React Testing Library
* Use a config.py (backend) or .env file for environment-specific settings
* In python: from dotenv import load_doteng
* In React: .env with REACT_APP_API_BASE=http://127.0.0.1:8000
* Setup docker containerization
* Deploy to cloud for remote access

---

## Final Remarks

This project demonstrates modern software engineering practices:

* Full-stack application structure
* Clean folder organization
* Automated testing
* Documentation and setup automation
* Easily extensible for updates, deletes, or cloud deployment

---

## 👨‍💻 Author

Developed by **Rodolfo Baez Jr** (RBJ Engineering Services LLC)
📧 [rbjengineeringservices.llc@gmail.com](mailto:rbjengineeringservices.llc@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/rodolfo-baez-jr-8b9830b0/)