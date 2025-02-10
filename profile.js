// Load user profile data when the page loads
document.addEventListener("DOMContentLoaded", () => {
  fetch("profile.php")
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        document.getElementById("name").value = data.profile.name;
        document.getElementById("email").value = data.profile.email;
        document.getElementById("role").value = data.profile.role;
        document.getElementById("bio").value = data.profile.bio || "";
        document.getElementById("profileImage").src =
          data.profile.profilePicture || "default-profile.png";
      } else {
        alert(data.error || "Failed to load profile.");
      }
    })
    .catch((err) => console.error("Error loading profile:", err));
});

// Update profile details
document.getElementById("saveProfile").addEventListener("click", () => {
  const formData = new FormData(document.getElementById("profileForm"));
  fetch("profile.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(data.error || "Failed to update profile.");
      }
    })
    .catch((err) => console.error("Error updating profile:", err));
});

// Change profile picture
document.getElementById("changeProfilePic").addEventListener("click", () => {
  document.getElementById("uploadProfilePic").click();
});

document
  .getElementById("uploadProfilePic")
  .addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_pic", file);

      fetch("profile.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            document.getElementById("profileImage").src = data.profilePicture;
            alert("Profile picture updated successfully!");
          } else {
            alert(data.error || "Failed to update profile picture.");
          }
        })
        .catch((err) => console.error("Error updating profile picture:", err));
    }
  });
