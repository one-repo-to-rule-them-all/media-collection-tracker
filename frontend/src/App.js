import React, { useEffect, useState } from "react";
import { fetchItems } from "./services/api";
import AddItemForm from "./components/AddItemForm";

export default function App() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Media Collection Tracker</h1>

      <AddItemForm onItemAdded={loadItems} />

      <ul className="mt-6 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="border p-2 rounded">
            <strong>{item.title}</strong> ({item.category}) - {item.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
