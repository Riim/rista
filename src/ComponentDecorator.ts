import { IEvent } from 'cellx';
import { IBlock, Template } from 'nelm';
import { Component, IComponentEvents, IComponentOEvents } from './Component';

export function ComponentDecorator<T extends Component>(config: {
	elementIs: string;
	elementExtends?: string | null;
	input?: { [name: string]: any } | null;
	i18n?: { [key: string]: any } | null;
	template?: string | IBlock | Template | null;
	oevents?: IComponentOEvents<T> | null;
	events?: IComponentEvents<T, IEvent> | null;
	domEvents?: IComponentEvents<T, Event> | null;
}) {
	return (componentConstr: Function) => {
		(componentConstr as typeof Component).elementIs = config.elementIs;
		if (config.elementExtends !== undefined) {
			(componentConstr as typeof Component).elementExtends = config.elementExtends;
		}

		if (config.input !== undefined) {
			(componentConstr as typeof Component).input = config.input;
		}

		if (config.i18n !== undefined) {
			(componentConstr as typeof Component).i18n = config.i18n;
		}

		if (config.template !== undefined) {
			(componentConstr as typeof Component).template = config.template;
		}

		if (config.oevents !== undefined) {
			(componentConstr as typeof Component).oevents = config.oevents;
		}
		if (config.events !== undefined) {
			(componentConstr as typeof Component).events = config.events;
		}
		if (config.domEvents !== undefined) {
			(componentConstr as typeof Component).domEvents = config.domEvents;
		}

		Component.register(componentConstr as typeof Component);
	};
}
