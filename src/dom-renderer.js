import { pubsub } from "./pubsub";
import circleOutline from "./circle-outline.svg";
import starOutline from "./star-outline.svg";
import star from "./star.svg";
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
      taskDiv.setAttribute(
        "data-index",
        this.toDoProject.taskList.indexOf(task)
      );
      taskImageDiv.classList.add("task-image");
      taskTitleDiv.classList.add("task-title");
      taskMarkImportantDiv.classList.add("mark-important");

      taskImage.src = circleOutline;
      markImportantImage.src =
        task.importance == "important" ? star : starOutline;

      taskImageDiv.append(taskImage);
      taskMarkImportantDiv.append(markImportantImage);

      taskTitleDiv.textContent = task.title;

      taskDiv.append(taskImageDiv, taskTitleDiv, taskMarkImportantDiv);

      taskDiv.addEventListener("click", (e) => {
        const target = e.target.closest("div");

        const dataObj = {
          clickedElement: target,
          index: e.target.closest(".task").getAttribute("data-index"),
          todoActiveProjectName: document.querySelector(".open-tab").id,
          taskDetailsDiv: document.querySelector(".task-details"),
        };
        console.log(target.className);

        switch (target.className) {
          case "task":
          case "task-title":
            pubsub.publish("CLICKED_TODO", dataObj);
            break;
          case "mark-important":
            pubsub.publish("MARK_IMPORTANT_CLICKED", dataObj);
            console.log("Mark Impr");
            break;
          case "task-image":
          default:
            break;
        }

        // pubsub.publish("CLICKED_TODO", dataObj);
        // console.log(dataObj);
      });

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
