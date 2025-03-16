import pubsub from './pubsub';

class TodoProject {
  constructor(projectName) {
    this.projectName = projectName;
    this.taskList = [];
  }

  addToTaskList(task) {
    this.taskList.unshift(task);
    pubsub.publish('TASK_LIST_MODIFIED', this.taskList);
  }

  removeFromTaskList(task) {
    this.taskList = this.taskList.filter((t) => t !== task);
    pubsub.publish('TASK_LIST_MODIFIED', this.taskList);
  }

  removeByIndex(index) {
    this.taskList.splice(index, 1);
    pubsub.publish('TASK_LIST_MODIFIED', this.taskList);
  }
}

const AllTasks = new TodoProject('all-tasks');

export default AllTasks;
