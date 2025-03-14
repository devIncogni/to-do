import { pubsub } from "./pubsub.js";

class TodoProject {
  constructor(projectName) {
    this.projectName = projectName;
    this._taskList = [];
  }

  addToTaskList(task) {
    this._taskList.unshift(task);
    pubsub.publish("TASK_LIST_MODIFIED", this._taskList);
  }

  removeFromTaskList(task) {
    this._taskList = this._taskList.filter((t) => t !== task);
    pubsub.publish("TASK_LIST_MODIFIED", this._taskList);
  }

  removeByIndex(index) {
    this._taskList.splice(index, 1);
    pubsub.publish("TASK_LIST_MODIFIED", this._taskList);
  }

  get taskList() {
    return this._taskList;
  }
}

const AllTasks = new TodoProject("all-tasks");

export { AllTasks };
