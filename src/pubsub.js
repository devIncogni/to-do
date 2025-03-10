import { ToDo } from "./to-do";
import { ProjectsHolder } from "./todo-projects";

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

// #endregion Adding Events

// #region Adding Subscriptions

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
