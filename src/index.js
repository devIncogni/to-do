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
import "./delete-forever-outline.svg";

// JS Imports
import { ToDo } from "./to-do.js";
import { TodoProject, ProjectsHolder } from "./todo-projects.js";
import { pubsub } from "./pubsub.js";
import "./dom-renderer.js";

// Logic to trigger the hidden date picker input
const datePickerTrigger = document.querySelector(".set-due-date");
const dateInput = document.querySelector("#to-do-due-date");

console.log(datePickerTrigger);
console.log(dateInput);

datePickerTrigger.addEventListener("click", () => {
  dateInput.showPicker();
});

// Logic to trigger event when something is entered in task input field
const taskInputField = document.querySelector("#add-task");

taskInputField.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    const dataObject = {
      todoName: e.target.value,
      todoTimeOfCreation: new Date(),
      todoActiveProject: document.querySelector(".open-tab").id,
    };
    pubsub.publish("CREATED_TODO", dataObject);
    e.target.value = "";
  }
});

// Logic to change the active ToDo Project
const sideNavTabs = document.querySelectorAll(".side-nav-tab");

sideNavTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const dataObject = {
      oldActiveProject: document.querySelector(".open-tab"),
      newActiveProject: e.target.closest(".side-nav-tab"),
    };
    console.log(dataObject);

    pubsub.publish("CHANGE_TODO_PROJECT", dataObject);
  });
});
