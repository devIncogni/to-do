// CSS Imports
import "./default-reset.css";
import "./normal-styles.css";
import "./header-styles.css";
import "./side-nav-bar-styles.css";
import "./scroll-bar-styles.css";
import "./main-content-styles.css";
import "./task-details-styles.css";

// Asset Imports
import menuImage from "./menu.svg";
import sunImage from "./sun-clock-outline.svg";
import "./circle-outline.svg";
import "./star-outline.svg";
import "./calendar-month-outline.svg";
import "./close.svg";

// JS Imports
import { ToDo } from "./to-do.js";
import { TodoProjects, AllTasks, MyDay } from "./todo-projects.js";
import { pubsub } from "./pubsub.js";

let abc = new ToDo("HW", "normal", "2025-02-15", "", "");
console.log(abc);
console.log(abc.dueToday());

AllTasks.addToTaskList(abc);
console.log(AllTasks.taskList[0]);
MyDay.createListAutomatically(AllTasks.taskList);
console.log(MyDay.taskList[0]);

AllTasks.removeFromTaskList(abc);
console.log(AllTasks.taskList[0]);

const datePickerTrigger = document.querySelector(".set-due-date");
const dateInput = document.querySelector("#to-do-due-date");

console.log(datePickerTrigger);
console.log(dateInput);

datePickerTrigger.addEventListener("click", () => {
  dateInput.showPicker();
});
