// SHOW TOTAL AMOUNT
const total = localStorage.getItem("totalAmount");

document.getElementById("amount").innerText = "₹" + total;

// PAY FUNCTION
function payNow() {
  const upi = document.getElementById("upiId").value.trim();

  if (!upi || !upi.includes("@")) {
    alert("Enter valid UPI ID");
    return;
  }

  // REDIRECT TO SUCCESS SCREEN
  window.location.href = "success.html";
}