import React from "react";

const STATUS_OPTIONS = [
  { value: "unread", label: "Unread / Not Watched" },
  { value: "in-progress", label: "In Progress" },
  { value: "read", label: "Read / Watched" },
  { value: "wishlist", label: "Wishlist" },
];

export default function ItemList({ items, onStatusChange, onDelete }) {
  if (!items || items.length === 0) {
    return <p className="item-empty">No items found.</p>;
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id} className="item-row">
          <div className="item-info">
            <strong>{item.title}</strong> {item.creator} - ({item.category})
          </div>
          <div className="item-actions">
            <select
              className="form-select"
              value={item.status}
              onChange={(e) => onStatusChange(item.id, e.target.value)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn-danger"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
