# tests/conftest.py
import os
import sqlite3
import tempfile

import pytest
from _pytest.monkeypatch import MonkeyPatch
from fastapi.testclient import TestClient

from backend import main as backend_main
from database import database_setup
from database.database_setup import create_db


@pytest.fixture(scope="session", autouse=True)
def initialize_test_database():
    """Point the app at a fresh temporary SQLite DB for the whole test session.

    Monkeypatches BOTH `backend.main.DB_PATH` and
    `database.database_setup.DB_PATH` BEFORE calling `create_db()`, so no
    test ever touches the production `database/media.db`.
    """
    mp = MonkeyPatch()
    fd, temp_db_path = tempfile.mkstemp(prefix="media_test_", suffix=".db")
    os.close(fd)  # We just need the path; sqlite will manage the file handle.

    try:
        mp.setattr(backend_main, "DB_PATH", temp_db_path)
        mp.setattr(database_setup, "DB_PATH", temp_db_path)

        create_db()
        yield temp_db_path
    finally:
        mp.undo()
        try:
            os.remove(temp_db_path)
        except OSError:
            # File may already be gone; nothing to clean up.
            pass


@pytest.fixture(autouse=True)
def _truncate_media_items(initialize_test_database):
    """Ensure each test starts with an empty `media_items` table.

    Prevents row leakage between tests in the shared session-scoped DB.
    """
    yield
    conn = sqlite3.connect(initialize_test_database)
    try:
        conn.execute("DELETE FROM media_items")
        # Reset AUTOINCREMENT so IDs are predictable across tests.
        conn.execute("DELETE FROM sqlite_sequence WHERE name='media_items'")
        conn.commit()
    finally:
        conn.close()


@pytest.fixture
def client():
    return TestClient(backend_main.app)
