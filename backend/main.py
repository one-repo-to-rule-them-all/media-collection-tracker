from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os
from typing import Optional
import logging

# --------------------------
# Setup logging
# --------------------------
logger = logging.getLogger("uvicorn.error")


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
    logger.debug(f"Opening database connection to {DB_PATH}")
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
    logger.info("Home endpoint called")
    return {"message": "Welcome to the Media Collection Tracker API, lets!"}

# Get all items
@app.get("/items")
def get_items():
    logger.info("Fetching all media items available\n")
    conn = get_db_connection()
    items = conn.execute("SELECT * FROM media_items").fetchall()
    conn.close()
    results = [dict(row) for row in items]
    logger.debug(f"Fetched {len(results)} items")
    return results

# Add a new item
@app.post("/items")
def add_item(item: MediaItem):
    logger.info(f"Adding new item(S): {item.dict()}\n")
    conn = get_db_connection()
    cursor = conn.cursor()
    creator_value = item.creator if item.creator else "Unknown"
    cursor.execute(
        "INSERT INTO media_items (title, creator, category, status) VALUES (?, ?, ?, ?)",
        (item.title, creator_value, item.category, item.status),
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    logger.debug(f"Added item with ID: {new_id}\n")
    return {"message": "Item added successfully!", "id": new_id}

# Update an item
@app.put("/items/{item_id}")
def update_item(item_id: int, item: MediaItemUpdate):
    logger.info(f"Updating item {item_id} with data: {item.dict(exclude_unset=True)}\n")
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if item exists
    existing = cursor.execute("SELECT * FROM media_items WHERE id = ?", (item_id,)).fetchone()
    if not existing:
        logger.warning(f"Update failed: Item {item_id} not found\n")
        conn.close()
        raise HTTPException(status_code=404, detail="Item not found")

    # Update only fields that were provided
    update_fields = []
    values = []
    for field, value in item.dict(exclude_unset=True).items():
        update_fields.append(f"{field} = ?")
        values.append(value)

    if not update_fields:
        logger.warning(f"No update fields provided for item {item_id}\n")
        conn.close()
        raise HTTPException(status_code=400, detail="No fields provided for update")

    values.append(item_id)
    sql = f"UPDATE media_items SET {', '.join(update_fields)} WHERE id = ?"
    cursor.execute(sql, values)
    conn.commit()
    conn.close()

    logger.info(f"Item {item_id} updated successfully\n")
    return {"message": f"Item {item_id} updated successfully"}

# Delete an item
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    logger.info(f"Deleting item {item_id}\n")
    conn = get_db_connection()
    cursor = conn.cursor()

    existing = cursor.execute("SELECT * FROM media_items WHERE id = ?", (item_id,)).fetchone()
    if not existing:
        logger.warning(f"Delete failed: Item {item_id} not found\n")
        conn.close()
        raise HTTPException(status_code=404, detail="Item not found")

    cursor.execute("DELETE FROM media_items WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()

    logger.info(f"Item {item_id} deleted successfully\n")
    return {"message": f"Item {item_id} deleted successfully"}
