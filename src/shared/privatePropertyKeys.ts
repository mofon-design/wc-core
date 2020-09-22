const randomKey = Math.random().toString(36).slice(2);

export const GetSuperLifecyclesKey = `__getSuperLifecycles$${randomKey}` as '__getSuperLifecycles';

export const LifecyclesKey = `__lifecycles$${randomKey}` as '__lifecycles';

export const MapAttrsToPropsKey = `__mapAttrsToProps$${randomKey}` as '__mapAttrsToProps';

export const PropertiesKey = `__properties$${randomKey}` as '__properties';

export const SetElementConnectedKey = `__setElementConnected$${randomKey}` as '__setElementConnected';

export const StageKey = `__stage$${randomKey}` as '__stage';
