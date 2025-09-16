import sqlite3
import tempfile
import os
from backend.main import app
from fastapi.testclient import TestClient

#client = TestClient(app)

# Integration test to check database operations
# we can also use pytest fixtures for setup/teardown if needed
def test_database_insert_and_retrieve():
    # Create a temp DB
    db_fd, db_path = tempfile.mkstemp()
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("""
        CREATE TABLE items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            author TEXT,
            media_type TEXT
        )
        """)
        conn.commit()

        # Insert sample item
        cursor.execute("INSERT INTO items (title, author, media_type) VALUES (?, ?, ?)",
                       ("Integration Test Book", "Tester", "Book"))
        conn.commit()

        # Retrieve it
        cursor.execute("SELECT * FROM items WHERE title=?", ("Integration Test Book",))
        row = cursor.fetchone()
        assert row is not None
        assert row[1] == "Integration Test Book"
    finally:
        conn.close()
        os.close(db_fd)
        os.remove(db_path)
