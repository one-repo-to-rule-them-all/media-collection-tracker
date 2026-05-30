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
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      await deleteItem(id);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Media Collection Tracker Prototype</h1>

      <AddItemForm onItemAdded={loadItems} />

      <ItemList
        items={items}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
