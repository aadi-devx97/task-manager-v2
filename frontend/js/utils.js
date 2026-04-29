const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3
};

function getSuggestion(text) {
    text = text.toLowerCase();

    if (text.includes("js")) return "💡 Try practicing DOM today";
    if (text.includes("python")) return "🐍 Revise loops or functions";
    if (text.includes("gym")) return "💪 Do 20 pushups today";
    if (text.includes("study")) return "📚 Focus for 25 minutes";
    if (text.includes("project")) return "🚀 Break it into small tasks";

    return "";
}

async function handleRequest(button, callback) {
    document.body.style.cursor = "wait";
    button.disabled = true;
    
    try {
        await callback();
    } catch (err) {
        console.log("Error:", err);
    } finally {
        document.body.style.cursor = "default";
        button.disabled = false;
    }
}

window.getSuggestion = getSuggestion;
window.priorityOrder = priorityOrder;