<?php
header('Content-Type: application/json');

// Database connection parameters
$servername = "localhost"; // Change this to your server name
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "task_management"; // Change this to your database name

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {

    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate input data
if (!isset($data['task_id'], $data['title'], $data['description'], $data['priority'], $data['deadline'], $data['assigned_to'], $data['status'])) {
    echo json_encode(['error' => 'Invalid input data']);
    exit();
}

// Sanitize input data
$taskId = $conn->real_escape_string($data['task_id']);
$title = $conn->real_escape_string($data['title']);
$description = $conn->real_escape_string($data['description']);
$priority = $conn->real_escape_string($data['priority']);
$deadline = $conn->real_escape_string($data['deadline']);
$assignedTo = $conn->real_escape_string($data['assigned_to']);
$status = $conn->real_escape_string($data['status']);

// Update the task in the database
$sql = "UPDATE tasks SET title='$title', description='$description', priority='$priority', deadline='$deadline', assigned_to='$assignedTo', status='$status' WHERE task_id='$taskId'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => 'Task updated successfully']);
} else {
    echo json_encode(['error' => 'Error updating task: ' . $conn->error]);
}

// Close the database connection
$conn->close();
?>
