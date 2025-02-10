document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');  // Debugging statement

    // Function to get task details
    async function fetchTaskDetails(taskId) {
        console.log(`Fetching task details for task ID: ${taskId}`);  // Debugging statement

        try {
            const response = await fetch(`get-task.php?task_id=${taskId}`);
            console.log('Response received from get-task.php:', response);  // Debugging statement

            const data = await response.json();
            console.log('Data received:', data);  // Debugging statement

            if (data.error) {
                console.error('Error from server:', data.error);  // Debugging statement
                alert(data.error); // Handle error if task not found
            } else {
                console.log('Populating form with task data:', data);  // Debugging statement
                // Populate the form fields with task data
                document.getElementById('title').value = data.title;
                document.getElementById('description').value = data.description;
                document.getElementById('priority').value = data.priority;
                document.getElementById('deadline').value = data.deadline;
                document.getElementById('assign-to-user').value = data.assigned_to;
                document.getElementById('status').value = data.status;
            }
        } catch (error) {
            console.error('Error fetching task details:', error);  // Debugging statement
        }
    }




    // Function to update task
    async function updateTask(event) {
        event.preventDefault(); // Prevent the default form submission


    // Get the task_id from localStorage (assuming it's stored there)
    const taskId = localStorage.getItem('editTaskId'); // Retrieve the task_id stored during the edit process

    if (!taskId) {
        alert('Task ID not found! Cannot update task.');
        return;
    }

        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.getElementById('priority').value;
        const deadline = document.getElementById('deadline').value;
        const assignedTo = document.getElementById('assign-to-user').value;
        const status = document.getElementById('status').value;

        const updatedTask = {
            
            task_id: taskId,
            title: title,
            description: description,
            priority: priority,
            deadline: deadline,
            assigned_to: assignedTo,
            status: status,
        };

        console.log('Sending updated task data:', updatedTask);  // Debugging statement

        try {
            const response = await fetch('update-task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            const result = await response.json();
            console.log('Response from update-task.php:', result);  // Debugging statement

            if (result.error) {
                alert('Error updating task: ' + result.error);
            } else {
                alert('Task updated successfully!');
                // Optionally redirect to task list or another page
                window.location.href = 'task-list.html'; // Redirect to task list
            }
        } catch (error) {
            console.error('Error updating task:', error);  // Debugging statement
            alert('Error updating task: ' + error.message);
        }
    }


    

    // Get the task ID from localStorage
    const taskId = localStorage.getItem('editTaskId');
    console.log('Task ID from localStorage:', taskId);  // Debugging statement

    if (taskId) {
        console.log('Task ID found, fetching task details...');  // Debugging statement
        fetchTaskDetails(taskId); // Fetch task details if taskId exists

        // Add event listener for form submission
        const form = document.getElementById('create-task-form');
        form.addEventListener('submit', updateTask); // Listen for form submission

    } else {
        console.warn("No task ID provided.");  // Debugging statement
        alert("No task ID provided.");
    }
    
});
