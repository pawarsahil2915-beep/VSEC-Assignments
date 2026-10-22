
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API = "http://localhost:5000/api/items";

function ReportItem() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "Lost",
    location: "",
    contact: ""
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit report.");
      }

      navigate("/items", {
        state: { message: "Report submitted successfully!" }
      });
    } catch (error) {
      setMessage(error.message || "Unable to connect to backend.");
    }
  }

  return (
    <main className="card">
      <h2>Report an Item</h2>
      <p>Enter the details of the lost or found item.</p>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Black wallet"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the item"
          required
        />

        <label>Report Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <label>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. College library"
          required
        />

        <label>Contact Information</label>
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Phone or email"
          required
        />

        <button type="submit">Submit Report</button>
      </form>

      <p><Link to="/">Back to Home</Link></p>
    </main>
  );
}

export default ReportItem;
