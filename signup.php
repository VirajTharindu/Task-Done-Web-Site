<?php
header('Content-Type: application/json');

// Turn off error display and log errors to a file
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php-error.log');

// Database connection
$servername = 'localhost';
$username = 'root';
$password = ''; // Your database password
$dbname = 'task_management'; // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Check if the form data is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'] ?? null;
    $username = $_POST['username'] ?? null;
    $company_id = $_POST['company_id'] ?? null;
    $email = $_POST['email'] ?? null;
    $role = $_POST['role'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $dob = $_POST['dob'] ?? null;
    $address = $_POST['address'] ?? null;
    $bio = $_POST['bio'] ?? null;
    $password = $_POST['password'] ?? null;

    // Validate required fields
    if (empty($name) || empty($username) || empty($company_id) || empty($email) || empty($password)) {
        echo json_encode(["error" => "All required fields must be filled."]);
        exit;
    }

    // Hash the password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Profile picture handling (optional)
    $profile_pic_url = null;
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] == 0) {
        $upload_dir = "uploads/profile_pics/";
        $profile_pic_name = time() . "_" . basename($_FILES['profile_pic']['name']);
        $profile_pic_path = $upload_dir . $profile_pic_name;

        // Create the upload directory if it doesn't exist
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        // Move uploaded file to server folder
        if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $profile_pic_path)) {
            $profile_pic_url = $profile_pic_path;
        } else {
            echo json_encode(["error" => "Failed to upload profile picture."]);
            exit;
        }
    }

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare(
        "INSERT INTO users (name, username, company_id, email, password_hash, role, phone_number, address, date_of_birth, bio, profile_picture_url, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
    );

    // Bind parameters to SQL query
    $stmt->bind_param(
        "ssissssssss",
        $name,
        $username,
        $company_id,
        $email,
        $password_hash,
        $role,
        $phone,
        $address,
        $dob,
        $bio,
        $profile_pic_url
    );

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["success" => "User registered successfully."]);
    } else {
        echo json_encode(["error" => "Error: " . $stmt->error]);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid request method."]);
}

// Close the connection
$conn->close();
?>
