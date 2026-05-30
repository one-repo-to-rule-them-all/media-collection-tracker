// Override via REACT_APP_API_BASE in frontend/.env or your shell to point at a non-default backend.
const BASE_URL = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000";

export async function fetchItems() {
  const response = await fetch(`${BASE_URL}/items`);
  if (!response.ok) throw new Error("Failed to fetch items");
  return await response.json();
}

export async function addItem(item) {
  const payload = {
    title: item.title,
    creator: item.creator || "unknown",
    category: item.category,
    status: item.status || "unread",
  };

  console.log("Sending payload:", payload);

  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to add item: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

export async function updateItem(id, partial) {
  const response = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partial),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to update item: ${JSON.stringify(error)}`);
  }

  return await response.json();
}

export async function deleteItem(id) {
  const response = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to delete item: ${JSON.stringify(error)}`);
  }

  return await response.json();
}
