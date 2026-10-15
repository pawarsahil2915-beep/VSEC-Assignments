import React from "react";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api/tasks";
const subjects = ["DSA", "Web Development", "DBMS", "Operating Systems", "Java", "Other"];
const priorities = ["Low", "Medium", "High"];

const demoTasks = [
  { _id: "demo-1", title: "Revise React components and props", subject: "Web Development", dueDate: "2026-10-12", priority: "High", completed: false },
  { _id: "demo-2", title: "Practice SQL joins", subject: "DBMS", dueDate: "2026-10-13", priority: "Medium", completed: false },
  { _id: "demo-3", title: "Review stack and queue", subject: "DSA", dueDate: "2026-10-10", priority: "High", completed: true }
];

function todayString() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "No date";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short"
  });
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subject: "Web Development",
    dueDate: todayString(),
    priority: "Medium"
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All tasks");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  async function loadTasks() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API unavailable");
      const data = await response.json();
      setTasks(data);
      setConnected(true);
      setMessage("");
    } catch {
      setTasks(demoTasks);
      setConnected(false);
      setMessage("Preview mode: start the backend and MongoDB to save your own tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const visibleTasks = useMemo(() => {
    const term = search.toLowerCase().trim();
    return tasks.filter(task => {
      const matchesSearch = `${task.title} ${task.subject}`.toLowerCase().includes(term);
      const matchesFilter =
        filter === "All tasks" ||
        (filter === "Pending" && !task.completed) ||
        (filter === "Completed" && task.completed);
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function addTask(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not save task.");
      setTasks(current => [data, ...current.filter(task => !String(task._id).startsWith("demo-"))]);
      setForm({ title: "", subject: "Web Development", dueDate: todayString(), priority: "Medium" });
      setMessage("Task added to your study plan!");
    } catch {
      setMessage("Couldn't save task. Start MongoDB and the backend, then try again.");
    }
  }

  async function toggleTask(task) {
    if (String(task._id).startsWith("demo-")) {
      setMessage("Demo tasks are examples. Connect MongoDB to save changes.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed })
      });
      if (!response.ok) throw new Error("Update failed");
      const updated = await response.json();
      setTasks(current => current.map(item => item._id === updated._id ? updated : item));
      setMessage("");
    } catch {
      setMessage("Couldn't update task. Check the backend connection.");
    }
  }

  async function deleteTask(task) {
    if (String(task._id).startsWith("demo-")) {
      setMessage("Demo tasks cannot be deleted. Connect MongoDB to manage saved tasks.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/${task._id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      setTasks(current => current.filter(item => item._id !== task._id));
      setMessage("Task deleted.");
    } catch {
      setMessage("Couldn't delete task. Check the backend connection.");
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <a className="logo" href="#home"><span className="logo-icon">s.</span><span>StudySprint<small>YOUR STUDY SPACE</small></span></a>
        <div className="side-label">WORKSPACE</div>
        <a className="side-link active" href="#home"><span>▦</span> My dashboard</a>
        <a className="side-link" href="#task-form"><span>＋</span> Add a study task</a>
        <div className="sidebar-bottom">
          <div className="focus-card"><span className="focus-spark">✳</span><h3>Small steps,<br />big progress.</h3><p>A little study every day adds up.</p></div>
          <div className={`connection ${connected ? "online" : ""}`}><span></span>{connected ? "Database connected" : "Preview mode"}</div>
        </div>
      </aside>

      <main className="main" id="home">
        <header className="topbar">
          <div><p className="date-line">YOUR PERSONAL STUDY SPACE</p><h1>Good day, learner <span>✳</span></h1></div>
          <div className="profile"><div className="profile-avatar">S</div><div><b>Student</b><small>Keep it consistent</small></div></div>
        </header>

        <section className="welcome">
          <div><span className="welcome-tag">A FRESH START</span><h2>Make today <em>count.</em></h2><p>One task at a time. You're building your future.</p></div>
          <div className="welcome-art"><div className="sun">☼</div><div className="book book-back"></div><div className="book book-front"><span>STUDY<br />GROW<br />REPEAT</span></div><span className="art-star">✦</span></div>
        </section>

        <section className="stats">
          <article className="stat-card"><div className="stat-icon lime">▤</div><p>Total tasks</p><strong>{tasks.length}</strong><small>In your study plan</small></article>
          <article className="stat-card"><div className="stat-icon peach">◷</div><p>Still to do</p><strong>{pendingCount}</strong><small>Keep moving forward</small></article>
          <article className="stat-card"><div className="stat-icon lavender">✓</div><p>Completed</p><strong>{completedCount}</strong><small>Every win counts</small></article>
          <article className="stat-card progress-card"><div className="progress-ring" style={{ "--progress": `${progress}%` }}><span>{progress}%</span></div><p>Overall progress</p><small>You're getting there!</small></article>
        </section>

        <section className="task-area">
          <div className="task-list-panel">
            <div className="section-title"><div><p className="section-kicker">STAY ON TRACK</p><h2>Your study tasks</h2></div><span className="task-count">{visibleTasks.length} shown</span></div>
            <div className="task-tools">
              <div className="search"><span>⌕</span><input aria-label="Search tasks" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search your tasks..." /></div>
              <select aria-label="Filter tasks" value={filter} onChange={event => setFilter(event.target.value)}><option>All tasks</option><option>Pending</option><option>Completed</option></select>
            </div>

            {loading ? <div className="empty"><p>Loading your study plan…</p></div> : visibleTasks.length === 0 ? (
              <div className="empty"><span>✳</span><h3>No tasks found</h3><p>Add a task or try a different search.</p></div>
            ) : (
              <div className="task-list">
                {visibleTasks.map(task => (
                  <article className={`task-row ${task.completed ? "is-complete" : ""}`} key={task._id}>
                    <button className={`check ${task.completed ? "checked" : ""}`} onClick={() => toggleTask(task)} aria-label={task.completed ? "Mark as pending" : "Mark as completed"}>{task.completed ? "✓" : ""}</button>
                    <div className="task-main"><h3>{task.title}</h3><div className="task-meta"><span className="subject-dot"></span>{task.subject}<span className="meta-divider">·</span><span>Due {formatDate(task.dueDate)}</span></div></div>
                    <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <button className="delete" onClick={() => deleteTask(task)} aria-label={`Delete ${task.title}`} title="Delete task">×</button>
                  </article>
                ))}
              </div>
            )}
            <p className="list-note"><span>✦</span> Progress isn't about perfection — just showing up.</p>
          </div>

          <aside className="add-panel" id="task-form">
            <div className="add-heading"><span className="add-symbol">＋</span><p className="section-kicker">PLAN YOUR NEXT WIN</p><h2>Add a task</h2><p>Make your next study session count.</p></div>
            <form onSubmit={addTask}>
              <label htmlFor="title">Task name</label>
              <input id="title" name="title" value={form.title} onChange={updateForm} placeholder="e.g. Revise binary trees" maxLength="100" required />
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" value={form.subject} onChange={updateForm}>{subjects.map(subject => <option key={subject}>{subject}</option>)}</select>
              <label htmlFor="dueDate">Due date</label>
              <input id="dueDate" name="dueDate" type="date" min={todayString()} value={form.dueDate} onChange={updateForm} required />
              <label htmlFor="priority">Priority</label>
              <div className="priority-options">{priorities.map(priority => <button type="button" key={priority} className={`priority-choice ${form.priority === priority ? `selected selected-${priority.toLowerCase()}` : ""}`} onClick={() => setForm({ ...form, priority })}>{priority}</button>)}</div>
              <button className="add-button" type="submit">Add to my plan <span>↗</span></button>
            </form>
            {message && <p className="message" role="status">{message}</p>}
          </aside>
        </section>
        <footer><span>StudySprint <b>·</b> Your progress, your pace.</span><span>Made for focused minds ♡</span></footer>
      </main>
    </div>
  );
}

export default App;
