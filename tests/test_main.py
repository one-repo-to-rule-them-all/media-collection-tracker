from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

# Basic test to check if the API is running
def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Media Collection Tracker API!"}
    
def test_add_item():
    response = client.post("/items", json={
        "title": "Test Book",
        "creator": "Author",
        "category": "book",
        "status": "unread"
    })
    assert response.status_code == 200
    data = response.json()
    assert "id" in data

def test_get_items():
    response = client.get("/items")
    assert response.status_code == 200
    items = response.json()
    assert isinstance(items, list)
