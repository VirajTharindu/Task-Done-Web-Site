document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    var formData = new FormData(this);

    fetch("login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        if (data.success) {
          // Handle successful login
          alert("Login successful!");
          window.location.href = "index.html"; // Redirect to dashboard or another page
        } else {
          // Display the error message
          document.getElementById("errorMessage").textContent = data.error;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("errorMessage").textContent =
          "An error occurred. Please try again.";
      });
  });
