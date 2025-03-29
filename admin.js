
function startGame() {
    localStorage.setItem("gameState", JSON.stringify({ currentQuestion: -1 }));
    localStorage.setItem("answers", "{}");
    localStorage.setItem("scores", "{}");
    window.dispatchEvent(new Event("storage"));
}

function nextQuestion() {
    let state = JSON.parse(localStorage.getItem("gameState") || "{}");
    state.currentQuestion++;
    localStorage.setItem("gameState", JSON.stringify(state));
    localStorage.setItem("answers", "{}");
    window.dispatchEvent(new Event("storage"));
    renderPlayerList();
    clearChart();
}

function renderPlayerList() {
    const players = JSON.parse(localStorage.getItem("players") || "[]");
    const list = document.getElementById("playerList");
    list.innerHTML = "<h3>Players Joined:</h3><ul>" + players.map(p => "<li>" + p + "</li>").join('') + "</ul>";
}

function clearChart() {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    if (window.resultChart) {
        window.resultChart.destroy();
    }
    ctx.clearRect(0, 0, 800, 400);
}

window.addEventListener("storage", () => {
    const state = JSON.parse(localStorage.getItem("gameState") || "{}");
    const a = JSON.parse(localStorage.getItem("answers") || "{}");

    if (Object.keys(a).length > 0) {
        const tally = {};
        Object.values(a).forEach(ans => {
            tally[ans] = (tally[ans] || 0) + 1;
        });

        const ctx = document.getElementById('resultsChart').getContext('2d');
        if (window.resultChart) {
            window.resultChart.destroy();
        }

        window.resultChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(tally),
                datasets: [{
                    label: 'Votes',
                    data: Object.values(tally),
                    backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#66bb6a']
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        if (state.currentQuestion >= 9) {
            const scores = JSON.parse(localStorage.getItem("scores") || "{}");
            const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
            document.getElementById("leaderboard").innerHTML = "<h3>🏆 Final Leaderboard 🏆</h3><ol>" + 
                sorted.map(([name, score]) => `<li>${name}: ${score}</li>`).join("") + "</ol>";
        }
    }
});
