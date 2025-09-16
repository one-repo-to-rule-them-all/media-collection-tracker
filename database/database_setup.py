import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../database/media.db")
#DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../backend/database/media.db")
print(f"Database path: {DB_PATH}")

def create_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS media_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            creator TEXT NOT NULL,
            category TEXT NOT NULL,
            status TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()
    print("Database initialized.")

def seed_db():
    sample_items = [
        ("The Great Gatsby", "F. Scott Fitzgerald", "Book", "Unread"),
        ("Inception", "Christopher Nolan", "Movie", "Watched"),
        ("The Legend of Zelda: Breath of the Wild 1", "Nintendo", "Game", "Playing"),
        ("The Lord of The Rings", "J.R.R. Tokien", "Book", "Unread")
    ]
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Only insert if table is empty
    cursor.execute("SELECT COUNT(*) FROM media_items")
    if cursor.fetchone()[0] == 0:
        cursor.executemany(
            "INSERT INTO media_items (title, creator, category, status) VALUES (?, ?, ?, ?)",
            sample_items
        )
        conn.commit()
        print("Database seeded with sample data.")
    else:
        print("Database already has data. Skipping seeding.")
    conn.close()

if __name__ == "__main__":
    create_db()
    seed_db()
