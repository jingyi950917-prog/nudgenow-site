const questions = [
  "How much money have you spent on this business so far? (USD)",
  "What is your current monthly fixed cost? (USD)",
  "What is your monthly variable cost? (USD)",
  "How many hours per week do you spend on this business?",
  "How long have you been working on it? (months)",
  "What is your current monthly revenue? (USD)",
  "What was your revenue 30 days ago? (USD)",
  "How much would a typical customer pay? (USD)",
  "How many customers do you realistically think exist?",
  "How many paying customers do you have now?",
  "Do you have any repeat customers? (yes/no)",
  "How much have you spent on marketing? (USD)",
  "Do you track your numbers regularly? (yes/no)",
  "Do you know your break-even point? (yes/no)",
  "Do you feel this business is growing, flat, or declining?"
];

let current = 0;
let answers = [];

function show() {
  document.getElementById("question").innerText = questions[current];
  document.getElementById("answer").value = "";
  document.getElementById("progress").innerText = 
    `Question ${current + 1} of ${questions.length}`;
}

function next() {
  const val = document.getElementById("answer").value;
  answers.push(val);
  current++;

  if (current >= questions.length) {
    localStorage.setItem("realityCheck", JSON.stringify(answers));
    window.location.href = "index.html";
  } else {
    show();
  }
}

show();
