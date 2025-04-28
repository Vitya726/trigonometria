const funcs = {
    sin: x => Math.sin(x),
    cos: x => Math.cos(x),
    tan: x => Math.tan(x),
    cot: x => 1 / Math.tan(x)
};

let currentFunc = "";
let timerInterval;
let timeLeft = 5;
let playerName = "";
let score = 0;
let lives = 1;
let elapsedTime = 0; 
let elapsedTimeInterval; 
let leaderboard = [];

document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => checkAnswer(btn.dataset.func));
});

function drawFunction(canvasId, funcName) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for (let x = 0; x < canvas.width; x++) {
        let angle = (x / canvas.width) * 4 * Math.PI;
        let y = funcs[funcName](angle);
        if (!isFinite(y)) continue;
        let scaledY = canvas.height / 2 - y * 40;
        ctx.lineTo(x, scaledY);
    }
    ctx.strokeStyle = "blue";
    ctx.stroke();
}

function startGame() {
    playerName = document.getElementById("playerName").value.trim();
    if (playerName === "") {
        alert("Kérlek, add meg a neved!");
        return;
    }

    document.getElementById("login-container").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    lives = 1;
    score = 0;
    elapsedTime = 0; 
    updateLivesDisplay();
    updateScoreDisplay();
    updateElapsedTimeDisplay();
    startElapsedTimeCounter(); 
    startQuiz();
}

function startQuiz() {
    if (lives <= 0) {
        endGame();
        return;
    }

    const canvas = document.getElementById("quizCanvas");
    canvas.style.display = "block";
    document.getElementById("result").textContent = "";
    timeLeft = 5;
    document.getElementById("timer").textContent = `Hátralévő idő: ${timeLeft} mp`;

    const functions = ["sin", "cos", "tan", "cot"];
    currentFunc = functions[Math.floor(Math.random() * functions.length)];
    drawFunction("quizCanvas", currentFunc);
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Hátralévő idő: ${timeLeft} mp`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            loseLife("⏰ Idő lejárt!");
        }
    }, 1000);
}

function startElapsedTimeCounter() {
    elapsedTimeInterval = setInterval(() => {
        elapsedTime++;
        updateElapsedTimeDisplay();
    }, 1000);
}

function updateElapsedTimeDisplay() {
    document.getElementById("elapsedTime").textContent = elapsedTime;
}

function checkAnswer(answer) {
    clearInterval(timerInterval);
    if (answer === currentFunc) {
        document.getElementById("result").textContent = "✅ Helyes!";
        score++;
    } else {
        loseLife(`❌ Helytelen! (${currentFunc})`);
        return;
    }

    setTimeout(() => {
        startQuiz();
    }, 1500);
}

function loseLife(message) {
    lives--;
    updateLivesDisplay();
    document.getElementById("result").textContent = message;

    if (lives <= 0) {
        setTimeout(() => {
            endGame();
        }, 2000);
    } else {
        setTimeout(() => {
            startQuiz();
        }, 2000);
    }
}

function updateLivesDisplay() {
    document.getElementById("lives").textContent = `Életek: ${lives}`;
}
function updateScoreDisplay() {
    document.getElementById("scoreCount").textContent = score;
}
function checkAnswer(answer) {
    clearInterval(timerInterval);
    if (answer === currentFunc) {
        document.getElementById("result").textContent = "✅ Helyes!";
        score++; 
        updateScoreDisplay(); 
    } else {
        loseLife(`❌ Helytelen! (${currentFunc})`);
        return;
    }

    setTimeout(() => {
        startQuiz();
    }, 2000);
}
function endGame() {
    clearInterval(elapsedTimeInterval); 
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("leaderboard-container").style.display = "block";

    const existingPlayer = leaderboard.find(entry => entry.name === playerName);
    if (existingPlayer) {
        existingPlayer.score = Math.max(existingPlayer.score, score);
    } else {
        leaderboard.push({ name: playerName, score });
    }

    leaderboard.sort((a, b) => b.score - a.score);

    saveLeaderboard();

    const leaderboardList = document.getElementById("leaderboard");
    leaderboardList.innerHTML = "";

    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score} pont`;
        leaderboardList.appendChild(li);
    });
}
function restartGame() {
    document.getElementById("leaderboard-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    score = 0;
    elapsedTime = 0; 
    updateScoreDisplay();
    updateElapsedTimeDisplay();
}

window.onload = () => {
    loadLeaderboard(); 
    const leaderboardList = document.getElementById("leaderboard");
    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score} pont`;
        leaderboardList.appendChild(li);
    });
};

function loadLeaderboard() {
    const storedLeaderboard = localStorage.getItem("leaderboard");
    if (storedLeaderboard) {
        leaderboard = JSON.parse(storedLeaderboard);
    }
}

function saveLeaderboard() {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}
