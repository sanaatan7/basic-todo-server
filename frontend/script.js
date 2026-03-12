const form = document.querySelector("#task-form form");
const titleInput = document.querySelector("input");
const descInput = document.querySelector("textarea");
const saveBtn = document.querySelector("#save-btn");
const tasksBtn = document.querySelector("#tasks");
const taskSection = document.querySelector("#task-section");
const taskForm = document.querySelector("#task-form");
const addTaskBtn = document.querySelector("#add-task");

let task = {};

const makeTaskCard = (arr) => {
  let id = 0;
  arr.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.dataset.idx = id;
    id++;
    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.taskDescription}</p>
      <button id="dBtn"> Delete </button>
    `;
    taskSection.appendChild(div);
  });
};

const getAllTasks = () => {
  taskSection.innerHTML = "";
  fetch("/see-tasks")
    .then((response) => response.json())
    .then((data) => makeTaskCard(data));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const taskDetail = descInput.value.trim();
  task.title = title;
  task.taskDescription = taskDetail;
  fetch("/create-todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  task = {};
  titleInput.value = "";
  descInput.value = "";
});

tasksBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskSection.style.display = "flex";
  taskForm.style.display = "none";
  getAllTasks();
});

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  taskSection.style.display = "none";
  taskForm.style.display = "flex";
});

//delete function

taskSection.addEventListener("click", (e) => {
  if (e.target.id === "dBtn") {
    e.stopPropagation();
    const idx = e.target.parentElement.dataset.idx;
    fetch("/del-task", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: idx }),
    }).then(getAllTasks());
  }
});
