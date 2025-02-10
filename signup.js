document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission to handle validation and AJAX

    // Collect form data
    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("username", document.getElementById("username").value);
    formData.append("company_id", document.getElementById("company-id").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("role", document.getElementById("role").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("dob", document.getElementById("dob").value);
    formData.append("address", document.getElementById("address").value);
    formData.append("bio", document.getElementById("bio").value);
    formData.append("password", document.getElementById("password").value);

    // Check if a file is selected
    const profilePic = document.getElementById("profile-pic").files[0];
    if (profilePic) {
        formData.append("profile_pic", profilePic);
    }

    // Send form data via AJAX to PHP script
    fetch("signup.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect or show a success message
            alert("Sign up successful!");
            window.location.href = "login.html"; // Redirect to login page after successful signup
        } else {
            // Show error message
            alert("Error: " + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
