// GET AMOUNT
const amount = localStorage.getItem("totalAmount");

document.getElementById("successAmount").innerText =
  "Amount Paid: ₹" + amount;

// CLEAR STORAGE
localStorage.removeItem("totalAmount");

// AUTO REDIRECT AFTER 3 SECONDS
setTimeout(() => {
  window.location.href = "home.html";
}, 3000);

// BUTTON
function goHome() {
  window.location.href = "home.html";
}