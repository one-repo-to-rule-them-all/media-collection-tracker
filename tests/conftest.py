# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from backend.main import app
from database.database_setup import create_db


@pytest.fixture(scope="session", autouse=True)
def initialize_test_database():
    """Ensure the app database schema exists before API tests run."""
    create_db()


@pytest.fixture
def client():
    return TestClient(app)
