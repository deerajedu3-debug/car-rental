// 🔐 LOGIN CHECK
const user = localStorage.getItem("user");
if (!user) {
  window.location.href = "index.html";
}

let currentType = "car";
let selectedVehicle = null;
let selectedPrice = 0;

// 🔄 SWITCH VEHICLE TYPE
function setType(type) {
  currentType = type;
  showVehicles();
}

// 🚗 SHOW VEHICLES
function showVehicles() {
  fetch("/vehicles")
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("vehicles");
      div.innerHTML = "";

      data
        .filter(v => v.type === currentType)
        .forEach(v => {
          div.innerHTML += `
            <div class="card">
              <h3>${v.name}</h3>

              <p>₹${v.price} / day</p>

              ${
                v.type === "car"
                  ? `<p>⛽ ${v.fuel} | 👥 ${v.seats} Seats</p>`
                  : `<p>⚙️ ${v.gear}</p>`
              }

              <button onclick="bookVehicle(${v.id}, ${v.price})">
                Book Now
              </button>
            </div>
          `;
        });
    });
}

// 📌 OPEN BOOKING FORM
function bookVehicle(id, price) {
  selectedVehicle = id;
  selectedPrice = price;

  document.getElementById("bookingForm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// ❌ CLOSE FORM
function closeForm() {
  document.getElementById("bookingForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// 💰 CALCULATE PRICE
function calculatePrice() {
  const startVal = document.getElementById("startDate").value;
  const endVal = document.getElementById("endDate").value;

  if (!startVal || !endVal) return;

  const start = new Date(startVal);
  const end = new Date(endVal);

  const days = (end - start) / (1000 * 60 * 60 * 24);

  if (days > 0) {
    const total = days * selectedPrice;
    document.getElementById("totalPrice").innerText =
      "Total Price: ₹" + total;
  } else {
    document.getElementById("totalPrice").innerText = "Invalid dates";
  }
}

// 📅 EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  const startInput = document.getElementById("startDate");
  const endInput = document.getElementById("endDate");

  if (startInput && endInput) {
    startInput.addEventListener("change", calculatePrice);
    endInput.addEventListener("change", calculatePrice);
  }
});

// 📊 SHOW BILL BEFORE BOOKING
function submitBooking() {
  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const idProof = document.getElementById("idProof").value.trim();
  const license = document.getElementById("license").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  if (!name || !phone || !idProof || !license || !startDate || !endDate) {
    alert("All fields required!");
    return;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = (end - start) / (1000 * 60 * 60 * 24);

  if (days <= 0) {
    alert("Invalid dates");
    return;
  }

  const total = days * selectedPrice;

  // 💾 SAVE FOR PAYMENT PAGE
  localStorage.setItem("totalAmount", total);

  // 📊 BILL DISPLAY
  document.getElementById("billDays").innerText = "Days: " + days;
  document.getElementById("billPrice").innerText =
    "Price/day: ₹" + selectedPrice;
  document.getElementById("billTotal").innerText =
    "Total: ₹" + total;

  document.getElementById("billPopup").style.display = "block";

  // TEMP STORE USER DATA
  window.bookingData = { name, phone, idProof, license };
}

// ✅ FINAL CONFIRM BOOKING
function confirmBooking() {
  fetch("/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      vehicleId: selectedVehicle,
      ...window.bookingData
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);

      // 🔁 REDIRECT TO PAYMENT PAGE
      window.location.href = "payment.html";
    })
    .catch(err => {
      console.error(err);
      alert("Booking failed");
    });
}

// ❌ CLOSE BILL POPUP
function closeBill() {
  document.getElementById("billPopup").style.display = "none";
}

// 🔐 LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// 🚀 LOAD VEHICLES
showVehicles();