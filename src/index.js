// CSS Imports
import "./default-reset.css";
import "./normal-styles.css";
import "./header-styles.css";
import "./side-nav-bar-styles.css";
import "./scroll-bar-styles.css";
import "./main-content-styles.css";

// Asset Imports
import menuImage from "./menu.svg";
import sunImage from "./sun-clock-outline.svg";
import "./circle-outline.svg";
import "./star-outline.svg";

// JS Imports
import { ToDo } from "./to-do.js";
import { TodoProjects, AllTasks, MyDay } from "./todo-projects.js";
import { pubsub } from "./pubsub.js";

let abc = new ToDo("HW", "normal", "2025-02-15", "", "");
console.log(abc);
console.log(abc.dueToday());

AllTasks.addToTaskList(abc);
console.log(AllTasks.taskList[0]);
MyDay.createListAutomatically(AllTasks.taskList);
console.log(MyDay.taskList[0]);

AllTasks.removeFromTaskList(abc);
console.log(AllTasks.taskList[0]);
