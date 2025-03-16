/* eslint-disable max-len */
import { parse, isValid } from 'date-fns';
import ToDo from './to-do';
import menuImage from './menu.svg';
import sunImage from './sun-clock-outline.svg';
import AllTasks from './todo-projects';
import AllTaskRenderer from './dom-renderer';
import CustomProject from './side-nav-bar-custom-projects';
import pubsub from './pubsub';

(() => {
  // #region Adding Subscriptions

  // Hamburger Toggle Subscription
  pubsub.subscribe('SIDE_NAV_HAMBURGER_TOGGLE', (hamburgerData) => {
    if (hamburgerData.clickedElement.querySelector('img').src === sunImage) {
      return;
    }
    const { sideNav, headMenuImage } = hamburgerData;
    sideNav.style.display = hamburgerData.sideNav.style.display === 'none' ? 'flex' : 'none';
    headMenuImage.src = hamburgerData.headMenuImage.src === sunImage ? menuImage : sunImage;
  });

  // Close task details subscription
  pubsub.subscribe('CLOSE_TASK_DETAILS', (taskDetailsDivData) => {
    const { taskDetailsTab } = taskDetailsDivData;
    taskDetailsTab.style.display = 'none';
  });

  // ToDo Creation Subscription
  pubsub.subscribe('CREATED_TODO', (toDoCreationData) => {
    const tempToDo = new ToDo(toDoCreationData.todoName);
    tempToDo.makePartOf(toDoCreationData.todoActiveProject);

    if (toDoCreationData.todoActiveProject === 'important') {
      tempToDo.toggleImportance();
    }
    if (!tempToDo.projects.includes('all-tasks')) {
      tempToDo.makePartOf('all-tasks');
    }

    AllTasks.addToTaskList(tempToDo);
    AllTaskRenderer.renderTaskList(toDoCreationData.todoActiveProject);
  });

  // Change ToDo Project Subscription
  pubsub.subscribe('CHANGE_TODO_PROJECT', (changeProjectData) => {
    changeProjectData.textInputField.focus();

    if (!changeProjectData.oldActiveProject) {
      if (changeProjectData.newActiveProject.classList.contains('open-tab')) {
        AllTaskRenderer.renderTaskList(changeProjectData.activeProjectName);
      } else {
        changeProjectData.newActiveProject.classList.toggle('open-tab');
        AllTaskRenderer.renderTaskList(changeProjectData.activeProjectName);
      }

      return;
    }

    if (
      changeProjectData.oldActiveProject.id
      === changeProjectData.newActiveProject.id
    ) {
      return;
    }
    changeProjectData.oldActiveProject.classList.toggle('open-tab');
    changeProjectData.newActiveProject.classList.toggle('open-tab');

    AllTaskRenderer.renderTaskList(changeProjectData.activeProjectName);
  });

  // ToDo click subscription
  pubsub.subscribe('CLICKED_TODO', (clickedTodoData) => {
    // console.log(clickedTodoData);
    AllTaskRenderer.renderTaskDetials(AllTasks.taskList[clickedTodoData.index]);
    const { taskDetailsDiv } = clickedTodoData;
    taskDetailsDiv.style.display = 'flex';
  });

  // Mark important subscription
  pubsub.subscribe('MARK_IMPORTANT_CLICKED', (dataObj) => {
    AllTasks.taskList[dataObj.index].toggleImportance();
    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
    AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
  });

  // Add to my day and remove from my day subscription
  pubsub.subscribe('ADD_TO_MY_DAY', (dataObj) => {
    AllTasks.taskList[dataObj.index].makePartOf('my-day');
    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
    AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
  });

  pubsub.subscribe('REMOVE_FROM_MY_DAY', (dataObj) => {
    AllTasks.taskList[dataObj.index].removeFrom('my-day');
    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
    AllTaskRenderer.renderTaskDetials(AllTasks.taskList[dataObj.index]);
  });

  // Delete task Subscription
  pubsub.subscribe('DELETE_TASK', (dataObj) => {
    AllTasks.removeByIndex(dataObj.index);
    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
  });

  // Change due date subscription
  pubsub.subscribe('CHANGE_DUE_DATE', (dataObj) => {
    const task = AllTasks.taskList[dataObj.index];
    task.modifyDueDate(dataObj.dateValue);
    if (isValid(parse(task.dueDate, 'dd/MM/yyyy', new Date()))) {
      task.makePartOf('scheduled');
    } else {
      task.removeFrom('scheduled');
    }
    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
    AllTaskRenderer.renderTaskDetials(task);
  });

  // Todo Note subscription
  pubsub.subscribe('TODO_NOTE_EDITED', (dataObj) => {
    const task = AllTasks.taskList[dataObj.index];
    task.addNote(dataObj.noteValue);

    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
    AllTaskRenderer.renderTaskDetials(task);
  });

  // Todo Tilte change subscription
  pubsub.subscribe('TODO_TITLE_CHANGED', (dataObj) => {
    const task = AllTasks.taskList[dataObj.index];
    task.changeTitle(dataObj.titleValue);

    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
    AllTaskRenderer.renderTaskDetials(task);
  });

  // Todo complete toggle subscription
  pubsub.subscribe('TASK_TOGGLE_COMPLETE', (dataObj) => {
    const task = AllTasks.taskList[dataObj.index];
    task.toggleComplete();

    AllTaskRenderer.renderTaskList(dataObj.todoActiveProjectName);
    AllTaskRenderer.renderTaskDetials(task);
  });

  // New Project creation
  pubsub.subscribe('NEW_PROJECT_CREATED', (dataObj) => {
    CustomProject.addCustomProject(dataObj.name);
    AllTaskRenderer.renderSideNavBarCustomMenu();
  });

  // Custom Project Deletion
  pubsub.subscribe('DELETE_CUSTOM_PROJECT', (dataObj) => {
    const deletionID = dataObj.projectID;
    CustomProject.deleteCustomProject(deletionID);
    AllTaskRenderer.renderSideNavBarCustomMenu();
  });

  // Any Time the task list is modified
  pubsub.subscribe('TASK_LIST_MODIFIED', (taskList) => {
    // localStorage.removeItem("taskList");
    localStorage.setItem('taskList', JSON.stringify(taskList));
  });

  // Any time custom project list is modified
  pubsub.subscribe('CUSTOM_PROJECT_CHANGED', (customProjectList) => {
    // localStorage.removeItem("customProjectList");
    localStorage.setItem(
      'customProjectList',
      JSON.stringify(customProjectList),
    );
  });

  // #endregion Adding Subscriptions
})();
