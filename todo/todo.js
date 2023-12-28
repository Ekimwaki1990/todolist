const textInputField = document.getElementById("input-area");
const addButton = document.getElementById("add-icon");
const todosContainer = document.getElementById("output-section");

addButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (textInputField.value.length == "") {
        return alert("input is empty");
    }
    const todoItemContainer = document.createElement("div");
    todoItemContainer.classList.add("todo-item-container");

    todosContainer.appendChild(todoItemContainer);

    const todoText = document.createElement("p");
    todoText.id = "todo-text";
    todoText.innerText = textInputField.value;
    todoItemContainer.appendChild(todoText);

    //create a delete button

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="bi bi-trash3-fill">';
    deleteButton.classList.add("delete-btn");

    todoItemContainer.appendChild(deleteButton);
    //create a edit button

    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="bi bi-pencil-square">';
    editButton.classList.add("edit-btn");

    todoItemContainer.appendChild(editButton);

    textInputField.value = "";

    todoText.addEventListener("dblclick", (e) => {
        todoText.classList.add("line-through");
        editButton.setAttribute("disabled", "disabled");
    });

    editButton.addEventListener("click", (e) => {
        textInputField.value = todoText.innerText;
        const parent = editButton.parentElement;
        parent.parentElement.removeChild(parent);
    });

    deleteButton.addEventListener("click", (e) => {
        const parent = deleteButton.parentElement;
        parent.parentElement.removeChild(parent);
    });
});

//add a delete function