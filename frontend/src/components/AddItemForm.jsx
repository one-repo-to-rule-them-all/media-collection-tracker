import React, { useState } from "react";
import { addItem } from "../services/api"; // using the API helper you already have

export default function AddItemForm({ onItemAdded }) {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("unread");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      title,
      creator: creator || null, // optional field
      category,
      status,
    };

    try {
      await addItem(newItem);
      onItemAdded?.(); // let parent refresh list
      setTitle("");
      setCreator("");
      setCategory("");
      setStatus("unread");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border rounded p-2 w-full"
      />

      <input
        type="text"
        placeholder="Creator (Author/Director)"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        className="border rounded p-2 w-full"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)} // 👈 onChange here
        required
        className="border rounded p-2 w-full"
      >
        <option value="">Select Category</option>
        <option value="book">Book</option>
        <option value="movie">Movie</option>
        <option value="game">Game</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
}
