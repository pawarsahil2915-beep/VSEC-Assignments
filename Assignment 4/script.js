const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {

    let task = taskInput.value;

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        <span>${task}</span>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
    `;

    li.querySelector("span").onclick = function() {
        li.classList.toggle("completed");
    };

    taskList.appendChild(li);

    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
}