import { pubsub } from "./pubsub";
import circleOutline from "./circle-outline.svg";
import starOutline from "./star-outline.svg";
import star from "./star.svg";
import checkCircle from "./check-circle.svg";
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

      const markImportantImage = document.createElement("img");

      taskDiv.classList.add("task");
      taskDiv.setAttribute(
        "data-index",
        this.toDoProject.taskList.indexOf(task)
      );
      taskImageDiv.classList.add("task-image");
      taskTitleDiv.classList.add("task-title");
      taskMarkImportantDiv.classList.add("mark-important");

      if (task.complete) {
        taskImageDiv.style.background = "url(" + checkCircle + ")";
      }

      markImportantImage.src =
        task.importance == "important" ? star : starOutline;

      taskMarkImportantDiv.append(markImportantImage);

      taskTitleDiv.textContent = task.title;

      taskDiv.append(taskImageDiv, taskTitleDiv, taskMarkImportantDiv);

      this.taskListRenderDiv.append(taskDiv);
    });
  }

  renderTaskDetials(todo) {
    this.taskDetailsRenderDiv.setAttribute(
      "data-index",
      this.toDoProject.taskList.indexOf(todo)
    );

    this.taskDetailsRenderDiv.querySelector("#task-title-text-box").value =
      todo.title;

    // Rendering Importance
    this.taskDetailsRenderDiv.querySelector(
      ".mark-important-task-details>img"
    ).src = todo.importance == "important" ? star : starOutline;

    this.taskDetailsRenderDiv.querySelector("#due-date-para").value =
      todo.dueDate == "" ? "Set due date" : todo.dueDate;

    this.taskDetailsRenderDiv.querySelector("#todo-notes").value = todo.notes;

    this.taskDetailsRenderDiv.querySelector(".close-task-card>p").textContent =
      "Created: " + todo.creationDate;
  }
}

const TaskRenderer = new ToDoRenderer(
  AllTasks,
  document.querySelector(".task-list"),
  document.querySelector(".task-details")
);

export { TaskRenderer as AllTaskRenderer };
