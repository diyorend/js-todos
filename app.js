// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions

function addTodo(event) {
  event.preventDefault();
  if (todoInput.value === "") {
    alert("Write a Task");
  } else {
    // prevent form from submitting

    //Todo DIV
    const todoDIV = document.createElement("div");
    todoDIV.classList.add("todo");
    todoList.appendChild(todoDIV);

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todoInput.value;
    //Set LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    todoInput.value = "";
    todoDIV.appendChild(newTodo);

    //check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = `<i class="fas fa-check"></i>`;
    completeButton.classList.add("complete-btn");
    todoDIV.appendChild(completeButton);
    //delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDIV.appendChild(trashButton);
  }
}

function deleteCheck(event) {
  const item = event.target;
  let todo = item.parentElement;

  // delete li
  if (item.classList[0] === "trash-btn") {
    // remove animation
    todo.classList.add("fall");

    //remove local storage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }
  // check li
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

// filter
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        // if (todo.classList.contains("completed")) {
        //   todo.style.display = "none";
        // } else {
        //   todo.style.display = "flex";
        // }
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Local storage
function saveLocalTodos(todo) {
  let todos;
  // Check -- do I already have thing in there
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  // Check -- do I already have thing in there
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //Todo DIV
    const todoDIV = document.createElement("div");
    todoDIV.classList.add("todo");
    todoList.appendChild(todoDIV);

    // Create LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoInput.value = "";
    todoDIV.appendChild(newTodo);

    //check button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = `<i class="fas fa-check"></i>`;
    completeButton.classList.add("complete-btn");
    todoDIV.appendChild(completeButton);
    //delete button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDIV.appendChild(trashButton);
  });
}
// Remove todo from local storage
function removeLocalTodos(todo) {
  let todos;
  // Check -- do I already have thing in there
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
