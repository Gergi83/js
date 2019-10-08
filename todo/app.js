const form = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos-list");
const clearBtn = document.querySelector(".clear-todos");
const todoInput = document.querySelector("#todo");

loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addTodo);
  todoList.addEventListener("click", removeTodo);
  clearBtn.addEventListener("click", clearTodos);
}

function addTodo(e) {
  if (todoInput.value === "") {
    alert("Add something todo");
  }
  const li = document.createElement("li");
  li.className = "todo";
  li.appendChild(document.createTextNode(todoInput.value));
  const link = document.createElement("a");
  link.className = "delete-todo secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  todoList.appendChild(li);
  todoInput.value = "";
  e.preventDefault();
}

function removeTodo(e) {
  if (e.target.parentElement.classList.contains("delete-todo")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTodos() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}
