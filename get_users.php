<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "task_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL query
$sql = "SELECT username FROM users"; // Assuming 'username' is the column name
$result = $conn->query($sql);

// Check if the query was successful
if (!$result) {
    die("Query failed: " . $conn->error); // This will terminate the script if there's an error
}

$usernames = [];
if ($result->num_rows > 0) {
    // Fetch usernames
    while($row = $result->fetch_assoc()) {
        $usernames[] = $row['username'];
    }
}

// Close the connection
$conn->close();

// Return the usernames as a JSON array
header('Content-Type: application/json'); // Set header to return JSON
echo json_encode($usernames);
?>
