// Fetch the data from the API endpoint
fetch("http://localhost:3002/projects")
  .then((response) => response.json())
  .then((data) => {
    // Get the dropdown menu element
    const projectsDiv = document.querySelector("#projectsDropdownMenu");

    // Loop through each project and its groups
    data.forEach((project) => {
      const projectDiv = document.createElement("div");
      projectDiv.classList.add("project");

      // Add horizontal line
      projectDiv.innerHTML = "<hr>";

      // Add project name and image
      const projectHeader = document.createElement("h3");
      projectHeader.classList.add("project-header");

      const projectImg = document.createElement("img");
      projectImg.classList.add("project-img");
      projectImg.src = project.image.link;
      const verticalLine = document.createElement("div");
      projectHeader.appendChild(projectImg);
      verticalLine.classList.add("vl");
      projectHeader.appendChild(verticalLine);

      // projectHeader.appendChild(document.createTextNode("\u00A0|\u00A0"));

      const projectName = document.createElement("span");
      projectName.classList.add("project-name");
      projectName.textContent = project.name;
      projectHeader.appendChild(projectName);

      projectDiv.appendChild(projectHeader);

      // Add project groups
      const groupsList = document.createElement("ul");
      groupsList.classList.add("grouplist");
      project.groups.forEach((group) => {
        const groupItem = document.createElement("li");
        groupItem.classList.add("group-name");
        const groupLink = document.createElement("a");
        groupLink.textContent = group.name;
        groupLink.href = group.url;
        groupItem.appendChild(groupLink);
        groupsList.appendChild(groupItem);
      });
      // Add "+ Add Group" button
      const addGroupButton = document.createElement("button");
      addGroupButton.classList.add("add-group");
      addGroupButton.textContent = "+ Add Group";
      groupsList.appendChild(addGroupButton);
      projectDiv.appendChild(groupsList);

      projectsDiv.appendChild(projectDiv);
    });

    // Get the search input element
    const searchInput = document.querySelector(".search-input");

    // Add event listener for input event on search input
    searchInput.addEventListener("input", (event) => {
      if (searchInput.value === "") {
        const activeItems = document.querySelectorAll(".active");
        activeItems.forEach((item) => item.classList.remove("active"));
      }
      // Get the search query from the input element
      const searchQuery = searchInput.value.toLowerCase();
      const body = document.querySelector("body");

      // Toggle the searching class based on whether the search query is empty
      if (searchQuery) {
        body.classList.add("searching");
      } else {
        body.classList.remove("searching");
      }

      // Get all the projects in the dropdown menu
      const projects = document.querySelectorAll(".project");

      // Loop through each project and its groups
      projects.forEach((project, index) => {
        // Get the project name element
        const projectName = project.querySelector(".project-name");

        // Get the project groups element
        const groups = project.querySelector(".grouplist");

        // If either the project name or the groups is not found, skip this project
        if (!projectName || !groups) {
          return;
        }

        // Convert the project name to lowercase for case-insensitive search
        const projectNameText = projectName.textContent.toLowerCase();

        // Search for the search query in the project name
        if (projectNameText.includes(searchQuery)) {
          // Highlight the matched text in the project name
          const highlightedProjectName = highlightText(
            projectNameText,
            searchQuery
          );
          projectName.innerHTML = highlightedProjectName;

          // Show the project name and groups
          project.style.display = "block";
        } else {
          // Hide the project name and groups
          project.style.display = "none";
        }

        // Loop through each group and search for the query in the group name
        const groupNames = groups.querySelectorAll(".group-name");
        groupNames.forEach((groupName) => {
          const groupNameLink = groupName.querySelector("a");
          const groupNameText = groupNameLink.textContent.toLowerCase();

          // Search for the search query in the group name
          if (groupNameText.includes(searchQuery)) {
            // Highlight the matched text in the group name
            const highlightedGroupName = highlightText(
              groupNameText,
              searchQuery
            );
            groupNameLink.innerHTML = highlightedGroupName;

            // Show the group
            groupName.style.display = "block";
            // Also show the project of this group
            project.style.display = "block";
          } else {
            // Hide the group
            groupName.style.display = "none";
          }
        });
        // Add event listeners for arrow key and enter/return key presses
        searchInput.addEventListener("keydown", (event) => {
          const currentGroup = groups.querySelector(".active");
          const groupNames = groups.querySelectorAll(
            ".group-name:not([style*='none'])"
          );

          if (event.key === "ArrowDown") {
            event.preventDefault();

            if (!currentGroup) {
              if (groupNames.length > 0) {
                groupNames[0].classList.add("active");
              }
            } else if (currentGroup.nextElementSibling) {
              currentGroup.classList.remove("active");
              currentGroup.nextElementSibling.classList.add("active");
            }
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (currentGroup && currentGroup.previousElementSibling) {
              currentGroup.classList.remove("active");
              currentGroup.previousElementSibling.classList.add("active");
            }
          } else if (event.key === "Enter" || event.key === "Return") {
            if (currentGroup) {
              const link = currentGroup.querySelector("a");
              if (link) {
                link.click();
              }
            }
          }
        });
      });
    });
    /**
     * Highlights the first matched text in the original text with a yellow background.
     * Returns the highlighted text.
     * @param {string} text - The original text.
     * @param {string} query - The search query to highlight.
     * @returns {string} The highlighted text.
     */
    function highlightText(text, query) {
      const regex = new RegExp(query, "i");
      const match = regex.exec(text);
      if (match) {
        const index = match.index;
        const highlightedText = `${text.slice(
          0,
          index
        )}<span class="highlighted">${text.slice(
          index,
          index + query.length
        )}</span>${text.slice(index + query.length)}`;
        return highlightedText;
      }
      return text;
    }
  })
  .catch((error) => console.error("err", error));
