import { formatRFC3339 } from "date-fns";
import { pubsub } from "./pubsub.js";

class customProjects {
  constructor() {
    this.customProjectList = {};
  }

  addCustomProject(projectName) {
    let projectID = formatRFC3339(new Date(), {
      fractionDigits: 3,
    });
    this.customProjectList["P" + projectID] = projectName;
    pubsub.publish("CUSTOM_PROJECT_CHANGED", this.customProjectList);
  }

  deleteCustomProject(projectID) {
    delete this.customProjectList[projectID];
    pubsub.publish("CUSTOM_PROJECT_CHANGED", this.customProjectList);
  }
}
const CustomProject = new customProjects();

export { CustomProject };
