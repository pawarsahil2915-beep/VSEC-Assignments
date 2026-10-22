
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);
let items;

// Test route
app.get("/", (req, res) => {
    res.send("Campus Lost & Found API is running");
});

// Get all items and search
app.get("/api/items", async (req, res) => {
    try {
        const search = req.query.search || "";
        const filter = {};

        if (search) {
            filter.title = {
                $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                $options: "i"
            };
        }

        const data = await items.find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch items" });
    }
});

// Report a lost or found item
app.post("/api/items", async (req, res) => {
    try {
        const { title, description, type, location, contact } = req.body;

        if (
            !title?.trim() ||
            !description?.trim() ||
            !location?.trim() ||
            !contact?.trim() ||
            !["Lost", "Found"].includes(type)
        ) {
            return res.status(400).json({
                message: "Please enter all required details"
            });
        }

        const item = {
            title: title.trim(),
            description: description.trim(),
            type,
            location: location.trim(),
            contact: contact.trim(),
            status: "Open",
            createdAt: new Date()
        };

        const result = await items.insertOne(item);

        res.status(201).json({
            ...item,
            _id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to report item" });
    }
});

// Mark an item as returned
app.patch("/api/items/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

        const result = await items.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "Returned" } }
        );

        if (!result.matchedCount) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item marked as returned" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update item" });
    }
});

// Delete an item
app.delete("/api/items/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid item ID" });
        }

        const result = await items.deleteOne({
            _id: new ObjectId(id)
        });

        if (!result.deletedCount) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item" });
    }
});

// Connect to MongoDB and start server
async function startServer() {
    try {
        await client.connect();

        const db = client.db("campus_lost_found");
        items = db.collection("items");

        await db.command({ ping: 1 });
        console.log("MongoDB connected successfully");

        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running on port 5000");
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
