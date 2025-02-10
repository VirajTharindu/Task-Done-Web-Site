document.addEventListener('DOMContentLoaded', function () {

document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', (event) => {
        const taskId = event.target.getAttribute('data-task-id');
        
        // Ask for confirmation before deleting
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;
        
        // Send delete request to the server with the task ID as a query parameter
        fetch(`delete-task.php?task_id=${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            if (data.success) {
                alert("Task deleted successfully");
                fetchTasks(); // Refresh task list after deletion
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
            alert("Failed to delete task. Try again.");
        });
    });
});

});