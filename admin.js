
function startGame() {
    localStorage.setItem("gameState", JSON.stringify({ currentQuestion: -1 }));
    localStorage.setItem("answers", "{}");
    window.dispatchEvent(new Event("storage"));
}

function nextQuestion() {
    let state = JSON.parse(localStorage.getItem("gameState") || "{}");
    state.currentQuestion++;
    localStorage.setItem("gameState", JSON.stringify(state));
    localStorage.setItem("answers", "{}");
    window.dispatchEvent(new Event("storage"));
    renderPlayerList();
}

function renderPlayerList() {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const list = document.getElementById("playerList");
    list.innerHTML = "<h3>Players Joined:</h3><ul>" + players.map(p => "<li>" + p + "</li>").join('') + "</ul>";
}
