// =========================================================
// planner.js — Academic Planner (interactive task manager)
// Add tasks, mark them completed, delete them, filter them.
// Tasks are kept in an array and saved in localStorage.
// =========================================================

const STORAGE_KEY = "david-planner-tasks";

// The array that holds every task object
let tasks = loadTasks();
let currentFilter = "all";

// DOM references
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const courseInput = document.getElementById("task-course");
const dateInput = document.getElementById("task-date");
const priorityInput = document.getElementById("task-priority");
const titleError = document.getElementById("task-error");
const list = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearBtn = document.getElementById("clear-completed");

// ---------- Storage ----------

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* storage unavailable — fall back to samples */ }

  // Sample tasks shown the first time the page is opened
  return [
    { id: 1, title: "Finish COS 106 term project", course: "COS 106", date: "", priority: "high", done: false },
    { id: 2, title: "Revise HTML tables and forms", course: "COS 106", date: "", priority: "medium", done: true },
    { id: 3, title: "Read chapter 3 — Discrete Maths", course: "MTH 102", date: "", priority: "low", done: false }
  ];
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) { /* ignore if storage is blocked */ }
}

// ---------- Actions ----------

function addTask(title, course, date, priority) {
  const task = {
    id: Date.now(),
    title: title,
    course: course,
    date: date,
    priority: priority,
    done: false
  };
  tasks.unshift(task);
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) task.done = !task.done;
    return task;
  });
  saveTasks();
  render();
}

function deleteTask(id, element) {
  // animate out, then remove from the array
  element.classList.add("removing");
  setTimeout(function () {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    saveTasks();
    render();
  }, 250);
}

function clearCompleted() {
  tasks = tasks.filter(function (task) { return !task.done; });
  saveTasks();
  render();
}

// ---------- Rendering (DOM manipulation) ----------

function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter(function (t) { return !t.done; });
  if (currentFilter === "completed") return tasks.filter(function (t) { return t.done; });
  return tasks;
}

function formatDate(value) {
  if (!value) return "No due date";
  const d = new Date(value + "T00:00:00");
  return "Due " + d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function render() {
  list.innerHTML = "";
  const visible = getVisibleTasks();

  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = currentFilter === "completed"
      ? "No completed tasks yet. You've got this."
      : "Nothing here. Add a task to get started.";
    list.appendChild(empty);
  }

  visible.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "task priority-" + task.priority + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark \"" + task.title + "\" as completed");
    checkbox.addEventListener("change", function () { toggleTask(task.id); });

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.textContent = (task.course ? task.course + " · " : "") + formatDate(task.date) + " · " + task.priority + " priority";

    info.appendChild(title);
    info.appendChild(meta);

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.type = "button";
    del.innerHTML = "&times;";
    del.setAttribute("aria-label", "Delete \"" + task.title + "\"");
    del.addEventListener("click", function () { deleteTask(task.id, li); });

    li.appendChild(checkbox);
    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(function (t) { return t.done; }).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-active").textContent = total - done;
  document.getElementById("stat-done").textContent = done;
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-text").textContent = percent + "% of tasks completed";
}

// ---------- Events ----------

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (title === "") {
    titleError.textContent = "Please enter a task.";
    titleInput.parentElement.classList.add("invalid");
    titleInput.focus();
    return;
  }

  titleError.textContent = "";
  titleInput.parentElement.classList.remove("invalid");
  addTask(title, courseInput.value.trim(), dateInput.value, priorityInput.value);
  form.reset();
  titleInput.focus();
});

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    render();
  });
});

clearBtn.addEventListener("click", clearCompleted);

render();
