<?php
// Database connection (replace with your actual database credentials)
$host = "localhost";
$username = "root";
$password = "";
$dbname = "task_management";

// Establish a connection to the database
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['task_id'])) {
    $task_id = $_GET['task_id'];

    // Prepare SQL query to fetch task details
    $sql = "SELECT * FROM tasks WHERE task_id = ?";
    $stmt = $conn->prepare($sql);

    // Check if the statement was successfully prepared
    if ($stmt === false) {
        die('Error preparing the SQL query: ' . $conn->error);
    }

    $stmt->bind_param("i", $task_id);  // "i" specifies that the task_id is an integer
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch task details
        $task = $result->fetch_assoc();
        echo json_encode($task); // Return task data as JSON
    } else {
        echo json_encode(["error" => "Task not found."]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "No task ID provided."]);
}

$conn->close();
?>
