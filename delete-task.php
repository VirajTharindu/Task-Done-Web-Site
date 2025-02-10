<?php
// delete-task.php
header('Content-Type: application/json');

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Parse the query string to get the task_id
    parse_str($_SERVER['QUERY_STRING'], $params);

    if (isset($params['task_id'])) { // Checking `task_id` instead of `id`
        $taskId = intval($params['task_id']); // Use the correct parameter name
        
        // Connect to the database
        $conn = new mysqli('localhost', 'root', '', 'task_management');

        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'message' => 'Database connection failed']);
            exit;
        }

        // Prepare and execute the DELETE statement
        $stmt = $conn->prepare("DELETE FROM tasks WHERE task_id = ?");
        $stmt->bind_param("i", $taskId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Task deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to delete task']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'No task ID provided']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
