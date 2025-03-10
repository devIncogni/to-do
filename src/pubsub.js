import { ToDo } from "./to-do";
import { ProjectsHolder } from "./todo-projects";
import menuImage from "./menu.svg";
import sunImage from "./sun-clock-outline.svg";

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

  ProjectsHolder.projectList[0].projectObject.addToTaskList(tempToDo);

  for (const [index, project] of ProjectsHolder.projectList.entries()) {
    if (project.name === toDoCreationData.todoActiveProject) {
      if (project.name === "my-day") {
        tempToDo.modifyDueDate(new Date());
      }
      project.projectObject.addToTaskList(tempToDo);
      console.log(project.projectObject.taskList);
      break;
    }
  }
  console.log(ProjectsHolder.projectList[0].projectObject.taskList);
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
});
// #endregion Adding Subscriptions
