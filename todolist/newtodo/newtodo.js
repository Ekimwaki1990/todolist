const input = document.getElementById("input-todo");
const inputbtn = document.getElementById("add-button");
const outputTodo = document.getElementById("new-todos");
const todo = document.getElementById("todo");
const notificationEL = document.getElementById("notification");
// todo button

inputbtn.addEventListener("click", function(e) {
    e.preventDefault();
    if (input.value.length == "") {
        return alert("todo is empty");
    }

    //append new todo

    const newTodo = document.createElement("div");
    newTodo.classList.add("new-todo");
    outputTodo.appendChild(newTodo);

    const todotext = document.createElement("p");
    todotext.innerText = input.value;

    newTodo.appendChild(todotext);

    //delete button
    const deletebtn = document.createElement("span");
    deletebtn.innerHTML = '<i class="bi bi-file-x"></i>';
    newTodo.appendChild(deletebtn);
    //edit button
    const editbtn = document.createElement("span");
    editbtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
    newTodo.appendChild(editbtn);

    //delete button
    deletebtn.addEventListener("click", function() {
        const parent = deletebtn.parentElement;
        parent.parentElement.removeChild(parent);
    });

    //edit button
    editbtn.addEventListener("click", (e) => {
        input.value = todotext.innerText;
        const parent = editbtn.parentElement;
    });
    //doto text edit
    todotext.addEventListener("dblclick", (e) => {
        todotext.classList.add("line-through");
        editbtn.setAttribute("disabled", "disabled");
    });

    function empty() {
        const todoValue = input.value;
        const isEmpty = todoValue == "";
        if (isEmpty) {
            shaowNotification("todo is empty");
        }
    }

    input.value = "";
});