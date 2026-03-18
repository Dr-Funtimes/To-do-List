let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("task-info");

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        };

        const date = document.createElement("span");
        date.classList.add("task-date");
        date.textContent = task.dueDate ? "Due: " + task.dueDate : "";

        infoDiv.appendChild(span);
        infoDiv.appendChild(date);

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.onclick = () => {
            const newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText.trim();
            }

            const newDate = prompt("Edit due date (YYYY-MM-DD):", task.dueDate || "");
            if (newDate !== null) {
                task.dueDate = newDate;
            }

            saveTasks();
            renderTasks();
        };

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(infoDiv);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const dateInput = document.getElementById("dueDate");

    const text = input.value.trim();
    const dueDate = dateInput.value;

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false,
        dueDate: dueDate
    });

    input.value = "";
    dateInput.value = "";

    saveTasks();
    renderTasks();
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

renderTasks();
