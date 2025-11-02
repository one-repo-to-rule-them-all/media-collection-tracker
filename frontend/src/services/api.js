const BASE_URL = "http://127.0.0.1:8000"; // Backend URL

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

  console.log("Sending payload:", payload); // 👀 Debugging line

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


