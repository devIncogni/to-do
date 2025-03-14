import { formatRFC3339 } from "date-fns";

class customProjects {
  constructor() {
    this.customProjectList = {};
  }

  
  addCustomProject(projectName) {
    let projectID = formatRFC3339(new Date(), {
      fractionDigits: 3,
    });
    this.customProjectList["P"+projectID] = projectName;
  }

  deleteCustomProject(projectID) {
    delete this.customProjectList[projectID];
  }
}
const CustomProject = new customProjects();

export { CustomProject };
