from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os
from typing import Optional

# Ensure the database directory exists
os.makedirs("database", exist_ok=True)

# --------------------------
# Database setup
# --------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "../database/media.db")
#DB_PATH = os.path.join(BASE_DIR, "../backend/database/media.db")

# ============================
# Database Helper
# ============================
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# --------------------------
# FastAPI app setup
# --------------------------
app = FastAPI(title="Book/Media Collection Tracker")


# Allow your frontend (React dev server runs on http://localhost:5173 by default for Vite, 
# or http://localhost:3000 for CRA)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] for everything
    allow_credentials=True,
    allow_methods=["*"],     # allows GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],
)

# ============================
# Pydantic Model (for validation)
# ============================
class MediaItem(BaseModel):
    title: str
    creator: Optional[str] = ""  # author/director/etc.
    category: str  # "book", "movie", "game"
    status: str = "unread"  # default

class MediaItemUpdate(BaseModel):
    title: Optional[str] = None
    creator: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None

# ============================
# Routes
# ============================

@app.get("/")
def home():
    return {"message": "Welcome to the Media Collection Tracker API!"}

# Get all items
@app.get("/items")
def get_items():
    conn = get_db_connection()
    items = conn.execute("SELECT * FROM media_items").fetchall()
    conn.close()
    return [dict(row) for row in items]

# Add a new item
@app.post("/items")
def add_item(item: MediaItem):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO media_items (title, creator, category, status) VALUES (?, ?, ?, ?)",
        (item.title, item.creator, item.category, item.status),
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"message": "Item added successfully!", "id": new_id}

# Update an item
@app.put("/items/{item_id}")
def update_item(item_id: int, item: MediaItemUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if item exists
    existing = cursor.execute("SELECT * FROM media_items WHERE id = ?", (item_id,)).fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Item not found")

    # Update only fields that were provided
    update_fields = []
    values = []
    for field, value in item.dict(exclude_unset=True).items():
        update_fields.append(f"{field} = ?")
        values.append(value)

    if not update_fields:
        conn.close()
        raise HTTPException(status_code=400, detail="No fields provided for update")

    values.append(item_id)
    sql = f"UPDATE media_items SET {', '.join(update_fields)} WHERE id = ?"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    return {"message": f"Item {item_id} updated successfully"}

# Delete an item
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    existing = cursor.execute("SELECT * FROM media_items WHERE id = ?", (item_id,)).fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Item not found")

    cursor.execute("DELETE FROM media_items WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()

    return {"message": f"Item {item_id} deleted successfully"}
