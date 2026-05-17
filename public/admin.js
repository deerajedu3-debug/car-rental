function loadBookings() {
  fetch("/bookings")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("bookingTable");
      table.innerHTML = "";

      data.forEach(b => {
        table.innerHTML += `
          <tr>
            <td>${b.id}</td>
            <td>${b.vehicleName}</td>
            <td>${b.user}</td>
            <td>${b.phone}</td>
            <td>${b.idProof}</td>
            <td>${b.license}</td>
            <td>${b.date}</td>
            <td>
              <button onclick="deleteBooking(${b.id})">❌ Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// ❌ DELETE FUNCTION
function deleteBooking(id) {
  if (!confirm("Are you sure?")) return;

  fetch("/delete/" + id, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      loadBookings(); // 🔄 refresh table
    });
}

// AUTO LOAD
loadBookings();