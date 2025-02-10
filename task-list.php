<?php
header("Content-Type: application/json");

$host = 'localhost'; // Database host
$user = 'root';      // Database username
$password = '';      // Database password
$dbname = 'task_management'; // Database name

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch tasks
$sql = "SELECT task_id, title, description, priority, status, deadline, assigned_to FROM tasks";
$result = $conn->query($sql);

$tasks = array();

if ($result->num_rows > 0) {
    // Fetch all tasks as an associative array
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
}

// Output tasks as JSON
echo json_encode($tasks);

$conn->close();
?>
