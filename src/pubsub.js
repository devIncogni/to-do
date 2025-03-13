import { ToDo } from "./to-do";
import menuImage from "./menu.svg";
import sunImage from "./sun-clock-outline.svg";
import { AllTasks } from "./todo-projects";
import { AllTaskRenderer } from "./dom-renderer";
import starOutline from "./star-outline.svg";
import star from "./star.svg";

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

  AllTasks.addToTaskList(tempToDo);
  AllTaskRenderer.renderTaskList(toDoCreationData.todoActiveProject);
});

// Change ToDo Project Subscription
pubsub.subscribe("CHANGE_TODO_PROJECT", (changeProjectData) => {
  if (
    changeProjectData.oldActiveProject.id ===
    changeProjectData.newActiveProject.id
  ) {
    return;
  } else {
    changeProjectData.oldActiveProject.classList.toggle("open-tab");
    changeProjectData.newActiveProject.classList.toggle("open-tab");
  }
  changeProjectData.textInputField.focus();
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
  dataObj.myDayDiv.className = "remove-from-my-day";
  dataObj.myDayDivPara.textContent = "Remove From My Day";

  AllTasks.taskList[dataObj.index].makePartOf("my-day");
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
});

pubsub.subscribe("REMOVE_FROM_MY_DAY", (dataObj) => {
  dataObj.myDayDiv.className = "add-to-my-day";
  dataObj.myDayDivPara.textContent = "Add To My Day";

  AllTasks.taskList[dataObj.index].removeFrom("my-day");
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
});

// Delete task Subscription
pubsub.subscribe("DELETE_TASK", (dataObj) => {
  AllTasks.removeByIndex(dataObj.index);
  AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
});
// #endregion Adding Subscriptions
