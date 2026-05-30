import React, { useEffect, useState } from "react";
import { fetchItems, updateItem, deleteItem } from "./services/api";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

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

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateItem(id, { status: newStatus });
      await loadItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await deleteItem(id);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen text-neutral-900">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-8 py-5 flex items-baseline justify-between">
          <h1 className="text-base font-semibold tracking-tight">
            Media Collection
          </h1>
          <span className="text-xs text-neutral-500 tabular-nums">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-10 space-y-6">
        <section className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-neutral-900 mb-5">
            Add item
          </h2>
          <AddItemForm onItemAdded={loadItems} />
        </section>

        <section className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
          <ItemList
            items={items}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}
