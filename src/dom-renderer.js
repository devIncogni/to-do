import { pubsub } from "./pubsub";
import circleOutline from "./circle-outline.svg";
import checkAll from "./check-all.svg";
import starOutline from "./star-outline.svg";
import star from "./star.svg";
import checkCircle from "./check-circle.svg";
import { AllTasks } from "./todo-projects";
import { CustomProject } from "./side-nav-bar-custom-projects";

class ToDoRenderer {
  constructor(
    toDoProject,
    customProject,
    taskListRenderDiv,
    taskDetailsRenderDiv,
    customProjectDiv
  ) {
    this.toDoProject = toDoProject;
    this.customProject = customProject;
    this.taskListRenderDiv = taskListRenderDiv;
    this.taskDetailsRenderDiv = taskDetailsRenderDiv;
    this.customProjectDiv = customProjectDiv;
  }

  renderTaskList(projectName) {
    const renderableTaskList = this.toDoProject.taskList.filter((tasks) =>
      tasks.projects.includes(projectName)
    );
    this.taskListRenderDiv.textContent = "";
    renderableTaskList.forEach((task) => {
      const taskDiv = document.createElement("div");
      const taskImageDiv = document.createElement("div");
      const taskTitleAndDueDateDiv = document.createElement("div");
      const taskMarkImportantDiv = document.createElement("div");

      const markImportantImage = document.createElement("img");

      const taskTitlePara = document.createElement("p");

      taskDiv.classList.add("task");
      taskDiv.setAttribute(
        "data-index",
        this.toDoProject.taskList.indexOf(task)
      );
      taskImageDiv.classList.add("task-image");
      taskTitleAndDueDateDiv.classList.add("title-and-due-date");
      taskMarkImportantDiv.classList.add("mark-important");

      taskTitlePara.classList.add("task-title");

      markImportantImage.src =
        task.importance == "important" ? star : starOutline;

      taskMarkImportantDiv.append(markImportantImage);

      taskTitlePara.textContent = task.title;

      if (task.complete) {
        taskImageDiv.style.background = "url(" + checkCircle + ")";
        taskTitlePara.style.textDecoration = "line-through";
        taskTitlePara.style.textDecorationThickness = "0.1rem";
        taskTitlePara.style.textDecorationColor = "#000000";
        taskTitlePara.style.color = "#505050";
      }

      taskTitleAndDueDateDiv.append(taskTitlePara);

      if (task.dueDate != "") {
        let dueDiv = document.createElement("div");
        dueDiv.classList.add("due");

        let dueDivPara = document.createElement("p");

        dueDivPara.textContent = "Due: " + task.dueDate;
        dueDiv.append(dueDivPara);
        taskTitleAndDueDateDiv.append(dueDiv);
      }

      taskDiv.append(
        taskImageDiv,
        taskTitleAndDueDateDiv,
        taskMarkImportantDiv
      );

      this.taskListRenderDiv.append(taskDiv);
    });
  }

  renderTaskDetials(todo) {
    this.taskDetailsRenderDiv.setAttribute(
      "data-index",
      this.toDoProject.taskList.indexOf(todo)
    );

    let taskTitlePara = this.taskDetailsRenderDiv.querySelector(
      "#task-title-text-box"
    );
    let taskImageDiv = this.taskDetailsRenderDiv.querySelector(".task-image");

    taskTitlePara.value = todo.title;

    if (todo.complete) {
      taskImageDiv.style.background = "url(" + checkCircle + ")";
      taskTitlePara.style.textDecoration = "line-through";
      taskTitlePara.style.textDecorationThickness = "0.1rem";
      taskTitlePara.style.textDecorationColor = "#000000";
      taskTitlePara.style.color = "#505050";
    } else {
      taskImageDiv.style.background = "";
      taskTitlePara.style.textDecoration = "";
      taskTitlePara.style.textDecorationThickness = "";
      taskTitlePara.style.textDecorationColor = "";
      taskTitlePara.style.color = "";
    }

    if (todo.isPartOf("my-day")) {
      let myDayDiv = this.taskDetailsRenderDiv.querySelector("#my-day-div");
      let myDayDivPara = myDayDiv.querySelector("p");

      myDayDiv.className = "remove-from-my-day";
      myDayDivPara.textContent = "Remove From My Day";
    } else {
      let myDayDiv = this.taskDetailsRenderDiv.querySelector("#my-day-div");
      let myDayDivPara = myDayDiv.querySelector("p");

      myDayDiv.className = "add-to-my-day";
      myDayDivPara.textContent = "Add To My Day";
    }

    // Rendering Importance
    this.taskDetailsRenderDiv.querySelector(
      ".mark-important-task-details>img"
    ).src = todo.importance == "important" ? star : starOutline;

    this.taskDetailsRenderDiv.querySelector("#due-date-para").textContent =
      todo.dueDate == "" ? "Set due date" : "Due: " + todo.dueDate;

    this.taskDetailsRenderDiv.querySelector("#todo-notes").value = todo.notes;

    this.taskDetailsRenderDiv.querySelector(".close-task-card>p").textContent =
      "Created: " + todo.creationDate;
  }

  renderSideNavBarCustomMenu() {
    let projectsList = this.customProject.customProjectList;
    this.customProjectDiv.textContent = "";

    for (const key in projectsList) {
      const sideNavTab = document.createElement("div");
      const sideNavTabDelete = document.createElement("div");
      const sideNavTabPara = document.createElement("p");
      const sideNavTabImage = document.createElement("img");

      sideNavTab.id = key;
      sideNavTab.classList.add("side-nav-tab");
      sideNavTabDelete.classList.add("delete-project");

      sideNavTabPara.textContent = projectsList[key];
      sideNavTabImage.src = checkAll;

      sideNavTab.append(sideNavTabImage, sideNavTabPara, sideNavTabDelete);

      this.customProjectDiv.append(sideNavTab);
    }
  }
}

const TaskRenderer = new ToDoRenderer(
  AllTasks,
  CustomProject,
  document.querySelector(".task-list"),
  document.querySelector(".task-details"),
  document.querySelector(".custom-projects")
);

export { TaskRenderer as AllTaskRenderer };
