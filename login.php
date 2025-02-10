<?php
session_start();

// Set the content type to JSON
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "task_management"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection and handle errors
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit;
}

// Check if the form data is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username_input = $_POST['username'];
    $password_input = $_POST['password'];

    // Validate input
    if (empty($username_input) || empty($password_input)) {
        echo json_encode(["error" => "Username and password are required."]);
        exit;
    }

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT id, username, password_hash, role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username_input); // "s" is for string
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows > 0) {
        // Fetch the user data
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password_input, $user['password_hash'])) {
            // Password is correct, set session variables and return success
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            echo json_encode(["success" => "Login successful."]);
        } else {
            // Incorrect password
            echo json_encode(["error" => "Invalid username or password."]);
        }
    } else {
        // No user found
        echo json_encode(["error" => "Invalid username or password."]);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid request method."]);
}

// Close the connection
$conn->close();
?>
