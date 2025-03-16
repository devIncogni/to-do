const pubsub = (() => {
  const events = {};

  const addEvent = (eventName) => {
    events[eventName] = events[eventName] || [];
  };

  const subscribe = (eventName, fn) => {
    addEvent(eventName);
    events[eventName].push(fn);
  };

  const publish = (eventName, data) => {
    if (!events[eventName]) {
      return;
    }
    events[eventName].forEach((fn) => {
      fn(data);
    });
  };

  const unsubscribe = (eventName, fn) => {
    if (!events[eventName]) {
      return;
    }
    for (let i = 0; i < events[eventName].length; i += 1) {
      const currentFn = events[eventName][i];
      if (currentFn === fn) {
        events[eventName].splice(i, 1);
        return;
      }
    }
  };

  return {
    subscribe,
    unsubscribe,
    publish,
    addEvent,
    events,
  };
})();

export default pubsub;
