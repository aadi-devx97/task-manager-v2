function displayApiData(data) {
    data.sort((a, b) => {
        const p1 = priorityOrder[a.priority || "low"];
        const p2 = priorityOrder[b.priority || "low"];
        return p1 - p2;
    });
    const status = document.getElementById("statusText");
    const list = document.getElementById("apiList");

    if (data.length === 0) {
        const searchValue = document
        .getElementById("searchInput")
        .value.trim();

        if (searchValue) {
            status.innerText = "No matching tasks found 🔍";
            list.innerHTML = "<p>No matching tasks found</p>";
        } else {
            status.innerText = "No tasks found";
            list.innerHTML = "<p>No tasks found</p>";
      }
        return;
    }
    if (window.currentFilter === "All") {
        status.innerText = `Showing all ${data.length} tasks`;
    } 
    else if (window.currentFilter === "Completed") {
        status.innerText = `Showing ${data.length} completed tasks ✅`;
    } 
    else {
        status.innerText = `Showing ${data.length} pending tasks ⏳`;
    }

    list.innerHTML = "";

    data.forEach((item) => {
        const li = document.createElement("li");

        // TEXT
        const span = document.createElement("span");
        span.textContent = item.task;
        const time = document.createElement("small");
        const formattedTime = item.createdAt
            ? new Date(item.createdAt).toLocaleString()
            : "Unknown";

        time.innerHTML = `🕒 ${formattedTime}`;

        const priorityTag = document.createElement("span");
        priorityTag.textContent = item.priority || "low";
        priorityTag.classList.add("priority-tag", item.priority);

        // line-through if completed
        if (item.completed) {
            span.style.textDecoration = "line-through";
        }

        // COMPLETE BUTTON
        const completeBtn = document.createElement("button");
        completeBtn.textContent = item.completed ? "Undo" : "Complete";
        completeBtn.classList.add(item.completed ? "undo-btn" : "complete-btn");

        completeBtn.onclick = () => {
            handleRequest(completeBtn, async () => {
                await fetch(`${TASKS_URL}/${item.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        task: item.task,
                        completed: !item.completed
                    })
                })
                await loadApiTasks();
            });
        };
        
        // DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = () => {
            const confirmed = confirm("Delete this task?");
            if (!confirmed) return;

            handleRequest(deleteBtn, async () => {
                await fetch(`${TASKS_URL}/${item.id}`, {
                    method: "DELETE"
                });

                loadApiTasks();
            });
        };

        // EDIT BUTTON
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.onclick = () => {
            const newText = prompt("Edit task:", item.task);

            if (!newText) return;

            fetch(`${TASKS_URL}/${item.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    task: newText,
                    completed: item.completed,
                    priority: item.priority,
                    createdAt: item.createdAt
                })
            })
            .then(res => res.json())
            .then(() => loadApiTasks())
            .catch(err => console.log("Error:", err));
        };

        // APPEND EVERYTHING
        const btnGroup = document.createElement("div");

        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        const leftDiv = document.createElement("div");
        const rightDiv = document.createElement("div");

        // LEFT SIDE → text + priority
        leftDiv.appendChild(span);
        leftDiv.appendChild(time);
        leftDiv.appendChild(priorityTag);

        // RIGHT SIDE → buttons
        rightDiv.appendChild(completeBtn);
        rightDiv.appendChild(editBtn);
        rightDiv.appendChild(deleteBtn);

        // ADD TO LI
        li.appendChild(leftDiv);
        li.appendChild(rightDiv);

        list.appendChild(li);
    });
}

window.displayApiData = displayApiData;