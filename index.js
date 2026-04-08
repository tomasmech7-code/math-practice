document.body.innerHTML = "<h1>App is loading</h1>";

let currentUser = null;

async function loadUserData(userId) {
  const docRef = doc(db, "students", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("User data loaded:", data);
  }
}

async function saveProgress(userId) {
  try {
    const docRef = doc(db, "students", userId);
    await updateDoc(docRef, {
      updatedAt: serverTimestamp(),
      // Add other progress fields here as needed
    });
    console.log("Progress saved for:", userId);
  } catch (e) {
    console.error("Error saving progress:", e);
  }
}

async function logout() {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
  } catch (e) {
    console.error("Logout error:", e);
  }
}

let stats = {};
let timerInterval = null;
let questionNumber = 0;
let flaggedQuestions = [];
let testHistory = [];

function endSection() {
  if (timerInterval) clearInterval(timerInterval);

  let total = 0;
  let right = 0;

  Object.values(stats).forEach(t => {
    total += t.total;
    right += t.right;
  });

  const percent = total > 0 ? Math.round((right / total) * 100) : 0;

  alert("Section Complete. Score: " + percent + "%");
  questionNumber = 0;
  
  localStorage.setItem("testHistory", JSON.stringify(testHistory));
  window.location.href = "/review";
}

window.endSection = endSection;

function nextQuestion() {
  questionNumber++;
  // We sync with the React app's state via data attributes or IDs if needed
  console.log("Moving to question:", questionNumber);
}

window.nextQuestion = nextQuestion;

window.showQuestion = () => {
  console.log("Next question triggered via showQuestion");
  // Integration with the React state is handled via the onClick handler in math-practice.tsx
};

function flagQuestion(questionObj) {
  let q = typeof currentQuestion !== 'undefined' ? currentQuestion : (questionObj || {});
  flaggedQuestions.push(q);
  localStorage.setItem("flagged", JSON.stringify(flaggedQuestions));
}

function recordAnswer(choice, level, questionObj) {
  let q = typeof currentQuestion !== 'undefined' ? currentQuestion : (questionObj || {});
  
  testHistory.push({
    question: q.customText || q.q || q.question || "Unknown",
    choices: q.customChoices || q.a || q.choices || [],
    correct: q.answer !== undefined ? q.answer : q.correct,
    selected: choice,
    level: level || q.level || "easy"
  });
}

window.flagQuestion = flagQuestion;
window.recordAnswer = recordAnswer;


