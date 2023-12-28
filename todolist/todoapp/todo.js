//select element
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListEl = document.getElementById("todos-list");
const notificationEL = document.querySelector(".notification");

//vars
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let EditTodoId = -1;
//1st render
renderTodos();

//form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    saveTodo();
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
});

//save TODO
function saveTodo() {
    const todoValue = todoInput.value;

    //check if todo is empty
    const isEmpty = todoValue === "";

    //check for duplicate
    const isDuplicate = todos.some(
        (todo) => todo.value.toUpperCase() === todoValue.toUpperCase()
    );
    if (isEmpty) {
        shaowNotification("Todo's input is empty");
    } else if (isDuplicate) {
        shaowNotification("Todo already exist");
    } else {
        if (EditTodoId >= 0) {
            todos = todos.map((todo, index) => ({
                ...todo,
                value: index === EditTodoId ? todoValue : todo.value,
            }));
            EditTodoId = -1;
        } else {
            todos.push({
                value: todoValue,
                checked: false,
                color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            });
        }

        todoInput.value = "";
    }
}

//RenderTodos
function renderTodos() {
    if (todos.length === 0) {
        todosListEl.innerHTML = "<center>Nothing to do!</center>";
        return;
    }
    //clear element before we render
    todosListEl.innerHTML = "";

    todos.forEach((todo, index) => {
        todosListEl.innerHTML += `
         <div class="todo" id="${index}">
               
                 <i 
                 class="bi ${
                   todo.checked ? "bi-check-circle-fill" : "bi-circle"
                 }"
                 style='color : ${todo.color}'
                 data-action='check'
                 ></i>
                <p class=' ${
                  todo.checked ? "checked" : ""
                }' data-action='check'>${todo.value}</p>
                <i class="bi bi-pencil-square" data-action='edit'></i>
                <i class="bi bi-trash" data-action='delete'></i>
            </div> `;
    });
}
//click eventlistener for all event todos
todosListEl.addEventListener("click", (e) => {
    const target = e.target;
    const parentElement = target.parentNode;

    if (parentElement.className !== "todo") return;
    //to do id

    const todo = parentElement;
    const todoId = Number(todo.id);
    //target action
    const action = target.dataset.action;
    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
    action === "delete" && deleteTodo(todoId);

    console.log(todoId, action);
});

//check to do funct
function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Edit a todo
function editTodo(todoId) {
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
}

// delete todo
function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;
    //re-render
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
}
//show notification
function shaowNotification(msg) {
    //change the message of the notification
    notificationEL.innerHTML = msg;

    //notification enter
    notificationEL.classList.add("notif-enter");

    //notification  leave

    setTimeout(() => {
        notificationEL.classList.remove("notif-enter");
    }, 1000);
}