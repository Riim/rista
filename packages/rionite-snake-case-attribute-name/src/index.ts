let reCamelCase = /^_?[a-z][0-9a-z]*$/i;
let reLetters = /[A-Z][^A-Z]/g;
let reLetters2 = /[A-Z]{2,}/g;

let cache = new Map<string, string>();

export function snakeCaseAttributeName(str: string, useCache?: boolean): string {
	let value: string;

	return (
		(useCache && cache.get(str)) ||
		((value = reCamelCase.test(str)
			? str
					.replace(reLetters, word => '_' + word)
					.replace(reLetters2, word => '_' + word)
					.toLowerCase()
			: str),
		useCache && cache.set(str, value),
		value)
	);
}
