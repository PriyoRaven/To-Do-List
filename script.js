document.addEventListener("DOMContentLoaded", function() {

  // Retrieve the necessary elements
  const taskInput = document.getElementById("task-input");
  const addTaskButton = document.getElementById("add-task-button");
  const filterItems = document.querySelectorAll(".filter-item");
  const filterAll = document.getElementById("filter-all");
  const filterCompleted = document.getElementById("filter-completed");
  const filterPending = document.getElementById("filter-pending");
  const taskList = document.querySelector(".task-list");

  // For the background
  var randomNumber = Math.floor(Math.random() * 4) + 1; //1 to 4
  var randomImage = "wallpaper" + randomNumber + ".jpg"
  var randomImgSrc = "wallpaper/" + randomImage;
  var image = document.getElementsByClassName("backwallpaper")[0];
  image.setAttribute("src", randomImgSrc);

  // Event listener for adding a task
  addTaskButton.addEventListener("click", addTask);

  // Event listeners for filtering
  filterAll.addEventListener("click", function () {
    filterTasks("all");
  });
  filterCompleted.addEventListener("click", function () {
    filterTasks("completed");
  });
  filterPending.addEventListener("click", function () {
    filterTasks("pending");
  });

  // Function to add a new task
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const newTask = createTaskElement(taskText);
      taskList.appendChild(newTask);
      taskInput.value = "";
    }
  }

  // Function to create a new task element
  function createTaskElement(taskText) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskTextContainer = document.createElement("div");
    taskTextContainer.classList.add("task-text");
    taskTextContainer.innerText = taskText;

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");

    const editButton = document.createElement("i");
    editButton.classList.add("fas", "fa-edit", "edit");
    editButton.addEventListener("click", function () {
      editTask(taskTextContainer);
    });

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash-alt", "delete");
    deleteButton.addEventListener("click", function () {
      deleteTask(taskItem);
    });

    const doneButton = document.createElement("i");
    doneButton.classList.add("fas", "fa-check-circle", "done");
    doneButton.addEventListener("click", function () {
      markAsDone(taskItem);
    });

    actionButtons.appendChild(editButton);
    actionButtons.appendChild(deleteButton);
    actionButtons.appendChild(doneButton);

    taskItem.appendChild(taskTextContainer);
    taskItem.appendChild(actionButtons);

    return taskItem;
  }

  // Function to edit a task
  function editTask(taskTextContainer) {
    const newTaskText = prompt("Enter the new todo description:");
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskTextContainer.innerText = newTaskText.trim();
    }
  }

  // Function to delete a task
  function deleteTask(taskItem) {
    taskItem.remove();
  }

  // Function to mark a task as done
  function markAsDone(taskItem) {
    taskItem.classList.toggle("completed");
  }

  // Function to filter tasks
  function filterTasks(filter) {
    const taskItems = document.querySelectorAll(".task-item");
    filterItems.forEach(function (filterItem) {
      filterItem.classList.remove("active");
    });
    document.getElementById(`filter-${filter}`).classList.add("active");

    taskItems.forEach(function (taskItem) {
      switch (filter) {
        case "completed":
          if (taskItem.classList.contains("completed")) {
            taskItem.style.display = "block";
          } else {
            taskItem.style.display = "none";
          }
          break;
        case "pending":
          if (!taskItem.classList.contains("completed")) {
            taskItem.style.display = "block";
          } else {
            taskItem.style.display = "none";
          }
          break;
        default:
          taskItem.style.display = "block";
      }
    });
  }
});