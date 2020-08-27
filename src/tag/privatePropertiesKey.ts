const randomKey = Math.random()
  .toString(36)
  .slice(2);

export const PropertiesKey = `__properties$${randomKey}` as '__properties';

export const SuperLifecycleKey = `__superLifecycle$${randomKey}` as '__superLifecycle';

export const SetElementConnectedKey = `__setElementConnected$${randomKey}` as '__setElementConnected';
