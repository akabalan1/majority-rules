
let players = JSON.parse(localStorage.getItem("players") || "[]");
let answers = {};
let scores = JSON.parse(localStorage.getItem("scores") || "{}");
let currentQuestion = -1;

const questions = [
    { question: "What’s the best way to spend a Friday night?", options: ["Movie night", "Dinner out", "Board games", "Cuddling on the couch"] },
    { question: "Which pet is cuter?", options: ["Puppy", "Kitten", "Bunny", "Bird"] },
    { question: "Ideal vacation spot?", options: ["Beach", "Mountains", "City", "Countryside"] },
    { question: "What's the most romantic gesture?", options: ["Handwritten letter", "Surprise date", "Cooking together", "Slow dancing"] },
    { question: "Pick a dessert to share:", options: ["Chocolate cake", "Ice cream", "Tiramisu", "Macarons"] },
    { question: "Favorite date activity?", options: ["Picnic", "Stargazing", "Concert", "Cooking class"] },
    { question: "What’s the best way to say 'I love you'?", options: ["In person", "With a gift", "With a hug", "Text message"] },
    { question: "Most fun couple hobby?", options: ["Traveling", "Gaming", "Dancing", "DIY crafts"] },
    { question: "Who plans better dates?", options: ["Me", "My partner", "We both do", "We wing it!"] },
    { question: "Which love story is the best?", options: ["Pride & Prejudice", "Titanic", "The Notebook", "La La Land"] }
];

function joinGame() {
    const name = document.getElementById("playerName").value.trim();
    if (!name || players.includes(name)) return;
    players.push(name);
    scores[name] = 0;
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("scores", JSON.stringify(scores));
    document.getElementById("join-screen").style.display = "none";
    listenToGameState();
}

function listenToGameState() {
    window.addEventListener("storage", updateFromState);
    updateFromState(); // initial
}

function updateFromState() {
    const state = JSON.parse(localStorage.getItem("gameState"));
    if (!state) return;
    if (state.currentQuestion >= questions.length) return showFinalResults();
    if (state.currentQuestion !== currentQuestion) {
        currentQuestion = state.currentQuestion;
        showQuestion();
    }
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question-text").innerText = q.question;
    const optDiv = document.getElementById("options");
    optDiv.innerHTML = "";
    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => submitAnswer(opt);
        optDiv.appendChild(btn);
    });
    document.getElementById("question-screen").style.display = "block";
}

function submitAnswer(option) {
    const name = players[players.length - 1];
    const a = JSON.parse(localStorage.getItem("answers") || "{}");
    a[name] = option;
    localStorage.setItem("answers", JSON.stringify(a));
    answers = a;
    checkAllAnswered();
}

function checkAllAnswered() {
    const a = JSON.parse(localStorage.getItem("answers") || "{}");
    if (Object.keys(a).length === players.length) {
        showResults();
    }
}

function showResults() {
    const a = JSON.parse(localStorage.getItem("answers") || "{}");
    const tally = {};
    Object.values(a).forEach(ans => {
        tally[ans] = (tally[ans] || 0) + 1;
    });
    const majority = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
    Object.entries(a).forEach(([player, ans]) => {
        if (ans === majority) scores[player]++;
    });
    localStorage.setItem("scores", JSON.stringify(scores));
    const results = Object.entries(a).map(([player, ans]) => {
        return player + " picked: " + ans + (ans === majority ? " ✅" : "");
    });
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("results").innerHTML = "<p>Majority: <strong>" + majority + "</strong></p><ul>" + results.map(r => "<li>" + r + "</li>").join('') + "</ul>";
    document.getElementById("result-screen").style.display = "block";
}

function showFinalResults() {
    document.getElementById("result-screen").style.display = "none";
    const leaderboard = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    document.getElementById("leaderboard").innerHTML = "<ol>" + leaderboard.map(([p, s]) => "<li>" + p + ": " + s + "</li>").join('') + "</ol>";
    document.getElementById("final-screen").style.display = "block";
}
