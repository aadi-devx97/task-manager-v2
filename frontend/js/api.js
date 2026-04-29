const BASE_URL = "http://localhost:3000";
const TASKS_URL = `${BASE_URL}/tasks`;

function loadApiTasks() {
    const list = document.getElementById("apiList");
    list.innerHTML = "<p>Loading...</p>";
    fetch(TASKS_URL)
        .then(res => res.json())
        .then(data => {
            window.apiTasks = data;   // ⭐ store globally
            showAll();
        })
        .catch(err => console.log("Error:", err));
}

// ADD TASK
function sendTask() {
    const input = document.getElementById("taskInput");
    const btn = document.querySelector("button"); // Add Task button
    document.getElementById("suggestionText").innerText = "";

    const priority = document.getElementById("priority").value;

    const taskText = input.value
        .trim()
        .replace(/\s+/g, " ");
    if (!taskText) return;

    // Disable button
    btn.disabled = true;
    btn.textContent = "Adding...";

    fetch(TASKS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: taskText,
            priority,
            createdAt: new Date().toLocaleString()
        })
    })
    .then(res => res.json())
    .then(() => {
        input.value = "";
        loadApiTasks(); // refresh list
    })
    .catch(err => console.log(err))
    .finally(() => {
        btn.disabled = false;
        btn.textContent = "Add Task";
    });
}

window.loadApiTasks = loadApiTasks;
window.sendTask = sendTask;