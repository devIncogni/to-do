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
import { ElementHider } from "./ElementHider.js";
import { ToDo, TaskHolder } from "./to-do.js";
import { pubsub } from "./pubsub.js";

let abc = new ToDo("Hello WOrld", "normal", "", "", false);
console.log(abc);

TaskHolder.addTaskToMyDay(abc);
console.log(TaskHolder.getAllTasks());

// TaskHolder.removeTask(abc);
// console.log(TaskHolder.getAllTasks());

// TaskHolder.getAllTasks()[0].toggleImportance();

console.log(TaskHolder.getAllTasks());
