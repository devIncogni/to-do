import { format, isValid, parse } from 'date-fns';

class ToDo {
  constructor(
    title,
    projects = [],
    dueDate = '',
    importance = 'normal',
    notes = '',
    complete = false,
  ) {
    this.title = title;
    this.importance = importance;
    this.creationDate = format(new Date(), 'dd-MM-yyyy');
    this.dueDate = dueDate !== '' ? format(dueDate, 'dd-MM-yyyy') : '';
    this.notes = notes;
    this.complete = complete;
    this.projects = projects;
  }

  dueToday() {
    if (this.dueDate === this.creationDate) {
      return true;
    }
    return false;
  }

  modifyDueDate(dueDate) {
    const paresedDueDate = parse(dueDate, 'yyyy-MM-dd', new Date());

    this.dueDate = isValid(paresedDueDate)
      ? format(paresedDueDate, 'dd-MM-yyyy')
      : '';
  }

  makePartOf(project) {
    if (!this.projects.includes(project)) {
      this.projects.push(project);
    }
  }

  removeFrom(project) {
    const indexOfProject = this.projects.indexOf(project);
    if (this.projects.includes(project)) {
      this.projects.splice(indexOfProject, 1);
    }
  }

  isPartOf(project) {
    if (this.projects.includes(project)) {
      return true;
    }
    return false;
  }

  addNote(noteText) {
    this.notes = noteText;
  }

  changeTitle(titleText) {
    this.title = titleText;
  }

  toggleComplete() {
    if (this.complete) {
      this.complete = false;
      this.removeFrom('complete');
    } else if (!this.complete) {
      this.complete = true;
      this.makePartOf('complete');
    }
  }

  toggleImportance() {
    // this.importance = this.importance == "normal" ? "important" : "normal";
    switch (this.importance) {
      case 'normal':
        this.importance = 'important';
        this.makePartOf('important');
        break;
      case 'important':
        this.importance = 'normal';
        this.removeFrom('important');
        break;

      default:
        break;
    }
  }
}

export default ToDo;

// console.log(format(new Date(), "dd/MM/yyyy"));
