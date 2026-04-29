function setActiveFilter(buttonText) {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => btn.classList.remove("active"));

    buttons.forEach(btn => {
        if (btn.textContent === buttonText) {
            btn.classList.add("active");
        }
    });
}

//BUTTONS
function showAll() {
    currentFilter = "All";
    setActiveFilter("All");
    displayApiData(window.apiTasks);
}

function showCompleted() {
    currentFilter = "Completed";

    setActiveFilter("Completed");
    const filtered = window.apiTasks.filter(t => t.completed);
    displayApiData(filtered);
}

function showPending() {
    currentFilter = "Pending";
    setActiveFilter("Pending");
    const filtered = window.apiTasks.filter(t => !t.completed);
    displayApiData(filtered);
}

function handleSearch() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    let filtered = window.apiTasks.filter(task =>
        task.task.toLowerCase().includes(searchValue)
    );

    // apply current filter also
    if (currentFilter === "Completed") {
        filtered = filtered.filter(t => t.completed);
    } else if (currentFilter === "Pending") {
        filtered = filtered.filter(t => !t.completed);
    }

    displayApiData(filtered);
}

window.showAll = showAll;
window.showCompleted = showCompleted;
window.showPending = showPending;
window.handleSearch = handleSearch;