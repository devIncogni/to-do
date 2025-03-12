import { pubsub } from "./pubsub";
import circleOutline from "./circle-outline.svg";
import starOutline from "./star-outline.svg";
import { AllTasks } from "./todo-projects";

class ToDoRenderer {
  constructor(toDoProject, taskListRenderDiv, taskDetailsRenderDiv) {
    this.toDoProject = toDoProject;
    this.taskListRenderDiv = taskListRenderDiv;
    this.taskDetailsRenderDiv = taskDetailsRenderDiv;
  }

  renderTaskList(projectName) {
    const renderableTaskList = this.toDoProject.taskList.filter((tasks) =>
      tasks.projects.includes(projectName)
    );
    this.taskListRenderDiv.textContent = "";
    renderableTaskList.forEach((task) => {
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

  renderTaskDetials(taskDetailsDivObject, todoDetailsObject) {
    taskDetailsDivObject.titleDiv.querySelector("#task-title-text-box").value =
      todoDetailsObject.title;

    taskDetailsDivObject.dueDateDiv.querySelector("p").value =
      todoDetailsObject.dueDate == ""
        ? "Set due date"
        : todoDetailsObject.dueDate;

    taskDetailsDivObject.notesDiv.querySelector("#todo-notes").value =
      todoDetailsObject.notes;
  }
}

const TaskRenderer = new ToDoRenderer(
  AllTasks,
  document.querySelector(".task-list")
);

export { TaskRenderer as AllTaskRenderer };
