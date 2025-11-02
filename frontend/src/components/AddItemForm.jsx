import React, { useState } from "react";
import { addItem } from "../services/api"; // Import API helper function that handles POST requests to backend

// ✅ Functional component for adding a new media item (book, movie, game, etc.)
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
      // (parent might re-fetch the list of items)
      onItemAdded?.();

      // Reset form fields after successful submission
      setTitle("");
      setCreator("");
      setCategory("");
      setStatus("");
    } catch (error) {
      // Catch any network or backend errors
      console.error("Error adding item:", error);
    }
  };

  return (
    // Form wrapper: handles submission and groups all inputs
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* --- Title Input --- */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update local state on input change
        required // Prevent submission if empty
        className="border rounded p-2 w-full"
      />

      {/* --- Creator Input (author, director, etc.) --- */}
      <input
        type="text"
        placeholder="Creator (Author/Director)"
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
        required
        className="border rounded p-2 w-full"
      />

      {/* --- Category Dropdown --- */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)} // Update category selection
        required
        className="border rounded p-2 w-full"
      >
        <option value="">Select Category</option>
        <option value="Book">Book</option>
        <option value="Movie">Movie</option>
        <option value="Game">Game</option>
      </select>

      {/* --- Status Dropdown (reading/watching progress) --- */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)} // Update status selection
        required
        className="border rounded p-2 w-full"
      >
        <option value="">Status</option>
        <option value="Unread">Unread / Not Watched</option>
        <option value="Read">Read / Watched</option>
        <option value="In-progress">In Progress</option>
        <option value="Wishlist">Wishlist</option>
      </select>

      {/* --- Submit Button --- */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
}
