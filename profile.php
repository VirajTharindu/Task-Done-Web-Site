<?php
session_start();
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_management";
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Fetch or update profile based on the request method
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_SESSION['user_id'];
    $stmt = $conn->prepare("SELECT name, email, role, bio, profile_picture_url FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $profile = $result->fetch_assoc();
        echo json_encode(["success" => true, "profile" => $profile]);
    } else {
        echo json_encode(["error" => "User not found."]);
    }
    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_SESSION['user_id'];
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $bio = $_POST['bio'] ?? '';

    if (isset($_FILES['profile_pic'])) {
        $uploadDir = "uploads/profile_pics/";
        $fileName = time() . "_" . basename($_FILES['profile_pic']['name']);
        $filePath = $uploadDir . $fileName;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $filePath)) {
            $stmt = $conn->prepare("UPDATE users SET profile_picture_url = ? WHERE id = ?");
            $stmt->bind_param("si", $filePath, $userId);
            $stmt->execute();
            echo json_encode(["success" => true, "profilePicture" => $filePath]);
        } else {
            echo json_encode(["error" => "Failed to upload profile picture."]);
        }
    } else {
        $stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, bio = ? WHERE id = ?");
        $stmt->bind_param("sssi", $name, $email, $bio, $userId);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Failed to update profile."]);
        }
        $stmt->close();
    }
}

$conn->close();
?>
