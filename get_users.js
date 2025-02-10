document.addEventListener('DOMContentLoaded', function () {
    const assignToUserInput = document.getElementById('assign-to-user');
    const suggestionsContainer = document.getElementById('suggestions');

    console.log('DOM fully loaded and parsed.'); // Debugging statement

    // Function to fetch usernames from the server
    async function fetchUsernames(query) {
        console.log(`Fetching usernames for query: ${query}`); // Debugging statement
        try {
            const response = await fetch('get_users.php'); // Fetch the usernames
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const usernames = await response.json(); // Parse the JSON response
            console.log('Usernames fetched:', usernames); // Debugging statement
            displaySuggestions(usernames, query); // Display suggestions based on input
        } catch (error) {
            console.error('Error fetching usernames:', error);
        }
    }

    // Function to display suggestions
    function displaySuggestions(usernames, query) {
        console.log('Displaying suggestions...'); // Debugging statement
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions
        const filteredUsernames = usernames.filter(username =>
            username.toLowerCase().includes(query.toLowerCase()) // Filter usernames based on input
        );

        console.log('Filtered usernames:', filteredUsernames); // Debugging statement

        // If there are no matches, hide the suggestions container
        if (filteredUsernames.length === 0) {
            console.log('No matches found. Hiding suggestions.'); // Debugging statement
            suggestionsContainer.style.display = 'none';
            return;
        }

        // Create suggestion items
        filteredUsernames.forEach(username => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = username;
            suggestionItem.classList.add('suggestion-item');

            // Add click event to suggestion item
            suggestionItem.addEventListener('click', function () {
                console.log(`User selected: ${username}`); // Debugging statement
                assignToUserInput.value = username; // Set input value to the selected username
                suggestionsContainer.style.display = 'none'; // Hide suggestions after selection
            });

            suggestionsContainer.appendChild(suggestionItem); // Append suggestion item to container
        });

        // Display the suggestions container
        suggestionsContainer.style.display = 'block';
        console.log('Suggestions displayed.'); // Debugging statement
    }

    // Event listener for input changes
    assignToUserInput.addEventListener('input', function () {
        const query = this.value; // Get the current input value
        console.log(`Input changed: ${query}`); // Debugging statement
        if (query.length > 0) {
            fetchUsernames(query); // Fetch usernames if there's input
        } else {
            console.log('Input is empty. Clearing suggestions.'); // Debugging statement
            suggestionsContainer.innerHTML = ''; // Clear suggestions if input is empty
            suggestionsContainer.style.display = 'none'; // Hide suggestions
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (event) {
        if (!assignToUserInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            console.log('Click detected outside input. Hiding suggestions.'); // Debugging statement
            suggestionsContainer.style.display = 'none'; // Hide suggestions
        }
    });
});
