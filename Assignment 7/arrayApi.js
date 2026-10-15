
const express = require("express");

const app = express();

app.use(express.json());

let students = [
    { id: 101, name: "Rohit", marks: 88 },
    { id: 102, name: "Ayush", marks: 94 },
    { id: 103, name: "Sarvadny", marks: 91 }
];

// GET - Display all students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST - Add a new student
app.post("/students", (req, res) => {
    const newStudent = req.body;

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update a student
app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (student) {
        student.name = req.body.name;
        student.marks = req.body.marks;

        res.json({
            message: "Student updated successfully",
            student: student
        });
    } else {
        res.status(404).send("Student not found");
    }
});

// DELETE - Delete a student


app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);

    students = students.filter(student => student.id !== id);

    res.send("Student deleted successfully");
});



// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
