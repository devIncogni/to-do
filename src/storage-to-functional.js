import ToDo from './to-do';

const StorageToFunctional = (() => {
  const getFunctionalTaskObjectList = (jsonParsedTaskObjectArray) => {
    const todoProjectList = [];
    jsonParsedTaskObjectArray.forEach((jsonParsedTaskObject) => {
      const tempToDo = new ToDo(
        jsonParsedTaskObject.title,
        jsonParsedTaskObject.projects,
        jsonParsedTaskObject.dueDate,
        jsonParsedTaskObject.importance,
        jsonParsedTaskObject.notes,
        jsonParsedTaskObject.complete,
      );
      todoProjectList.push(tempToDo);
    });
    return todoProjectList;
  };

  // eslint-disable-next-line max-len
  const getFunctionalCustomProjectList = (jsonParsedCustomProjectList) => jsonParsedCustomProjectList;
  return { getFunctionalTaskObjectList, getFunctionalCustomProjectList };
})();

export default StorageToFunctional;
