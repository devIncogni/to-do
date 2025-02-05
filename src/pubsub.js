const pubsub = (() => {
  const events = {};

  const subscribe = (eventName, fn) => {
    events[eventName] = events[eventName] || [];
    events[eventName].push(fn);
  };

  const publish = (eventName, data) => {
    if (!events[eventName]) {
      console.log("Error finding event");
      return;
    }
    events[eventName].forEach((fn) => {
      fn(data);
    });
  };

  const unsubscribe = (eventName, fn) => {
    if (!events[eventName]) {
      console.log("Error finding event");
      return;
    }
    for (let i = 0; i < events[eventName].length; i++) {
      const currentFn = events[eventName][i];
      if (currentFn == fn) {
        events[eventName].splice(i, 1);
        return;
      }
    }
  };

  return { subscribe, unsubscribe, publish };
})();

export { pubsub };
