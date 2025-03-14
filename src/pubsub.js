import { ToDo } from "./to-do";
import menuImage from "./menu.svg";
import sunImage from "./sun-clock-outline.svg";
import { AllTasks } from "./todo-projects";
import { AllTaskRenderer } from "./dom-renderer";
import starOutline from "./star-outline.svg";
import star from "./star.svg";
import { parse, isValid } from "date-fns";
import { CustomProject } from "./side-nav-bar-custom-projects";

const pubsub = (() => {
  const events = {};

  const addEvent = (eventName) => {
    events[eventName] = events[eventName] || [];
  };

  const subscribe = (eventName, fn) => {
    addEvent(eventName);
    events[eventName].push(fn);
  };

  const publish = (eventName, data) => {
    if (!events[eventName]) {
      console.log("Error finding event");
      return;
    }
    events[eventName].forEach((fn) => {
      fn(data);
    });
  };

  const unsubscribe = (eventName, fn) => {
    if (!events[eventName]) {
      console.log("Error finding event");
      return;
    }
    for (let i = 0; i < events[eventName].length; i++) {
      const currentFn = events[eventName][i];
      if (currentFn == fn) {
        events[eventName].splice(i, 1);
        return;
      }
    }
  };

  return { subscribe, unsubscribe, publish, addEvent, events };
})();

export { pubsub };

// #region Adding Events

pubsub.addEvent("CREATED_TODO");
pubsub.addEvent("CHANGE_TODO_PROJECT");
pubsub.addEvent("SIDE_NAV_HAMBURGER_TOGGLE");
pubsub.addEvent("CLOSE_TASK_DETAILS");
pubsub.addEvent("CLICKED_TODO");
pubsub.addEvent("MARK_IMPORTANT_CLICKED");
pubsub.addEvent("ADD_TO_MY_DAY");
pubsub.addEvent("REMOVE_FROM_MY_DAY");
pubsub.addEvent("DELETE_TASK");

// #endregion Adding Events

// #region Adding Subscriptions

// Hamburger Toggle Subscription
pubsub.subscribe("SIDE_NAV_HAMBURGER_TOGGLE", (hamburgerData) => {
  if (hamburgerData.clickedElement.querySelector("img").src == sunImage) {
    return;
  }
  hamburgerData.sideNav.style.display =
    hamburgerData.sideNav.style.display == "none" ? "flex" : "none";
  hamburgerData.headMenuImage.src =
    hamburgerData.headMenuImage.src == sunImage ? menuImage : sunImage;
});

// Close task details subscription
pubsub.subscribe("CLOSE_TASK_DETAILS", (taskDetailsDivData) => {
  taskDetailsDivData.taskDetailsTab.style.display = "none";
});

// ToDo Creation Subscription
pubsub.subscribe("CREATED_TODO", (toDoCreationData) => {
  let tempToDo = new ToDo(toDoCreationData.todoName);
  tempToDo.makePartOf(toDoCreationData.todoActiveProject);

  if (toDoCreationData.todoActiveProject == "important") {
    tempToDo.toggleImportance();
  }
  if (!tempToDo.projects.includes("all-tasks")) {
    tempToDo.makePartOf("all-tasks");
  }
  console.log(tempToDo);
  console.log(JSON.parse(JSON.stringify(tempToDo)));

  AllTasks.addToTaskList(tempToDo);
  AllTaskRenderer.renderTaskList(toDoCreationData.todoActiveProject);
});

