import { IContentNodeValueBinding, IContentNodeValueBindingFormatter } from './ContentNodeValueParser';

const cache: { [key: string]: string } = Object.create(null);

function formattersReducer(jsExpr: string, formatter: IContentNodeValueBindingFormatter): string {
	let args = formatter.arguments;

	return `(this.${formatter.name} || formatters.${
		formatter.name
	}).call(this['$/'], ${jsExpr}${
		args && args.value.length ? ', ' + args.value.join(', ') : ''
	})`;
}

export function bindingToJSExpression(binding: IContentNodeValueBinding): string {
	let bindingRaw = binding.raw;

	if (cache[bindingRaw]) {
		return cache[bindingRaw];
	}

	let formatters = binding.formatters;

	if (binding.keypath) {
		let keys = binding.keypath.split('.');
		let keyCount = keys.length;

		if (keyCount == 1) {
			return (cache[bindingRaw] = formatters
				? formatters.reduce(formattersReducer, `this['${keys[0]}']`)
				: `this['${keys[0]}']`);
		}

		let index = keyCount - 2;
		let jsExprArr = Array(index);

		while (index) {
			jsExprArr[--index] = ` && (temp = temp['${keys[index + 1]}'])`;
		}

		let jsExpr = `(temp = this['${keys[0]}'])${jsExprArr.join('')} && temp['${
			keys[keyCount - 1]
		}']`;

		return (cache[bindingRaw] = formatters
			? formatters.reduce(formattersReducer, jsExpr)
			: jsExpr);
	}

	return (cache[bindingRaw] = formatters
		? formatters.reduce(formattersReducer, binding.value!)
		: binding.value!);
}
