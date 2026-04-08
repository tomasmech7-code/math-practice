const questions = {
  easy: [
    { q: "2x = 10. What is x?", a: ["3", "5", "8"], correct: "5" },
    { q: "x + 3 = 7. What is x?", a: ["2", "4", "6"], correct: "4" }
  ],
  medium: [
    { q: "3x + 2 = 11. What is x?", a: ["2", "3", "4"], correct: "3" }
  ],
  hard: [
    { q: "5x - 7 = 18. What is x?", a: ["4", "5", "6"], correct: "5" }
  ]
};

let level = "easy";
let streak = 0;
let currentQuestion;

function getRandomQuestion() {
  const list = questions[level];
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function showQuestion() {
  currentQuestion = getRandomQuestion();

  document.getElementById("question").textContent = currentQuestion.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  currentQuestion.a.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    answersDiv.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
}

function checkAnswer(choice) {
  if (choice === currentQuestion.correct) {
    document.getElementById("feedback").textContent = "Correct";
    streak++;
  } else {
    document.getElementById("feedback").textContent = "Incorrect";
    streak--;
  }

  if (streak >= 2 && level === "easy") level = "medium";
  else if (streak >= 2 && level === "medium") level = "hard";
  else if (streak <= -2 && level === "hard") level = "medium";
  else if (streak <= -2 && level === "medium") level = "easy";

  setTimeout(showQuestion, 800);
}

showQuestion();