// Change ToDo Project Subscription
pubsub.subscribe("CHANGE_TODO_PROJECT", (changeProjectData) => {
  changeProjectData.textInputField.focus();

  if (!changeProjectData.oldActiveProject) {
    if (changeProjectData.newActiveProject.classList.contains("open-tab")) {
      AllTaskRenderer.renderTaskList(changeProjectData.activeProjectName);
    } else {
      changeProjectData.newActiveProject.classList.toggle("open-tab");
      AllTaskRenderer.renderTaskList(changeProjectData.activeProjectName);
    }

    return;
  }

  if (
    changeProjectData.oldActiveProject.id ===
    changeProjectData.newActiveProject.id
  ) {
    return;
  } else {
    changeProjectData.oldActiveProject.classList.toggle("open-tab");
    changeProjectData.newActiveProject.classList.toggle("open-tab");
  }
  AllTaskRenderer.renderTaskList(changeProjectData.activeProjectName);
});

// ToDo click subscription
pubsub.subscribe("CLICKED_TODO", (clickedTodoData) => {
  // console.log(clickedTodoData);
  AllTaskRenderer.renderTaskDetials(AllTasks.taskList[clickedTodoData.index]);
  clickedTodoData.taskDetailsDiv.style.display = "flex";
});

// Mark important subscription
pubsub.subscribe("MARK_IMPORTANT_CLICKED", (dataObj) => {
  AllTasks.taskList[dataObj.index].toggleImportance();
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
});

// Add to my day and remove from my day subscription
pubsub.subscribe("ADD_TO_MY_DAY", (dataObj) => {
  AllTasks.taskList[dataObj.index].makePartOf("my-day");
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
});

pubsub.subscribe("REMOVE_FROM_MY_DAY", (dataObj) => {
  AllTasks.taskList[dataObj.index].removeFrom("my-day");
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
});

// Delete task Subscription
pubsub.subscribe("DELETE_TASK", (dataObj) => {
  AllTasks.removeByIndex(dataObj.index);
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
});

// Change due date subscription
pubsub.subscribe("CHANGE_DUE_DATE", (dataObj) => {
  let task = AllTasks.taskList[dataObj.index];
  task.modifyDueDate(dataObj.dateValue);
  if (isValid(parse(task.dueDate, "dd/MM/yyyy", new Date()))) {
    task.makePartOf("scheduled");
  } else {
    task.removeFrom("scheduled");
  }
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(task);
  console.log("Due on " + task.dueDate);
});

// Todo Note subscription
pubsub.subscribe("TODO_NOTE_EDITED", (dataObj) => {
  let task = AllTasks.taskList[dataObj.index];
  task.addNote(dataObj.noteValue);

  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(task);
});

// Todo Tilte change subscription
pubsub.subscribe("TODO_TITLE_CHANGED", (dataObj) => {
  let task = AllTasks.taskList[dataObj.index];
  task.changeTitle(dataObj.titleValue);

  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(task);
});

// Todo complete toggle subscription
pubsub.subscribe("TASK_TOGGLE_COMPLETE", (dataObj) => {
  let task = AllTasks.taskList[dataObj.index];
  task.toggleComplete();
  console.log(task.complete);

  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(task);
});

// New Project creation
pubsub.subscribe("NEW_PROJECT_CREATED", (dataObj) => {
  CustomProject.addCustomProject(dataObj.name);
  AllTaskRenderer.renderSideNavBarCustomMenu();
});

// Custom Project Deletion
pubsub.subscribe("DELETE_CUSTOM_PROJECT", (dataObj) => {
  let deletionID = dataObj.projectID;
  CustomProject.deleteCustomProject(deletionID);
  AllTaskRenderer.renderSideNavBarCustomMenu();
});

// Any Time the task list is modified
pubsub.subscribe("TASK_LIST_MODIFIED", (taskList) => {
  // localStorage.removeItem("taskList");
  localStorage.setItem("taskList", JSON.stringify(taskList));
  console.log(localStorage.getItem("taskList"));
  console.log(JSON.parse(localStorage.getItem("taskList")));
});

// Any time custom project list is modified
pubsub.subscribe("CUSTOM_PROJECT_CHANGED", (customProjectList) => {
  // localStorage.removeItem("customProjectList");
  localStorage.setItem("customProjectList", JSON.stringify(customProjectList));
});

// #endregion Adding Subscriptions
