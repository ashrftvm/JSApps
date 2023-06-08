// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');
    let classVal = "pending";
    let textVal = "Pending"
    if(task.completed){
        classVal = "completed" 
        textVal = "Completed"
    }
    taskCard.classList.add(classVal)

    const taskText = document.createElement('p');
    taskText.innerText = task.text;

    const taskStatus = document.createElement('p');
    taskStatus.classList.add('status');
    taskStatus.innerText = textVal

    const toggleButton = document.createElement('button');
    toggleButton.classList.add("button-box")
    const btnContentEl = document.createElement("span")
    btnContentEl.classList.add("green")
    btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
    toggleButton.appendChild(btnContentEl)
    toggleButton.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("button-box")
    const delBtnContentEl = document.createElement("span")
    delBtnContentEl.classList.add("red")
    delBtnContentEl.innerText = 'Delete';
    deleteButton.appendChild(delBtnContentEl)
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskCard.appendChild(taskText);
    taskCard.appendChild(taskStatus);
    taskCard.appendChild(toggleButton);
    taskCard.appendChild(deleteButton);

    taskContainer.appendChild(taskCard);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    renderTasks();
  }
}

// Add event listener to the form submit event
document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);

// Initial rendering of tasks
renderTasks();
