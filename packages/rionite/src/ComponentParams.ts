import { snakeCaseAttributeName } from '@riim/rionite-snake-case-attribute-name';
import { BaseComponent, I$ComponentParamConfig, IComponentParamConfig } from './BaseComponent';
import { componentParamTypeSerializerMap } from './componentParamTypeSerializerMap';
import { KEY_PARAMS, KEY_PARAMS_CONFIG } from './Constants';

export const KEY_COMPONENT_PARAMS_INITED = Symbol('Rionite/ComponentParams[componentParamsInited]');

function initParam(
	component: BaseComponent,
	$paramConfig: I$ComponentParamConfig | null,
	name: string
) {
	if ($paramConfig === null) {
		return;
	}

	let typeSerializer = $paramConfig.typeSerializer;
	let defaultValue: any;

	if (typeSerializer) {
		defaultValue = $paramConfig.default;
	} else {
		let paramConfig = $paramConfig.paramConfig;
		let type: any = typeof paramConfig;

		defaultValue = component[$paramConfig.property];

		let isObject =
			type == 'object' &&
			(!!(paramConfig as IComponentParamConfig).type ||
				(paramConfig as IComponentParamConfig).default !== undefined);

		if (defaultValue === undefined) {
			if (isObject) {
				defaultValue = (paramConfig as IComponentParamConfig).default;
			} else if (type != 'function') {
				defaultValue = paramConfig;
			}
		}

		type = isObject ? (paramConfig as IComponentParamConfig).type : paramConfig;

		if (defaultValue !== undefined && type !== eval) {
			type = typeof defaultValue;

			if (type == 'function') {
				type = 'object';
			}
		}

		typeSerializer = componentParamTypeSerializerMap.get(type);

		if (!typeSerializer) {
			throw new TypeError('Unsupported parameter type');
		}

		$paramConfig.type = type;
		$paramConfig.typeSerializer = typeSerializer;
		$paramConfig.default = defaultValue;
	}

	let el = component.element;
	let snakeCaseName = snakeCaseAttributeName(name, true);
	let rawValue = el.getAttribute(snakeCaseName);

	if (rawValue === null) {
		if ($paramConfig.required) {
			throw new TypeError(`Parameter "${name}" is required`);
		}

		if (defaultValue != null && defaultValue !== false) {
			el.setAttribute(snakeCaseName, typeSerializer.write(defaultValue)!);
		}
	}

	let value = typeSerializer.read(rawValue, defaultValue, el);

	if (component[$paramConfig.property + 'Cell']) {
		component[$paramConfig.property + 'Cell'].set(value);
	} else {
		component[KEY_PARAMS].set(name, value);
	}
}

export const ComponentParams = {
	init(component: BaseComponent) {
		if (component[KEY_COMPONENT_PARAMS_INITED]) {
			return;
		}

		let paramsConfig = (component.constructor as typeof BaseComponent).params;

		if (paramsConfig) {
			let $paramsConfig = component.constructor[KEY_PARAMS_CONFIG];

			for (let name in paramsConfig) {
				if (paramsConfig[name] !== Object.prototype[name]) {
					initParam(component, $paramsConfig[name], name);
				}
			}
		}

		component[KEY_COMPONENT_PARAMS_INITED] = true;
	}
};
