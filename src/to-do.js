import { format } from "date-fns";
class ToDo {
  constructor(
    title,
    projects = [],
    dueDate = "",
    importance = "normal",
    notes = "",
    complete = false
  ) {
    this.title = title;
    this.importance = importance;
    this._creationDate = format(new Date(), "dd/MM/yyyy");
    this.dueDate = dueDate != "" ? format(dueDate, "dd/MM/yyyy") : "";
    this.notes = notes;
    this.complete = complete;
    this._projects = projects;
  }

  get creationDate() {
    return this._creationDate;
  }

  dueToday() {
    if (this.dueDate == this.creationDate) {
      return true;
    }
    return false;
  }

  modifyDueDate(dueDate) {
    this.dueDate = format(dueDate, "dd/MM/yyyy");
  }

  get projects() {
    return this._projects;
  }

  makePartOf(project) {
    this._projects.push(project);
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

export { ToDo };

// console.log(format(new Date(), "dd/MM/yyyy"));
