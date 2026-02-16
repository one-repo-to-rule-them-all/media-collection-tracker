from fastapi.testclient import TestClient
from backend.main import app

#client = TestClient(app)

# Basic test to check if the API is running

def test_add_item(client):
    response = client.post("/items", json={
        "title": "Test Book",
        "creator": "Author",
        "category": "book",
        "status": "unread"
    })
    assert response.status_code == 200
    data = response.json()
    assert "id" in data

def test_get_items(client):
    response = client.get("/items")
    assert response.status_code == 200
    items = response.json()
    assert isinstance(items, list)
