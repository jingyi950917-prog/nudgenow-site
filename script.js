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
    window.location.href = "verdict.html";
  } else {
    show();
  }
}

show();
const data = JSON.parse(localStorage.getItem("realityCheck") || "[]");

// Map answers (must match your question order)
const hoursPerWeek = parseFloat(data[0]) || 0;
const monthsWorking = parseFloat(data[1]) || 0;
const revenueNow = parseFloat(data[2]) || 0;
const revenueBefore = parseFloat(data[3]) || 0;
const price = parseFloat(data[4]) || 0;
const totalMarket = parseFloat(data[5]) || 0;
const payingCustomers = parseFloat(data[6]) || 0;
const hasRepeat = data[7];
const marketingSpend = parseFloat(data[8]) || 0;
const tracksNumbers = data[9];
const knowsBreakEven = data[10];
const growthFeeling = data[11];

// ---- Core math ----
const revenueTrend = revenueNow - revenueBefore;
const monthlyHours = hoursPerWeek * 4;
const hourlyIncome = monthlyHours > 0 ? revenueNow / monthlyHours : 0;
const marketCeiling = totalMarket * price;

// ---- Status ----
let status = "Flat";
if (revenueTrend < 0 || revenueNow < marketingSpend) status = "Bleeding";
if (revenueTrend > 0 && revenueNow > revenueBefore) status = "Growing";

// ---- Diagnose ----
let reasons = [];

if (revenueTrend < 0) {
  reasons.push(`Your revenue dropped by $${Math.abs(revenueTrend).toFixed(2)} in the last 30 days.`);
}

if (hourlyIncome < 10) {
  reasons.push(`You are making only $${hourlyIncome.toFixed(2)} per hour.`);
}

if (payingCustomers < 5) {
  reasons.push(`You only have ${payingCustomers} paying customers.`);
}

if (marketCeiling < revenueNow * 3 && marketCeiling > 0) {
  reasons.push(`Even if everyone in your market buys, your maximum revenue is only $${marketCeiling}.`);
}

if (tracksNumbers === "no") {
  reasons.push("You are running this business without tracking basic numbers.");
}

// ---- Survival Path ----
let escape = [];

if (price > 0 && payingCustomers > 0) {
  const target = revenueNow * 2;
  const neededCustomers = Math.ceil(target / price);
  escape.push(`To grow, you need ${neededCustomers} paying customers at your current price.`);
}

if (price > 0 && payingCustomers > 0) {
  const neededPrice = (revenueNow * 2) / payingCustomers;
  escape.push(`Or you must raise your price to about $${neededPrice.toFixed(2)} per customer.`);
}

if (marketCeiling < revenueNow) {
  escape.push("Your market is mathematically too small. You must change the market or quit.");
}

// ---- Render ----
document.getElementById("status").innerText = status;

document.getElementById("analysis").innerHTML =
  reasons.length
    ? "<ul><li>" + reasons.join("</li><li>") + "</li></ul>"
    : "No critical risk detected.";

document.getElementById("escape").innerHTML =
  escape.length
    ? "<ul><li>" + escape.join("</li><li>") + "</li></ul>"
    : "This business has no mathematically viable growth path.";
