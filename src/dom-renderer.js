import { pubsub } from "./pubsub";
import circleOutline from "./circle-outline.svg";
import starOutline from "./star-outline.svg";
import { ProjectsHolder } from "./todo-projects";

class ToDoRenderer {
  constructor(toDoProject, taskListRenderDiv, taskDetailsRenderDiv) {
    this.toDoProject = toDoProject;
    this.taskListRenderDiv = taskListRenderDiv;
    this.taskDetailsRenderDiv = taskDetailsRenderDiv;
  }

  renderTaskList() {
    this.taskListRenderDiv.textContent = "";
    this.toDoProject.taskList.forEach((task) => {
      const taskDiv = document.createElement("div");
      const taskImageDiv = document.createElement("div");
      const taskTitleDiv = document.createElement("div");
      const taskMarkImportantDiv = document.createElement("div");

      const taskImage = document.createElement("img");
      const markImportantImage = document.createElement("img");

      taskDiv.classList.add("task");
      taskImageDiv.classList.add("task-image");
      taskTitleDiv.classList.add("task-title");
      taskMarkImportantDiv.classList.add("mark-important");

      taskImage.src = circleOutline;
      markImportantImage.src = starOutline;

      taskImageDiv.append(taskImage);
      taskMarkImportantDiv.append(markImportantImage);

      taskTitleDiv.textContent = task.title;

      taskDiv.append(taskImageDiv, taskTitleDiv, taskMarkImportantDiv);

      this.taskListRenderDiv.append(taskDiv);
    });
  }

  renderTaskDetials(index) {}
}

const AllTaskRenderer = new ToDoRenderer(
  ProjectsHolder.projectList[0].projectObject,
  document.querySelector(".task-list")
);
// AllTaskRenderer.renderTaskList();
export { AllTaskRenderer };

console.log(AllTaskRenderer);

class ToDoDOMManager {
  constructor() {}
}

// pubsub.subscribe("ToDoCreated", renderTaskList())
