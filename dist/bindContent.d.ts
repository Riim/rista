import cellx = require('cellx');
import Component from './Component';
export default function bindContent(content: Node, ownerComponent: Component, context?: Object): {
    bindings: Array<cellx.Cell<any>> | null;
    childComponents: Array<Component> | null;
};