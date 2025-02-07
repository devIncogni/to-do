import "./default-reset.css";
import "./normal-styles.css";
import "./header-styles.css";
import "./side-nav-bar-styles.css";
import "./scroll-bar-styles.css";
import "./main-content-styles.css";
import { Menu } from "./menu-toggle.js";
import menuImage from "./menu.svg";
import sunImage from "./sun-clock-outline.svg";
import "./circle-outline.svg";
import "./star-outline.svg";
import { ToDo, TaskHolder } from "./to-do.js";
// import "./menu.svg";

const menuLoader = (function () {
  const sideNavBar = document.querySelector(".side-nav-bar");
  const headMenuButton = document.querySelector(".head-menu");
  const sideMenuButton = document.querySelector(".side-menu");

  headMenuButton.addEventListener("click", () => {
    new Menu(headMenuButton, sideNavBar).openMenu();
    let image = document.querySelector(".head-menu-image");
    image.src = sunImage;
  });

  sideMenuButton.addEventListener("click", () => {
    new Menu(sideMenuButton, sideNavBar).closeMenu();
    let image = document.querySelector(".head-menu-image");
    image.src = menuImage;
  });
})();

const taskCreate = (function () {
  const taskInputField = document.querySelector(".create-task input");
  taskInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
      console.log(taskInputField.className);

      if (taskInputField.value) {
        const task = new ToDo(taskInputField.value);

        if (taskInputField.className == "input-to-my-day") {
          TaskHolder.addTaskToMyDay(task);
        } else {
          TaskHolder.addTask(task);
        }

        taskInputField.value = "";
      }

      event.preventDefault();
    }
  });
})();
