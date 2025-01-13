class Menu {
  constructor(menuButton, toggleElement) {
    // this.menuButton = menuButton;
    this.menuButton = menuButton;
    this.toggleElement = toggleElement;
  }

  openMenu() {
    this.toggleElement.style.display = "";
  }

  closeMenu() {
    this.toggleElement.style.display = "none";
  }
}

export { Menu };
