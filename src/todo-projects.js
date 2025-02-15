class TodoProjects {
  constructor(projectName) {
    // super();
    this.projectName = projectName;
    this.tasklist = [];
  }

  addToTaskList(task) {
    this.tasklist.push(task);
  }

  removeFromTaskList(task) {
    for (let i = 0; i < this.tasklist.length; i++) {
      const currentTask = this.tasklist[i];
      if (currentTask == task) {
        this.tasklist.splice(i, 1);
      }
    }
  }

  get tasklist() {
    return this.tasklist;
  }
}

export { TodoProjects };
