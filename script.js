// Quiz logic. The questions and parties come from data.js.

let currentQuestion = 0;
let userAnswers = []; // one entry per question: 1, 0, -1, or null if skipped

// Grab the page elements we need to change
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const questionText = document.getElementById("question-text");
const questionCounter = document.getElementById("question-counter");
const progressBar = document.getElementById("progress-bar");
const resultsList = document.getElementById("results-list");
const restartButton = document.getElementById("restart-button");
const answerButtons = document.querySelectorAll(".answers button");

// Show the current question and update the progress bar
function showQuestion() {
  questionText.textContent = questions[currentQuestion];
  questionCounter.textContent =
    "Question " + (currentQuestion + 1) + " of " + questions.length;
  progressBar.style.width = (currentQuestion / questions.length) * 100 + "%";
}

// Called whenever the user clicks an answer button
function handleAnswer(value) {
  userAnswers.push(value === "skip" ? null : Number(value));
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

// Compare the user's answers to one party. Returns a percentage 0-100.
function calculateMatch(party) {
  let totalDifference = 0;
  let questionsCounted = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === null) continue; // skipped questions don't count

    // The difference between two answers is 0 (same) to 2 (opposite)
    totalDifference += Math.abs(userAnswers[i] - party.positions[i]);
    questionsCounted++;
  }

  if (questionsCounted === 0) return 0;

  const maxDifference = questionsCounted * 2;
  return Math.round((1 - totalDifference / maxDifference) * 100);
}

// Work out all the scores and display them, best match first
function showResults() {
  const scores = parties.map(function (party) {
    return { name: party.name, percent: calculateMatch(party) };
  });

  scores.sort(function (a, b) {
    return b.percent - a.percent;
  });

  resultsList.innerHTML = "";
  scores.forEach(function (score) {
    const item = document.createElement("div");
    item.className = "result-item";

    const header = document.createElement("div");
    header.className = "result-header";

    const name = document.createElement("span");
    name.textContent = score.name;

    const percent = document.createElement("span");
    percent.textContent = score.percent + "%";

    header.appendChild(name);
    header.appendChild(percent);

    const bar = document.createElement("div");
    bar.className = "result-bar";

    const fill = document.createElement("div");
    fill.className = "result-fill";
    fill.style.width = score.percent + "%";

    bar.appendChild(fill);
    item.appendChild(header);
    item.appendChild(bar);
    resultsList.appendChild(item);
  });

  progressBar.style.width = "100%";
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
}

// Reset everything and start over
function restart() {
  currentQuestion = 0;
  userAnswers = [];
  resultsScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
}

// Connect the buttons to the functions above
answerButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleAnswer(button.dataset.value);
  });
});

restartButton.addEventListener("click", restart);

// Start the quiz
showQuestion();
