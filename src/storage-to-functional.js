import { ToDo } from "./to-do";

const StorageToFunctional = (() => {
  const getFunctionalTaskObjectList = (jsonParsedTaskObjectArray) => {
    let todoProjectList = [];
    jsonParsedTaskObjectArray.forEach((jsonParsedTaskObject) => {
      let tempToDo = new ToDo(
        jsonParsedTaskObject.title,
        jsonParsedTaskObject._projects,
        jsonParsedTaskObject.dueDate,
        jsonParsedTaskObject.importance,
        jsonParsedTaskObject.notes,
        jsonParsedTaskObject.complete
      );
      todoProjectList.push(tempToDo);
    });
    return todoProjectList;
  };

  const getFunctionalCustomProjectList = (jsonParsedCustomProjectList) => {
    return jsonParsedCustomProjectList;
  };

  return { getFunctionalTaskObjectList, getFunctionalCustomProjectList };
})();

export { StorageToFunctional };
