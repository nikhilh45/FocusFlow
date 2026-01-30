let is24Hour = true;
let isDarkMode = false;

const clock = document.getElementById("clock");
const formatBtn = document.getElementById("formatBtn");
const themeBtn = document.getElementById("themeBtn");

const bgUpload = document.getElementById("bgUpload");

const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* CLOCK */
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    let period = "";

    if (!is24Hour) {
        period = hours >= 12 ? " PM" : " AM";
        hours = hours % 12 || 12;
    }

    clock.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") +
        period;
}

setInterval(updateClock, 1000);
updateClock();

/* FORMAT TOGGLE */
formatBtn.addEventListener("click", () => {
    is24Hour = !is24Hour;
    formatBtn.textContent = is24Hour ? "Switch to 12-Hour" : "Switch to 24-Hour";
});

/* THEME TOGGLE */
themeBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark");
    themeBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
});

/* BACKGROUND IMAGE */
bgUpload.addEventListener("change", () => {
    const file = bgUpload.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        document.body.style.backgroundImage = `url(${reader.result})`;
        localStorage.setItem("bgImage", reader.result);
    };

    if (file) reader.readAsDataURL(file);
});

// Load saved background
const savedBg = localStorage.getItem("bgImage");
if (savedBg) {
    document.body.style.backgroundImage = `url(${savedBg})`;
}

/* TASK FUNCTIONS */
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.name} — ${task.date}`;
        li.onclick = () => removeTask(index);
        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const name = taskInput.value.trim();
    const date = dateInput.value;

    if (!name || !date) return;

    tasks.push({ name, date });
    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
renderTasks();
const greeting = document.getElementById("greeting");

function updateGreeting() {
    const hour = new Date().getHours();
    let text = "";

    if (hour < 12) text = "Good Morning ☀️";
    else if (hour < 18) text = "Good Afternoon 🌤️";
    else text = "Good Evening 🌙";

    greeting.textContent = text;
}

updateGreeting();
const focusInput = document.getElementById("focusInput");

// Load saved focus
focusInput.value = localStorage.getItem("dailyFocus") || "";

// Save while typing
focusInput.addEventListener("input", () => {
    localStorage.setItem("dailyFocus", focusInput.value);
});
function renderTasks() {
    taskList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = `${task.name} — ${task.date}`;

        if (task.date < today) {
            li.style.background = "rgba(255,0,0,0.4)"; // overdue
        } else if (task.date === today) {
            li.style.background = "rgba(255,165,0,0.4)"; // today
        } else {
            li.style.background = "rgba(0,128,0,0.4)"; // future
        }

        li.onclick = () => removeTask(index);
        taskList.appendChild(li);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
