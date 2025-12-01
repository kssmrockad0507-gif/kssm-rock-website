// Load coins
function getCoins() {
  return parseInt(localStorage.getItem("coins") || "0");
}

// Save coins
function setCoins(value) {
  localStorage.setItem("coins", value);
}

// Add coins
function addCoins(value) {
  let current = getCoins();
  setCoins(current + value);
}

// Auto show coins everywhere
function showCoins() {
  const coinDisplay = document.querySelector(".coin-display");
  if (coinDisplay) {
    coinDisplay.textContent = getCoins();
  }
}

document.addEventListener("DOMContentLoaded", showCoins);
