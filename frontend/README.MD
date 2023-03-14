This is a JavaScript code that fetches data from an API endpoint and creates a dropdown menu with projects and their groups. It also adds a search functionality to the menu, allowing the user to search for specific projects or groups.

The code uses the fetch method to make a request to the API endpoint, and then processes the returned data using the json method. It then creates a div element for each project and its groups, and adds them to the dropdown menu. It also adds a search input element and an event listener for the input event, which triggers a search for the inputted query string in the project and group names.

If a match is found, the matched text is highlighted using a yellow background. If the search query is empty, the menu is reset to its original state.

The code also includes a highlightText function that takes a string and a query and returns the string with the first matched text highlighted with a yellow background.

<h2>Usage</h2>

1. clone this repo to your local machine

2. inside the backend folder open a terminal and run npm start

3. inside the frontend folder open index.html with a browser
