"""Unit tests for backend.main."""
import sys
from pathlib import Path

# Add repo root to path so `backend` is importable.
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.main import home


def test_home_basic():
    """Test basic functionality of home."""
    result = home()
    assert result == {"message": "Welcome to the Media Collection Tracker API!"}
