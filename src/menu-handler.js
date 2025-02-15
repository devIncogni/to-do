import { ElementHider } from "./ElementHider.js";
import { pubsub } from "./pubsub.js";

const sideNavBar = document.querySelector(".side-nav-bar");
const headMenuButton = document.querySelector(".head-menu");
const sideMenuButton = document.querySelector(".side-menu");

const headMenu = new ElementHider(headMenuButton, sideNavBar);
const sideMenu = new ElementHider(sideMenuButton, sideNavBar);

pubsub.subscribe("HeadMenuButtonClick", headMenu.openMenu);
pubsub.subscribe("SideMenuButtonClick", sideMenu.closeMenu);

