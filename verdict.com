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

document.getElementById("card").innerHTML = `
  <h2>${status}</h2>
  <p>${message}</p>
  <p class="small">
    This verdict is based only on the numbers you provided.
    If you didn’t know some of them, your reality is uncertain.
  </p>
`;
</script>
</body>
</html>
