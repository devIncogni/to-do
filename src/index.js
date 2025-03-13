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
import { AllTaskRenderer } from "./dom-renderer.js";
import { format } from "date-fns";

// Update Todays Date in the header
const datePara = document.querySelector(".date-holder > p");
// console.log(datePara);
datePara.textContent = format(new Date(), "eeee, LLLL do");

// Logic to toggle the side menu
const hamburgers = document.querySelectorAll(".hamburger");
hamburgers.forEach((hamburger) => {
  hamburger.addEventListener("click", (e) => {
    const dataObject = {
      clickedElement: e.target.closest(".hamburger"),
      sideNav: document.querySelector(".side-nav-bar"),
      headMenuImage: document.querySelector(".head-menu-image"),
    };
    pubsub.publish("SIDE_NAV_HAMBURGER_TOGGLE", dataObject);
  });
});

// Logic to close task details menu
// const closeTaskCardButton = document.querySelector(".close-task-card > img");
// closeTaskCardButton.addEventListener("click", (e) => {
//   const dataObj = {
//     clickedElement: e.target,
//     taskDetailsTab: document.querySelector(".task-details"),
//   };
//   pubsub.publish("CLOSE_TASK_DETAILS", dataObj);
// });

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
const sideNavBar = document.querySelector(".side-nav-bar");

sideNavBar.addEventListener("click", (e) => {
  const target = e.target.closest("div");
  const dataObject = {
    oldActiveProject: document.querySelector(".open-tab"),
    newActiveProject: target,
    activeProjectName: target.id,
    textInputField: document.querySelector("#add-task"),
  };
  const taskDetailsDivDataObj = {
    taskDetailsTab: document.querySelector(".task-details"),
  };
  switch (target.className) {
    case "side-nav-tab":
      pubsub.publish("CHANGE_TODO_PROJECT", dataObject);
      pubsub.publish("CLOSE_TASK_DETAILS", taskDetailsDivDataObj);
      break;

    default:
      break;
  }
});

// Logic to activate various to-do functions
const taskHolderDiv = document.querySelector(".task-list");
taskHolderDiv.addEventListener("click", (e) => {
  const target = e.target.closest("div");

  const dataObj = {
    clickedElement: target,
    index: e.target.closest(".task").getAttribute("data-index"),
    todoActiveProjectName: document.querySelector(".open-tab").id,
    taskDetailsDiv: document.querySelector(".task-details"),
  };

  switch (target.className) {
    case "task":
    case "task-title":
      pubsub.publish("CLICKED_TODO", dataObj);
      break;
    case "mark-important":
      pubsub.publish("MARK_IMPORTANT_CLICKED", dataObj);
      break;
    case "task-image":
    default:
      break;
  }
});

// Logic to activate various task-details functions
const taskDetailsDiv = document.querySelector(".task-details");

taskDetailsDiv.addEventListener("click", (e) => {
  const target = e.target.closest("div");
  switch (target.className) {
    case "close-task-details-image":
      const dataObj = {
        clickedElement: e.target,
        taskDetailsTab: document.querySelector(".task-details"),
      };
      pubsub.publish("CLOSE_TASK_DETAILS", dataObj);
      break;
  
    default:
      break;
  }
  console.log(target);
});
