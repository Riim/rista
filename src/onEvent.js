/**
 * @typesign (evt: cellx~Event|Event);
 */
export default function onEvent(evt) {
	let node;
	let attrName;
	let targetEls;

	if (evt instanceof Event) {
		node = evt.target;
		attrName = 'rt-' + evt.type;
	} else {
		node = evt.target.element;
		attrName = 'rt-component-' + evt.type;
	}

	for (;;) {
		if (node.nodeType == 1 && node.hasAttribute(attrName)) {
			(targetEls || (targetEls = [])).push(node);
		}

		node = node.parentNode;

		if (!node) {
			break;
		}

		let component = node.$c;

		if (component && targetEls) {
			for (let i = 0, l = targetEls.length; i < l; i++) {
				let targetEl = targetEls[i];
				let handler = component[targetEl.getAttribute(attrName)];

				if (typeof handler == 'function') {
					if (handler.call(component, evt, targetEl.$c || targetEl) === false) {
						evt.isPropagationStopped = true;
						return;
					}

					if (evt.isPropagationStopped) {
						return;
					}
				}
			}
		}
	}
}
