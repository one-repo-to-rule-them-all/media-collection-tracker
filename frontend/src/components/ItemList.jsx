import React from "react";

const STATUS_OPTIONS = [
  { value: "unread", label: "Unread" },
  { value: "in-progress", label: "In progress" },
  { value: "read", label: "Read" },
  { value: "wishlist", label: "Wishlist" },
];

const STATUS_LABEL = {
  unread: "Unread",
  "in-progress": "In progress",
  read: "Read",
  wishlist: "Wishlist",
};

const STATUS_STYLE = {
  unread: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  "in-progress": "bg-amber-50 text-amber-800 ring-amber-200",
  read: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  wishlist: "bg-blue-50 text-blue-800 ring-blue-200",
};

const STATUS_DOT = {
  unread: "bg-neutral-400",
  "in-progress": "bg-amber-500",
  read: "bg-emerald-500",
  wishlist: "bg-blue-500",
};

const CATEGORY_LABEL = {
  book: "Book",
  movie: "Movie",
  game: "Game",
};

const CATEGORY_STYLE = {
  book: "bg-neutral-100 text-neutral-700",
  movie: "bg-neutral-100 text-neutral-700",
  game: "bg-neutral-100 text-neutral-700",
};

export default function ItemList({ items, onStatusChange, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className="px-6 py-16 text-center">
        <p className="text-sm text-neutral-500">No items yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Title
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 w-32">
              Category
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 w-48">
              Status
            </th>
            <th className="px-5 py-3 w-20">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr
              key={item.id}
              className={`hover:bg-neutral-50/70 transition-colors ${
                idx !== items.length - 1 ? "border-b border-neutral-100" : ""
              }`}
            >
              <td className="px-5 py-4">
                <div className="font-medium text-neutral-900 leading-tight">
                  {item.title}
                </div>
                {item.creator && (
                  <div className="text-xs text-neutral-500 mt-0.5">
                    {item.creator}
                  </div>
                )}
              </td>
              <td className="px-5 py-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                    CATEGORY_STYLE[item.category] ||
                    "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {CATEGORY_LABEL[item.category] || item.category}
                </span>
              </td>
              <td className="px-5 py-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ring-1 ring-inset ${
                      STATUS_STYLE[item.status] || STATUS_STYLE.unread
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        STATUS_DOT[item.status] || STATUS_DOT.unread
                      }`}
                    />
                    {STATUS_LABEL[item.status] || item.status}
                  </span>
                  <select
                    aria-label={`Change status for ${item.title}`}
                    value={item.status}
                    onChange={(e) => onStatusChange?.(item.id, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onDelete?.(item.id)}
                  className="text-xs font-medium text-neutral-500 hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
