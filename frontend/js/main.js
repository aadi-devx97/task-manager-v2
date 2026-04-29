window.apiTasks = [];
window.currentFilter = "all";

window.onload = () => {
    setActiveFilter("All");
    loadApiTasks();
};

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
        sendTask();
    }
});

document.getElementById("taskInput").addEventListener("input", function(e) {
    const text = e.target.value;

    const suggestion = getSuggestion(text);

    document.getElementById("suggestionText").innerText = suggestion;
});

document.getElementById("searchInput").addEventListener("input", function() {
    window.handleSearch();
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        document.getElementById("searchInput").value = "";
        window.currentFilter = "All";
        showAll();
    }   
});

document.addEventListener("keydown", function(e) {
    if (e.key === "/") {
        e.preventDefault();
        document.getElementById("searchInput").focus();
    }
});

document.getElementById("allBtn").addEventListener("click", showAll);
document.getElementById("addBtn").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    if (!taskInput.value.trim()) {
        alert("Please enter a task");
        return;
    }
    sendTask();
});
document.getElementById("completedBtn").addEventListener("click", showCompleted);
document.getElementById("pendingBtn").addEventListener("click", showPending);

// MAKE FUNCTIONS GLOBAL
window.showAll = showAll;
window.showCompleted = showCompleted;
window.showPending = showPending;
window.handleSearch = handleSearch;