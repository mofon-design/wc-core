const randomKey = Math.random().toString(36).slice(2);

export const MapAttrsToPropsKey = `__mapAttrsToProps$${randomKey}` as '__mapAttrsToProps';

export const PropertiesKey = `__properties$${randomKey}` as '__properties';

export const SetElementConnectedKey = `__setElementConnected$${randomKey}` as '__setElementConnected';

export const StageKey = `__stage$${randomKey}` as '__stage';

export const SuperLifecycleKey = `__superLifecycle$${randomKey}` as '__superLifecycle';
