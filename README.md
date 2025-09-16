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
book-tracker/
│-- main.py              # FastAPI backend with full CRUD
│-- database_setup.py    # Creates SQLite database and table
│-- media.db             # SQLite database file
│-- test_main.py         # Automated tests for CRUD operations
│-- README.md            # Project documentation
│-- venv/                # Virtual environment (optional)
```

---

## 🔧 Setup Instructions

### 1. Clone or Create Project
```bash
mkdir book-tracker
cd book-tracker
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```
Activate:
- **Windows (PowerShell):** `.env\Scriptsctivate`  
- **Mac/Linux (bash/zsh):** `source venv/bin/activate`

### 3. Install Dependencies
```bash
pip install fastapi uvicorn pytest
```

### 4. Setup Database
```bash
python database_setup.py
```

### 5. Run Backend Server
```bash
uvicorn main:app --reload
```
- API root: [http://127.0.0.1:8000](http://127.0.0.1:8000)  
- API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🔍 Example Usage

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

### Get All Items
GET `/items`  
Response:
```json
[
  {
    "id": 1,
    "title": "The Hobbit",
    "creator": "J.R.R. Tolkien",
    "category": "book",
    "status": "unread",
    "created_at": "2025-09-16 12:34:56"
  }
]
```

### Update Item
PUT `/items/{id}`  
```json
{
  "status": "completed"
}
```

### Delete Item
DELETE `/items/{id}`

---

## 🧪 Testing the Backend

1. Ensure your virtual environment is active (`(venv)` should appear in terminal).  
2. Install pytest if not already installed:  
```bash
pip install pytest
```  
3. Run tests with:  
```bash
pytest -v
```  
Tests cover:
- Adding an item
- Reading items
- Updating an item
- Deleting an item
- Edge cases (e.g., deleting non-existent items)

---

## 📌 Next Steps
- Build React frontend to interact with API visually
- Add filtering/searching in frontend
- Deploy to cloud for remote access

---

## 👨‍💻 Author
Developed by **Rodolfo Baez Jr** (RBJ Engineering Services LLC)  
📧 rbjengineeringservices.llc@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/rodolfo-baez-jr-8b9830b0/)
