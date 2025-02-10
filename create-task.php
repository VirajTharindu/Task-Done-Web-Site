<?php
// Database connection parameters
$servername = "localhost";
$username = "root"; // Default username for XAMPP
$password = "";     // Default password for XAMPP (usually empty)
$dbname = "task_management"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit(); // Stop further execution if connection failed
}

// Handle the form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Get form data from $_POST
    $title = $_POST['title'];
    $description = $_POST['description'];
    $priority = $_POST['priority'];
    $deadline = $_POST['deadline'];
    $assigned_to = $_POST['assign-to-user'];
    $status = $_POST['status'];

    // Input validation (optional, to ensure no missing data)
    if (empty($title) || empty($description) || empty($priority) || empty($deadline) || empty($assigned_to) || empty($status)) {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required."
        ]);
        exit();
    }

    // Prepare and bind SQL statement
    $stmt = $conn->prepare("INSERT INTO tasks (title, description, priority, deadline, assigned_to, status) VALUES (?, ?, ?, ?, ?, ?)");

    if (!$stmt) {
        echo json_encode([
            "success" => false,
            "message" => "Prepare failed: " . $conn->error
        ]);
        exit();
    }

    $stmt->bind_param("ssssss", $title, $description, $priority, $deadline, $assigned_to, $status);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Task created successfully."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error executing statement: " . $stmt->error
        ]);
    }

    // Close the statement
    $stmt->close();
}

// Close connection
$conn->close();
?>
