# 📚 Book/Media Collection Tracker

A beginner-friendly **full-stack project** to track books, movies, and games.  
This project demonstrates the use of **FastAPI (backend)**, **SQLite (database)**, and later a **React frontend**.

---

## 🚀 Features
- Add new items (book, movie, or game)
- View all items in the collection
- Track status (`unread`, `in-progress`, `completed`)
- Full CRUD support (Create, Read, Update, Delete)
- SQLite database storage
- Auto-generated API docs with FastAPI
- Basic automated tests with pytest

---

## 🛠️ Tech Stack
- **Backend:** FastAPI (Python)
- **Database:** SQLite
- **Frontend (coming soon):** React + Tailwind CSS
- **Server:** Uvicorn
- **Testing:** pytest

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
│-- tests/
│   │-- test_main.py
│-- package.json
|-- prestart.py
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
  "status": "completed"
}
```

## 🧪 Testing the Backend

1. Ensure your virtual environment is active (`(venv)` should appear in terminal).  
2. Install pytest if not already installed, else skip step:  
```bash
cd tests
pip install pytest
```  
3. Run tests with:  
```bash
npm run test
```  
4. Run specific test with:
```bash
pytest -v 
pytest -v test_database.py
pytest -v test_main.py
```

Tests cover:
- Adding an item
- Reading items
- Updating an item
- Deleting an item
- Edge cases (e.g., deleting non-existent items)

---

## Notes

* Backend automatically uses the SQLite database in `database/media.db`
* Frontend (React) is configured to interact with the backend API
* npm scripts include a `prestart` script to automatically install backend dependencies and populate database

---

## 📌 Next Steps
- Build React frontend to interact with API visually
- Add filtering/searching in frontend
- Deploy to cloud for remote access

---

## Final Remarks

This project demonstrates modern software engineering practices:

* Full-stack application structure
* Clean folder organization
* Automated testing
* Documentation and setup automation
* Easily extensible for updates, deletes, or cloud deployment


## 👨‍💻 Author
Developed by **Rodolfo Baez Jr** (RBJ Engineering Services LLC)  
📧 rbjengineeringservices.llc@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/rodolfo-baez-jr-8b9830b0/)
