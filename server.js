const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("public"));

// 🚗 VEHICLES
const vehicles = [

  { id: 1, name: "Swift", type: "car", price: 1500, fuel: "Petrol", seats: 5},

  { id: 2, name: "i20", type: "car", price: 1800, fuel: "Petrol", seats: 5},

  { id: 3, name: "Creta", type: "car", price: 2500, fuel: "Diesel", seats: 5},

  { id: 4, name: "Innova", type: "car", price: 3000, fuel: "Diesel", seats: 7},

  { id: 5, name: "Fortuner", type: "car", price: 5000, fuel: "Diesel", seats: 7},

  { id: 6, name: "Baleno", type: "car", price: 1600, fuel: "Petrol", seats: 5},

  { id: 7, name: "Thar", type: "car", price: 3500, fuel: "Diesel", seats: 4},

  { id: 8, name: "Activa", type: "bike", price: 400, gear: "Non-Gear"},

  { id: 9, name: "Pulsar", type: "bike", price: 600, gear: "Gear"},

  { id: 10, name: "R15", type: "bike", price: 800, gear: "Gear"},

  { id: 11, name: "Duke", type: "bike", price: 900, gear: "Gear"},

  { id: 12, name: "Royal Enfield", type: "bike", price: 1200, gear: "Gear"},

  { id: 13, name: "Jupiter", type: "bike", price: 500, gear: "Non-Gear"},

  { id: 14, name: "Apache", type: "bike", price: 750, gear: "Gear" }
];

// 📦 LOAD BOOKINGS
let bookings = [];

try {

  bookings = JSON.parse(
    fs.readFileSync("bookings.json")
  );

} catch {

  bookings = [];
}

// 🚗 GET VEHICLES
app.get("/vehicles", (req, res) => {

  res.json(vehicles);
});

// 📋 GET BOOKINGS
app.get("/bookings", (req, res) => {

  res.json(bookings);
});

// 📌 BOOK VEHICLE
app.post("/book", (req, res) => {

  const {
    vehicleId,
    name,
    phone,
    aadhaar,
    panCard
  } = req.body;

  // ✅ EMPTY CHECK
  if (
    !vehicleId ||
    !name ||
    !phone ||
    !aadhaar ||
    !panCard
  ) {

    return res.json({
      message: "All fields required"
    });
  }

  // 📱 PHONE VALIDATION
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {

    return res.json({
      message:
        "Phone number must be exactly 10 digits"
    });
  }

  // 🪪 AADHAAR VALIDATION
  const aadhaarRegex = /^[0-9]{12}$/;

  if (!aadhaarRegex.test(aadhaar)) {

    return res.json({
      message:
        "Aadhaar number must be exactly 12 digits"
    });
  }

  // 🆔 PAN CARD VALIDATION
  // Example: ABCDE1234F
  const panRegex =
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(panCard.toUpperCase())) {

    return res.json({
      message:
        "Invalid PAN Card Number"
    });
  }

  // 🚗 FIND VEHICLE
  const vehicle = vehicles.find(
    v => v.id == vehicleId
  );

  if (!vehicle) {

    return res.json({
      message: "Vehicle not found"
    });
  }

  // 💾 CREATE BOOKING
  const booking = {

    id: bookings.length + 1,

    vehicleName: vehicle.name,

    user: name,

    phone,

    aadhaar,

    panCard,

    date: new Date().toLocaleString()
  };

  // 💾 SAVE BOOKING
  bookings.push(booking);

  fs.writeFileSync(
    "bookings.json",
    JSON.stringify(bookings, null, 2)
  );

  res.json({
    message: "Booking Successful ✅"
  });
});

// ❌ DELETE BOOKING
app.delete("/delete/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const index =
    bookings.findIndex(b => b.id === id);

  if (index === -1) {

    return res.status(404).json({
      message: "Booking not found"
    });
  }

  bookings.splice(index, 1);

  fs.writeFileSync(
    "bookings.json",
    JSON.stringify(bookings, null, 2)
  );

  res.json({
    message: "Booking deleted ✅"
  });
});

// 🚀 START SERVER
app.listen(PORT, () => {

  console.log(
    `Server running at http://localhost:${PORT}`
  );
});