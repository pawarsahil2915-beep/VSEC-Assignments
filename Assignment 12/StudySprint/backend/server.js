const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Task = require("./models/Task");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Quick check to confirm the backend is alive.
app.get("/api/health", (req, res) => {
  res.json({ message: "StudySprint API is running" });
});

// Read all tasks, newest first.
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Could not load tasks." });
  }
});

// Create a task.
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, subject, dueDate, priority } = req.body;

    if (![title, subject, dueDate, priority].every(
      value => typeof value === "string" && value.trim()
    )) {
      return res.status(400).json({ message: "Please fill in every field." });
    }

    const task = await Task.create({
      title: title.trim(),
      subject,
      dueDate,
      priority
    });

    res.status(201).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Please check the task details." });
    }
    res.status(500).json({ message: "Could not save the task." });
  }
});

// Change a task's completed status.
app.patch("/api/tasks/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    if (typeof req.body.completed !== "boolean") {
      return res.status(400).json({ message: "completed must be true or false." });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found." });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Could not update the task." });
  }
});

// Delete a task.
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.json({ message: "Task deleted." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete the task." });
  }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studysprint";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`StudySprint API running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection failed. Check that MongoDB is running and MONGO_URI is correct.");
    console.error(error.message);
    process.exit(1);
  });
