
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API = "http://localhost:5000/api/items";

function ViewItems() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();

  async function getItems(searchText = "") {
    try {
      const response = await fetch(
        `${API}?search=${encodeURIComponent(searchText)}`
      );

      if (!response.ok) throw new Error("Could not load items.");

      setItems(await response.json());
    } catch (error) {
      setMessage("Unable to connect to backend.");
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  async function markReturned(id) {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "PATCH"
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed.");

      await getItems(search);
      setMessage("Item marked as returned.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteItem(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed.");

      await getItems(search);
      setMessage("Item deleted successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="card">
      <h2>Reported Items</h2>

      {message && <p className="message">{message}</p>}

      <input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          getItems(event.target.value);
        }}
        placeholder="Search by item name..."
      />

      {items.length === 0 ? (
        <p>No items found. Be the first to report one!</p>
      ) : (
        items.map((item) => (
          <div className="item" key={item._id}>
            <h3>{item.title}</h3>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Contact:</strong> {item.contact}</p>
            <p><strong>Status:</strong> {item.status}</p>

            {item.status === "Open" && (
              <button onClick={() => markReturned(item._id)}>
                Mark Returned
              </button>
            )}

            <button className="delete" onClick={() => deleteItem(item._id)}>
              Delete
            </button>
          </div>
        ))
      )}

      <Link className="button" to="/report">
        Report Another Item
      </Link>

      <p><Link to="/">Back to Home</Link></p>
    </main>
  );
}

export default ViewItems;
