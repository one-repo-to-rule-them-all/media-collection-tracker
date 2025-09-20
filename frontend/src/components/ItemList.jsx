function ItemList({ items }) {
  return (
    <div style={{ padding: "1rem" }}>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.title} ({item.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
