document.getElementById('create-task-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Collect form data from the form

    fetch('create-task.php', {
        method: 'POST',
        body: formData // No need to stringify; just pass FormData
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        if (data.success) {

             // Show success alert before redirecting
             alert('A New Task has been successfully added to the task list!');

            // Redirect to the task list page if the task was created successfully
            window.location.href = 'task-list.html';
        } else {
            // Display error message if something went wrong
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error creating the task.');
    });
});
