class TodoProject {
  constructor(projectName) {
    // super();
    this.projectName = projectName;
    this._taskList = [];
  }

  addToTaskList(task) {
    this._taskList.push(task);
  }

  removeFromTaskList(task) {
    this._taskList = this._taskList.filter((t) => t !== task);
  }

  get taskList() {
    return this._taskList;
  }
}

const AllTasks = new TodoProject("All Tasks");

class MyDayProject extends TodoProject {
  constructor() {
    super("My Day");
  }

  createListAutomatically(taskList) {
    this._taskList = taskList.filter((t) => t.dueToday());
  }
}

const MyDay = new MyDayProject();

export { TodoProject, AllTasks, MyDay };
