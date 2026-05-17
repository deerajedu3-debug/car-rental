function login() {
  const user = document.getElementById("userInput").value.trim();

  if (!user) {
    alert("Enter phone or Gmail");
    return;
  }

  localStorage.setItem("user", user);
  window.location.href = "home.html";
}