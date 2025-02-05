// import { format } from "date-fns";
class ToDo {
  constructor(
    title,
    importance = "normal",
    dueDate = "",
    notes = "",
    complete = false
  ) {
    this.title = title;
    this.importance = importance;
    this.dueDate = dueDate;
    this.notes = notes;
    this.complete = complete;
  }

  modifyDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  addNote(noteText) {
    this.notes = noteText;
  }

  changeTitle(titleText) {
    this.title = titleText;
  }

  toggleComplete() {
    this.complete = this.complete == true ? false : true;
  }

  toggleImportance() {
    this.importance = this.importance == "normal" ? "important" : "normal";
  }
}

const TaskHolder = (function () {
  const allTasks = [];
  const myDay = [];

  const addTaskToMyDay = (Task) => {
    myDay.push(Task);
    allTasks.push(Task);
  };

  const addTask = (Task) => {
    allTasks.push(Task);
  };

  const getAllTasks = () => {
    return allTasks;
  };

  return { addTaskToMyDay, getAllTasks, addTask };
})();

export { ToDo, TaskHolder };

// console.log(format(new Date(), "dd/MM/yyyy"));
