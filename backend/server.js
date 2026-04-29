const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Helper functions
function getTasks() {
    return JSON.parse(fs.readFileSync("./data/tasks.json"));
}

function saveTasks(tasks) {
    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2));
}

// TEST ROUTE (important)
app.get("/", (req, res) => {
    res.send("Server is working");
});

// GET all tasks
app.get("/tasks", (req, res) => {
    const tasks = getTasks();
    res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
    const tasks = getTasks();

    const newTask = {
        id: Date.now(),
        task: req.body.task,
        completed: false,
        priority: req.body.priority || "low",
        createdAt: req.body.createdAt
    };

    tasks.push(newTask);
    saveTasks(tasks);

    res.json({ message: "Task added" });
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);

    saveTasks(tasks);

    res.json({ message: "Task deleted" });
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let tasks = getTasks();

    tasks = tasks.map(task =>
        task.id === id
            ? {
                ...task,
                task: req.body.task || task.task,
                completed: req.body.completed ?? task.completed
              }
            : task
    );

    saveTasks(tasks);

    res.json({ message: "Task updated" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});