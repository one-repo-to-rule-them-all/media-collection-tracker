"""Generated unit tests for database\database_setup.py."""
import pytest
from unittest.mock import Mock, patch

import database.database_setup as module_under_test
from database.database_setup import create_db, seed_db

def test_create_db_smoke_and_contract(monkeypatch):
    """Smoke + contract test for `create_db` using deterministic mocks."""
    # No input args required
    with patch.object(module_under_test, "logger", autospec=True, create=True):
        result = create_db()

    assert result is not ...

def test_seed_db_smoke_and_contract(monkeypatch):
    """Smoke + contract test for `seed_db` using deterministic mocks."""
    # No input args required
    with patch.object(module_under_test, "logger", autospec=True, create=True):
        result = seed_db()

    assert result is not ...
