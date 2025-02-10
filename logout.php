<?php
session_start();

// Destroy all session variables
session_unset();

// Destroy the session itself
session_destroy();

// Send a success response
echo json_encode(["success" => "Logged out successfully."]);
?>
