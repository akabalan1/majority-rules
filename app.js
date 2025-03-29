let players = [];
let currentQuestion = 0;
let questions = [
    { question: "What's the best vacation spot?", options: ["Beach", "Mountains", "City", "Countryside"] },
    { question: "Favorite movie genre?", options: ["Action", "Comedy", "Drama", "Sci-fi"] },
    // Add more questions as needed
];

function joinGame() {
    const name = document.getElementById('player-name').value;
    if (name) {
        players.push({ name, answers: [] });
        startGame();
    }
}

function startGame() {
    document.getElementById('join-section').style.display = 'none';
    document.getElementById('question-section').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question').innerText = q.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => nextQuestion();
        optionsDiv.appendChild(btn);
    });
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById('question-section').style.display = 'none';
        document.getElementById('leaderboard').style.display = 'block';
        document.getElementById('leaderboard').innerText = 'Thanks for playing!';
    }
}
