document
  .getElementById("logoutBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link action

    // Send AJAX request to logout.php
    fetch("logout.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // If logout is successful, show the confirmation box
          document.getElementById("confirmationBox").style.display = "block";
        } else {
          // Display an error if something goes wrong
          alert(data.error || "An error occurred during logout.");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        alert("Something went wrong. Please try again.");
      });
  });

// Confirmation for Logout
document.getElementById("confirmLogout").addEventListener("click", function () {
  // Redirect to login page when confirmed
  window.location.href = "login.html";
});

// Cancel the logout action and close the confirmation box
document.getElementById("cancelLogout").addEventListener("click", function () {
  document.getElementById("confirmationBox").style.display = "none";
});
