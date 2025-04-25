const words = ["algorytm", "komputer", "program", "javascript", "uczelnia", "żółw"];
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = [];
const maxWrong = 10;

const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");

function drawHangman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  const wrongs = wrongGuesses.length
  // podstawka
  if (wrongs > 0) ctx.strokeRect(10, 180, 100, 10);
  // słupek
  if (wrongs > 1) ctx.strokeRect(40, 20, 10, 160);
  // belka
  if (wrongs > 2) ctx.strokeRect(40, 20, 70, 10);
  // sznurek
  if (wrongs > 3) ctx.strokeRect(110, 20, 2, 20);
  // głowa
  if (wrongs > 4) ctx.beginPath(), ctx.arc(111, 50, 10, 0, Math.PI * 2), ctx.stroke();
  // ciało
  if (wrongs > 5) ctx.strokeRect(110, 60, 2, 40);
  // lewa reka
  if (wrongs > 6) {
    ctx.beginPath();
    ctx.moveTo(110, 60);
    ctx.lineTo(90, 80);
    ctx.stroke();
  }
  // prawa reka
  if (wrongs > 7) {
    ctx.beginPath();
    ctx.moveTo(112, 60);
    ctx.lineTo(132, 80);
    ctx.stroke();
  }
  // lewa noga
  if (wrongs > 8) {
    ctx.beginPath();
    ctx.moveTo(110, 100);
    ctx.lineTo(90, 120);
    ctx.stroke();
  }
  // prawa noga
  if (wrongs > 9) {
    ctx.beginPath();
    ctx.moveTo(112, 100);
    ctx.lineTo(132, 120);
    ctx.stroke();
  }
}

function renderWord() {
  wordDisplay.innerHTML = "";
  for (const letter of selectedWord) {
    const slot = document.createElement("div");
    slot.className = "letter-slot";
    slot.textContent = guessedLetters.includes(letter) ? letter : "";
    wordDisplay.appendChild(slot);
  }
}

function checkGameOver() {
  if (!selectedWord.split("").some(l => !guessedLetters.includes(l))) {
    message.textContent = "Gratulacje! Odgadłeś słowo.";
    localStorage.removeItem("hangmanState");
  } else if (wrongGuesses.length >= maxWrong) {
    message.textContent = `Przegrana! Szukane słowo to: ${selectedWord}`;
    localStorage.removeItem("hangmanState");
  }
}

function handleKeyClick(e) {
  const btn = e.target;
  const letter = btn.textContent;
  if (!btn.classList.contains("used") && wrongGuesses.length < maxWrong && selectedWord.split("").some(l => !guessedLetters.includes(l))) {
    btn.classList.add("used");
    if (selectedWord.includes(letter)) {
      guessedLetters.push(letter);
    } else {
      wrongGuesses.push(letter);
    }
    renderWord();
    drawHangman();
    checkGameOver();
    saveState();
  }
}

function createKeyboard() {
  const alphabet = "aąbcćdeęfghijklłmnńoóprsśtuwyzźż".split("");
  keyboard.innerHTML = "";
  alphabet.forEach(letter => {
    const key = document.createElement("div");
    key.className = "key";
    key.textContent = letter;
    key.addEventListener("click", handleKeyClick);
    keyboard.appendChild(key);
  });
}

function saveState() {
  const state = {
    selectedWord,
    guessedLetters,
    wrongGuesses
  };
  localStorage.setItem("hangmanState", JSON.stringify(state));
}

function loadState() {
  const state = JSON.parse(localStorage.getItem("hangmanState"));
  if (state) {
    selectedWord = state.selectedWord;
    guessedLetters = state.guessedLetters;
    wrongGuesses = state.wrongGuesses;
    renderWord();
    drawHangman();
    document.querySelectorAll(".key").forEach(key => {
      if (guessedLetters.includes(key.textContent) || wrongGuesses.includes(key.textContent)) {
        key.classList.add("used");
      }
    });
  }
}

function newGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = [];
  message.textContent = "";
  createKeyboard();
  renderWord();
  drawHangman();
}

function reset() {
    newGame();
    saveState();
}

document.getElementById("new-game").addEventListener("click", reset);
document.getElementById("cancel").addEventListener("click", () => {
  localStorage.removeItem("hangmanState");
  location.reload();
});

createKeyboard();
newGame();
loadState();
