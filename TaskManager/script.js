// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskManagerContainer = document.querySelector(".taskManager");
const confirmEl = document.querySelector(".confirm");
const confirmedBtn = confirmEl.querySelector(".confirmed");
const cancelledBtn = confirmEl.querySelector(".cancel");
let indexToBeDeleted = null

// Add event listener to the form submit event
document.getElementById('taskForm').addEventListener('submit', handleFormSubmit);

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

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial rendering of tasks
renderTasks();


// Function to render tasks
function renderTasks() {
  const taskContainer = document.getElementById('taskContainer');
  taskContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskCard = document.createElement('div');
    taskCard.classList.add('taskCard');
    let classVal = "pending";
    let textVal = "Pending"
    if (task.completed) {
      classVal = "completed";
      textVal = "Completed";
    }
    taskCard.classList.add(classVal);

    const taskText = document.createElement('p');
    taskText.innerText = task.text;

    const taskStatus = document.createElement('p');
    taskStatus.classList.add('status');
    taskStatus.innerText = textVal;

    const toggleButton = document.createElement('button');
    toggleButton.classList.add("button-box");
    const btnContentEl = document.createElement("span");
    btnContentEl.classList.add("green");
    btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';
    toggleButton.appendChild(btnContentEl);
    toggleButton.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add("button-box");
    const delBtnContentEl = document.createElement("span");
    delBtnContentEl.classList.add("red");
    delBtnContentEl.innerText = 'Delete';
    deleteButton.appendChild(delBtnContentEl);
    deleteButton.addEventListener('click', () => {
      indexToBeDeleted = index
      confirmEl.style.display = "block";
      taskManagerContainer.classList.add("overlay");
    });

    taskCard.appendChild(taskText);
    taskCard.appendChild(taskStatus);
    taskCard.appendChild(toggleButton);
    taskCard.appendChild(deleteButton);

    taskContainer.appendChild(taskCard);
  });
}

// function to delete the selected task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

confirmedBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
  deleteTask(indexToBeDeleted)
});

cancelledBtn.addEventListener("click", () => {
  confirmEl.style.display = "none";
  taskManagerContainer.classList.remove("overlay");
});
