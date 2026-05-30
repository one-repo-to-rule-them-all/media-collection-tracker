import React, { useState } from "react";
import { addItem } from "../services/api";

const inputClass =
  "w-full px-3 py-2 text-sm bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder-neutral-400 transition focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5";

const labelClass = "block text-xs font-medium text-neutral-600 mb-1.5";

export default function AddItemForm({ onItemAdded }) {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("unread");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addItem({ title, creator, category, status });
      onItemAdded?.();
      setTitle("");
      setCreator("");
      setCategory("");
      setStatus("unread");
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="creator" className={labelClass}>
            Creator
          </label>
          <input
            id="creator"
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Select…</option>
            <option value="book">Book</option>
            <option value="movie">Movie</option>
            <option value="game">Game</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className={inputClass}
          >
            <option value="unread">Unread</option>
            <option value="in-progress">In progress</option>
            <option value="read">Read</option>
            <option value="wishlist">Wishlist</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting ? "Adding…" : "Add item"}
        </button>
      </div>
    </form>
  );
}
