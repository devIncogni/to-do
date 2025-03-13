class TodoProject {
  constructor(projectName) {
    this.projectName = projectName;
    this._taskList = [];
  }

  addToTaskList(task) {
    this._taskList.unshift(task);
  }

  removeFromTaskList(task) {
    this._taskList = this._taskList.filter((t) => t !== task);
  }

  removeByIndex(index) {
    this._taskList.splice(index, 1);
  }

  get taskList() {
    return this._taskList;
  }
}

const AllTasks = new TodoProject("all-tasks");

export { AllTasks };
