document.addEventListener('DOMContentLoaded', function () {

    
    // Set active class for navbar links
    const navLinks = document.querySelectorAll('.navbar a');
    function setActiveClass() {
        const currentPage = window.location.pathname;
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPage || (linkPath.includes('index.html') && currentPage === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveClass();



    if (window.location.pathname.includes('task-list.html')) {
        let filteredTasks = []; // To store the filtered and sorted tasks
    
        const tasksPerPage = 10; // Change this value to display more or fewer tasks per page
        let currentPage = 1;


        let tasks = []; // Global array for tasks
    
        // Function to fetch tasks from the database
        async function fetchTasks() {
            try {
                const response = await fetch('task-list.php'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                tasks = await response.json(); // Store fetched tasks in the global `tasks` array
                filteredTasks = tasks; // Initially assign all tasks to filteredTasks
                renderTasks(); // Initial render with fetched tasks
                
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }
    
        // Function to render tasks for the current page
        function renderTasks() {
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = ""; // Clear existing tasks
    
            const start = (currentPage - 1) * tasksPerPage;
            const end = start + tasksPerPage;
            const currentTasks = filteredTasks.slice(start, end);
    
            currentTasks.forEach(task => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${task.task_id}</td>
                    <td>${task.title}</td>
                    <td class="description-column">${task.description}</td>
                    <td>${task.priority}</td>
                    <td>${task.status}</td>
                    <td>${task.deadline}</td>
                    <td>${task.assigned_to}</td>
                    <td>
                        <button class="btn btn-edit" data-task-id="${task.task_id}">Edit</button>
                        <button class="btn btn-delete" data-task-id="${task.task_id}">Delete</button>
                    </td>
                `;
                taskList.appendChild(row);
            });
    
            document.getElementById("page-info").textContent = `Page ${currentPage}`;
            document.getElementById("prev-page").disabled = currentPage === 1;
            document.getElementById("next-page").disabled = currentPage === Math.ceil(filteredTasks.length / tasksPerPage);


            // Add event listener to Edit buttons
            document.querySelectorAll('.btn-edit').forEach(button => {
            button.addEventListener('click', (event) => {
            const taskId = event.target.getAttribute('data-task-id');
            // Store task_id in localStorage and redirect to update page
            localStorage.setItem('editTaskId', taskId);
            window.location.href = 'update-task.html';
            });
            }); 


            // Add event listener to Delete buttons
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', (event) => {
                    const taskId = event.target.getAttribute('data-task-id');
                    deleteTask(taskId); // Call delete function when clicked
                    });
                });
            }   



        
        // Function to delete a task
        async function deleteTask(taskId) {
            // Confirm with the user before deleting
            const userConfirmed = confirm("Are you sure you want to delete this task?");
            if (!userConfirmed) return;

            try {
                console.log(`Attempting to delete task with ID: ${taskId}`); // Debugging: Check the task ID being passed

                // Send a request to the backend to delete the task
                const response = await fetch(`delete-task.php?task_id=${taskId}`, { // Modified to pass `task_id`
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Debugging: Check the status of the response
                console.log('Response status:', response.status);

                if (!response.ok) {
                    console.log('Error response body:', await response.text()); // Debugging: Log any error response body
                    throw new Error('Failed to delete task.');
                }

                // Debugging: Log successful task deletion response
                console.log(`Task with ID: ${taskId} deleted successfully.`);

                // Remove the task from the filteredTasks array (assuming it was already filtered)
                filteredTasks = filteredTasks.filter(task => task.task_id != taskId);

                // Debugging: Log the current state of the filteredTasks array after deletion
                console.log('Filtered tasks after deletion:', filteredTasks);

                // Re-render the tasks to update the UI
                renderTasks();

                // Show success alert
                alert("Task successfully deleted.");
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error deleting the task. Please try again later.');
            }
        }


    
        // Function to filter tasks based on selected status and priority
        const statusFilter = document.getElementById('status-filter');
        const priorityFilter = document.getElementById('priority-filter');
    
        function filterTasks() {
            const selectedStatus = statusFilter.value.toLowerCase();
            const selectedPriority = priorityFilter.value.toLowerCase();
    
            // Filter tasks based on selected filters
            filteredTasks = tasks.filter(task => {
                const taskStatus = task.status.toLowerCase();
                const taskPriority = task.priority.toLowerCase();
    
                const statusMatch = (selectedStatus === 'all' || taskStatus === selectedStatus);
                const priorityMatch = (selectedPriority === 'all' || taskPriority === selectedPriority);
    
                return statusMatch && priorityMatch;
            });
    
            // Reset to the first page after filtering
            currentPage = 1;
            renderTasks();
        }
    
        // Event listeners for the filters
        statusFilter.addEventListener('change', filterTasks);
        priorityFilter.addEventListener('change', filterTasks);
    
        // Event listeners for the pagination buttons
        document.getElementById("prev-page").addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                renderTasks();
            }
        });
    
        document.getElementById("next-page").addEventListener("click", () => {
            if (currentPage < Math.ceil(filteredTasks.length / tasksPerPage)) {
                currentPage++;
                renderTasks();
            }
        });
    
        // Task ID sorting
        let isDescendingTaskId = true; // Track Task ID sorting order
        const taskIdHeader = document.getElementById('task-id-header');
    
        // Event listener for Task ID header click
        taskIdHeader.addEventListener('click', () => {
            const confirmationMessage = isDescendingTaskId 
                ? 'Need to display Newest Tasks?' 
                : 'Need to display Oldest Tasks?';
    
            const userConfirmed = confirm(confirmationMessage);
    
            if (!userConfirmed) {
                return; // If user cancels, do nothing
            }
    
            // Sort tasks by Task ID
            filteredTasks.sort((a, b) => isDescendingTaskId ? b.task_id - a.task_id : a.task_id - b.task_id);
            isDescendingTaskId = !isDescendingTaskId; // Toggle sorting order
            currentPage = 1; // Reset to the first page
            renderTasks(); // Re-render tasks
        });
    
        // Deadline sorting
        let isDescendingDeadline = true; // Track Deadline sorting order
        const deadlineHeader = document.getElementById('deadline-header');
    
        // Event listener for Deadline header click
        deadlineHeader.addEventListener('click', () => {
            const confirmationMessage = isDescendingDeadline 
                ? 'Need to display Furthest Deadlines?' 
                : 'Need to display Nearest Deadlines?';
    
            const userConfirmed = confirm(confirmationMessage);
    
            if (!userConfirmed) {
                return; // If user cancels, do nothing
            }
    
            // Sort tasks by Deadline
            filteredTasks.sort((a, b) => {
                const deadlineA = new Date(a.deadline);
                const deadlineB = new Date(b.deadline);
                return isDescendingDeadline ? deadlineB - deadlineA : deadlineA - deadlineB;
            });
    
            isDescendingDeadline = !isDescendingDeadline; // Toggle sorting order
            currentPage = 1; // Reset to the first page
            renderTasks(); // Re-render tasks
        });
    
        // Fetch tasks on page load
        fetchTasks();
    }
    
    



   





    
});
