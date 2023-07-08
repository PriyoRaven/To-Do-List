document.addEventListener('DOMContentLoaded', function() {
    var inputField = document.getElementById('task-input');
    var addButton = document.getElementById('add-task-button');
    var filterButtons = document.querySelectorAll('.filter-item');
    var taskList = document.querySelector('.task-list');
  
    addButton.addEventListener('click', function() {
      var taskDescription = inputField.value;
  
      if (taskDescription.trim() !== '') {
        var taskItem = document.createElement('li');
        taskItem.textContent = taskDescription;
  
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-button');
        taskItem.appendChild(deleteButton);
  
        var editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add('edit-button');
        taskItem.appendChild(editButton);
  
        taskList.appendChild(taskItem);
  
        inputField.value = '';
      }
    });
  
    taskList.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
      }
  
      if (event.target.classList.contains('delete-button')) {
        var listItem = event.target.parentNode;
        listItem.remove();
      }
  
      if (event.target.classList.contains('edit-button')) {
        var listItem = event.target.parentNode;
        var taskText = listItem.firstChild.textContent;
  
        var updatedText = prompt('Edit the task:', taskText);
        if (updatedText !== null && updatedText.trim() !== '') {
          listItem.firstChild.textContent = updatedText;
        }
      }
    });
  
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        filterButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
  
        this.classList.add('active');
  
        var filterValue = this.id.replace('filter-', '');
  
        taskList.querySelectorAll('li').forEach(function(item) {
          item.style.display = 'block';
  
          if (filterValue === 'completed' && !item.classList.contains('completed')) {
            item.style.display = 'none';
          } else if (filterValue === 'pending' && item.classList.contains('completed')) {
            item.style.display = 'none';
          }
        });
      });
    });
  });
  