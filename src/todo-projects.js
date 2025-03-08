class TodoProject {
  constructor(projectName) {
    // super();
    this.projectName = projectName;
    this._taskList = [];
  }

  addToTaskList(task) {
    this._taskList.unshift(task);
  }

  removeFromTaskList(task) {
    this._taskList = this._taskList.filter((t) => t !== task);
  }

  get taskList() {
    return this._taskList;
  }
}

class MyDayProject extends TodoProject {
  constructor() {
    super("My Day");
  }

  createListAutomatically(taskList) {
    this._taskList = taskList.filter((t) => t.dueToday());
  }
}

class ProjectsHolderTemplate {
  constructor() {
    this._projectList = [];
  }

  // _projectList = [
  //   {
  //     name: "All Tasks",
  //     projectObject: AllTasks,
  //   },
  // ];

  addToProjectList(...projects) {
    for (const project of projects) {
      this._projectList.push({
        name: project.projectName,
        projectObject: project,
      });
    }
  }

  removeFromProjectList(index) {
    this._projectList.splice(index, 1);
  }

  get projectList() {
    return this._projectList;
  }
}

const AllTasks = new TodoProject("All Tasks");
const MyDay = new MyDayProject();

const ProjectsHolder = new ProjectsHolderTemplate();
ProjectsHolder.addToProjectList(AllTasks, MyDay);

export { TodoProject, ProjectsHolder };
