import React, { useState } from "react";
import { addItem } from "../services/api"; // Import API helper function that handles POST requests to backend

// Functional component for adding a new media item (book, movie, game, etc.)
export default function AddItemForm({ onItemAdded }) {
  // --- Local state for form fields ---
  const [title, setTitle] = useState("");       // Stores the title of the item
  const [creator, setCreator] = useState("");   // Stores the creator (author, director, etc.)
  const [category, setCategory] = useState(""); // Stores the selected category
  const [status, setStatus] = useState("unread"); // Stores the read/watch status
  const [errors, setErrors] = useState({});     // Stores validation messages (currently unused, but ready for future)

  // --- Handles form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing when the form is submitted
    console.log("Submitting item:", { title, creator, category, status });

    // Build a new item object that matches backend model
    const newItem = {
      title,
      creator,
      category,
      status,
    };

    try {
      // Send data to the backend via the API helper
      await addItem(newItem);
      console.log("Item added successfully");
      // Notify the parent component that a new item was added
      onItemAdded?.();

      // Reset form fields after successful submission
      setTitle("");
      setCreator("");
      setCategory("");
      setStatus("unread");
    } catch (error) {
      // Catch any network or backend errors
      console.error("Error adding item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* --- Title Input --- */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />

      {/* --- Creator Input (author, director, etc.) --- */}
      <input
        type="text"
        placeholder="Creator (Author/Director)"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        required
        className="form-input"
      />

      {/* --- Category Dropdown --- */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="form-select"
      >
        <option value="">Select Category</option>
        <option value="book">Book</option>
        <option value="movie">Movie</option>
        <option value="game">Game</option>
      </select>

      {/* --- Status Dropdown (reading/watching progress) --- */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
        className="form-select"
      >
        <option value="unread">Unread / Not Watched</option>
        <option value="read">Read / Watched</option>
        <option value="in-progress">In Progress</option>
        <option value="wishlist">Wishlist</option>
      </select>

      {/* --- Submit Button --- */}
      <button type="submit" className="btn-primary">
        Add Item
      </button>
    </form>
  );
}
