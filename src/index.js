document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-task-form");
  const input = document.getElementById("new-task-description");
  const taskList = document.getElementById("tasks");
  const prioritySelect = document.getElementById("priority");
  const dueDateInput = document.getElementById("due-date");

  form.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent page reload

      const taskText = input.value.trim();
      const dueDate = dueDateInput.value;
      if (taskText === "") return;

      const taskItem = document.createElement("li");
      taskItem.innerHTML = `${taskText} <small>${dueDate ? "(Due: " + dueDate + ")" : ""}</small>`;

      // Set priority color
      const priority = prioritySelect.value;
      if (priority === "high") taskItem.style.color = "red";
      if (priority === "medium") taskItem.style.color = "orange";
      if (priority === "low") taskItem.style.color = "green";

      // Create Edit Button
      const editButton = document.createElement("button");
      editButton.textContent = "✏️";
      editButton.addEventListener("click", () => {
          const newText = prompt("Edit task:", taskText);
          if (newText) {
              taskItem.innerHTML = `${newText} <small>${dueDate ? "(Due: " + dueDate + ")" : ""}</small>`;
              taskItem.appendChild(editButton);
              taskItem.appendChild(deleteButton);
          }
      });

      // Create Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.addEventListener("click", () => taskItem.remove());

      // Append buttons to task item
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);

      // Insert task in sorted order
      insertTaskByPriority(taskItem);

      // Clear input fields
      input.value = "";
      dueDateInput.value = "";
  });

  // Function to insert task based on priority
  function insertTaskByPriority(taskItem) {
      let inserted = false;
      const tasks = taskList.children;
      for (let i = 0; i < tasks.length; i++) {
          const taskPriority = tasks[i].style.color;
          if (
              (taskItem.style.color === "red" && taskPriority !== "red") ||
              (taskItem.style.color === "orange" && taskPriority === "green")
          ) {
              taskList.insertBefore(taskItem, tasks[i]);
              inserted = true;
              break;
          }
      }
      if (!inserted) taskList.appendChild(taskItem);
  }
});

