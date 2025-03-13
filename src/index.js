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
import { format, formatRelative, parse, subDays } from "date-fns";

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

  let dataObj = {};

  switch (target.className) {
    case "task":
    case "task-title":
    case "title-and-due-date":
    case "due":
      dataObj = {
        clickedElement: target,
        index: e.target.closest(".task").getAttribute("data-index"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
        taskDetailsDiv: document.querySelector(".task-details"),
      };
      pubsub.publish("CLICKED_TODO", dataObj);
      break;
    case "mark-important":
      dataObj = {
        clickedElement: target,
        index: e.target.closest(".task").getAttribute("data-index"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
        taskDetailsDiv: document.querySelector(".task-details"),
      };
      pubsub.publish("MARK_IMPORTANT_CLICKED", dataObj);
      break;
    case "task-image":
      dataObj = {
        index: e.target.closest(".task").getAttribute("data-index"),
        taskDetailsTab: document.querySelector(".task-details"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
      };
      pubsub.publish("TASK_TOGGLE_COMPLETE", dataObj);
      break;
    default:
      break;
  }
});

// Logic to activate various task-details functions
const taskDetailsDiv = document.querySelector(".task-details");

taskDetailsDiv.addEventListener("click", (e) => {
  const target = e.target.closest("div");
  let dataObj = {};
  switch (target.className) {
    case "close-task-details-image":
      dataObj = {
        clickedElement: e.target,
        taskDetailsTab: document.querySelector(".task-details"),
      };
      pubsub.publish("CLOSE_TASK_DETAILS", dataObj);
      break;

    case "mark-important mark-important-task-details":
      // Indec and Active Project
      dataObj = {
        index: taskDetailsDiv.getAttribute("data-index"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
      };
      pubsub.publish("MARK_IMPORTANT_CLICKED", dataObj);
      break;

    case "add-to-my-day":
      dataObj = {
        index: taskDetailsDiv.getAttribute("data-index"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
        myDayDiv: e.target.closest(".add-to-my-day"),
        myDayDivPara: e.target.closest(".add-to-my-day").querySelector("p"),
      };
      pubsub.publish("ADD_TO_MY_DAY", dataObj);
      break;

    case "remove-from-my-day":
      dataObj = {
        index: taskDetailsDiv.getAttribute("data-index"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
        myDayDiv: e.target.closest(".remove-from-my-day"),
        myDayDivPara: e.target
          .closest(".remove-from-my-day")
          .querySelector("p"),
      };
      pubsub.publish("REMOVE_FROM_MY_DAY", dataObj);
      break;

    case "delete-task":
      dataObj = {
        index: taskDetailsDiv.getAttribute("data-index"),
        taskDetailsTab: document.querySelector(".task-details"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
      };
      pubsub.publish("DELETE_TASK", dataObj);
      pubsub.publish("CLOSE_TASK_DETAILS", dataObj);

      break;

    case "task-image":
      dataObj = {
        index: taskDetailsDiv.getAttribute("data-index"),
        taskDetailsTab: document.querySelector(".task-details"),
        todoActiveProjectName: document.querySelector(".open-tab").id,
      };
      pubsub.publish("TASK_TOGGLE_COMPLETE", dataObj);
      break;

    default:
      break;
  }
  console.log(target);
});

// Logic to set due date
const dueDateInput = document.querySelector("#to-do-due-date");
dueDateInput.addEventListener("change", (e) => {
  const dataObj = {
    dateValue: e.target.value,
    index: taskDetailsDiv.getAttribute("data-index"),
    todoActiveProjectName: document.querySelector(".open-tab").id,
  };
  pubsub.publish("CHANGE_DUE_DATE", dataObj);
  console.log(e.target.value);
});

// Logic to add notes
const notesTextArea = document.querySelector("#todo-notes");
notesTextArea.addEventListener("input", (e) => {
  let dataObj = {
    index: taskDetailsDiv.getAttribute("data-index"),
    todoActiveProjectName: document.querySelector(".open-tab").id,
    noteValue: e.target.value,
  };
  pubsub.publish("TODO_NOTE_EDITED", dataObj);
});

// Logic to change the title of task
const taskTitleInput = document.querySelector("#task-title-text-box");
taskTitleInput.addEventListener("input", (e) => {
  let dataObj = {
    index: taskDetailsDiv.getAttribute("data-index"),
    todoActiveProjectName: document.querySelector(".open-tab").id,
    titleValue: e.target.value,
  };
  pubsub.publish("TODO_TITLE_CHANGED", dataObj);
});
