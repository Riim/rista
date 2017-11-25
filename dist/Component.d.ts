import { Logger } from '@riim/logger';
import { EventEmitter, IEvent } from 'cellx';
import { IBlock, Template } from 'nelm';
import { IFreezableCell } from './componentBinding';
import { ComponentConfigDecorator } from './ComponentConfigDecorator';
import { DisposableMixin, IDisposableListening, TListener, TListeningTarget } from './DisposableMixin';
import { registerComponent } from './registerComponent';
export interface IPossiblyComponentElement<T extends Component = Component> extends HTMLElement {
    rioniteComponent?: T | null;
    $component?: T;
}
export interface IComponentElement<T extends Component = Component> extends HTMLElement {
    rioniteComponent: T | null;
    $component: T;
}
export interface IComponentElementClassNameMap {
    [elName: string]: string;
}
export declare type TEventHandler<T extends Component = Component, U = IEvent | Event> = (this: T, evt: U, receiver: Element) => boolean | void;
export interface IComponentEvents<T extends Component = Component, U = IEvent | Event> {
    [name: string]: {
        [eventName: string]: TEventHandler<T, U>;
    };
}
export declare class Component extends EventEmitter implements DisposableMixin {
    static Config: typeof ComponentConfigDecorator;
    static register: typeof registerComponent;
    static elementIs: string;
    static elementExtends: string | null;
    static params: {
        [name: string]: any;
    } | null;
    static i18n: {
        [key: string]: any;
    } | null;
    static _blockNamesString: string;
    static _elementBlockNames: Array<string>;
    static template: string | IBlock | Template | null;
    static _rawContent: DocumentFragment | undefined;
    static events: IComponentEvents<Component, IEvent<Component>> | null;
    static domEvents: IComponentEvents<Component, Event> | null;
    logger: Logger;
    _disposables: typeof DisposableMixin.prototype._disposables;
    _ownerComponent: Component | undefined;
    ownerComponent: Component;
    _parentComponent: Component | null | undefined;
    readonly parentComponent: Component | null;
    element: IComponentElement;
    $content: DocumentFragment | null;
    $context: {
        [name: string]: any;
    };
    $specifiedParams: Set<string>;
    _bindings: Array<IFreezableCell> | null;
    _elementListMap: Map<string, NodeListOf<Element>> | undefined;
    _attached: boolean;
    initialized: boolean;
    isReady: boolean;
    constructor(el?: HTMLElement);
    handleEvent(evt: IEvent<Component>): void;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, type: string | Array<string>, listener: TListener | Array<TListener>, context?: any, useCapture?: boolean): IDisposableListening;
    listenTo(target: TListeningTarget | string | Array<TListeningTarget>, listeners: {
        [type: string]: TListener | Array<TListener>;
    }, context?: any, useCapture?: boolean): IDisposableListening;
    _listenTo(target: EventEmitter | EventTarget, type: string, listener: TListener, context: any, useCapture: boolean): IDisposableListening;
    setTimeout: typeof DisposableMixin.prototype.setTimeout;
    setInterval: typeof DisposableMixin.prototype.setInterval;
    registerCallback: typeof DisposableMixin.prototype.registerCallback;
    _attach(): void;
    _detach(): void;
    dispose(): Component;
    _freezeBindings(): void;
    _unfreezeBindings(): void;
    _destroyBindings(): void;
    created(): void;
    initialize(): Promise<any> | void;
    ready(): void;
    elementConnected(): void;
    elementDisconnected(): void;
    elementAttached(): void;
    elementDetached(): void;
    elementMoved(): void;
    $<R = Component | Element>(name: string, container?: Element | Component | string): R | null;
    $$<R = Component | Element>(name: string, container?: Element | Component | string): Array<R>;
    _getElementList(name: string, container?: Element | Component | string): NodeListOf<Element> | undefined;
}
