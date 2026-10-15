const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function startServer() {
    try {
        await client.connect();

        const db = client.db("CollegeDB");
        const studentCollection = db.collection("studentRecords");

        console.log("Connected to MongoDB successfully");

        // GET - Display all students
        app.get("/students", async (req, res) => {
            const records = await studentCollection.find().toArray();
            res.json(records);
        });

        // POST - Add a new student
        app.post("/students", async (req, res) => {
            const result = await studentCollection.insertOne(req.body);

            res.status(201).json({
                message: "Student record inserted successfully",
                insertedId: result.insertedId
            });
        });

        // PUT - Update student details
        app.put("/students/:name", async (req, res) => {
            const result = await studentCollection.updateOne(
                { name: req.params.name },
                { $set: req.body }
            );

            if (result.matchedCount === 0) {
                return res.status(404).json({
                    message: "Student record not found"
                });
            }

            res.json({
                message: "Student record updated successfully"
            });
        });

        // DELETE - Remove a student
        app.delete("/students/:name", async (req, res) => {
            const result = await studentCollection.deleteOne({
                name: req.params.name
            });

            if (result.deletedCount === 0) {
                return res.status(404).json({
                    message: "Student record not found"
                });
            }

            res.json({
                message: "Student record deleted successfully"
            });
        });

        // Start the server
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
}

startServer();