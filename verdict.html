<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Your Reality Check</title>
<link rel="stylesheet" href="style.css">
</head>
<body class="center">
<div class="card" id="card"></div>

<script>
const data = JSON.parse(localStorage.getItem("realityCheck")) || [];

// Count unknowns
let unknown = 0;
data.forEach(v => {
  if (!v || v.toLowerCase().includes("don")) unknown++;
});

const fixed = Number(data[1]) || 0;
const variable = Number(data[2]) || 0;
const now = Number(data[5]) || 0;
const before = Number(data[6]) || 0;
const price = Number(data[7]) || 0;
const market = Number(data[8]) || 0;

const burn = fixed + variable;
const marketValue = price * market;

let status = "";
let message = "";

if (now < burn) {
  status = "🟥 Bleeding";
  message = "You are spending more than you make. This business is currently losing money.";
} else if (now >= burn && now <= burn * 1.2) {
  status = "🟨 Stuck";
  message = "You are barely covering your costs. There is no safety margin.";
} else {
  status = "🟩 Viable";
  message = "Your numbers show a real path to sustainability.";
}

if (now <= before) {
  message += "<br><br>Revenue is not growing.";
}

if (marketValue < burn * 12) {
  message += "<br><br>Your market may be too small to support this business.";
}

let realityBlock = "";

if (unknown >= 3) {
  realityBlock = `
    <hr>
    <h3>⚠️ You do not have real numbers</h3>
    <p>
      You answered “I don’t know” to multiple critical questions.
      This means you are not running a business — you are guessing.
    </p>
    <p>
      If you want a real verdict, you need to collect real data for 14–30 days.
    </p>
    <a class="button" href="https://YOURDOMAIN.com/tracker">Start Tracking Reality</a>
    <p class="small">
      After tracking, come back and run this check again.
    </p>
  `;
}

document.getElementById("card").innerHTML = `
  <h2>${status}</h2>
  <p>${message}</p>
  ${realityBlock}
  <p class="small">
    This verdict is based only on the numbers you provided.
  </p>
`;
</script>
</body>
</html>
