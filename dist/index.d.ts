import { Parser as BemlParser, Template } from '@riim/beml';
import { IDisposable, IDisposableListening, IDisposableTimeout, IDisposableInterval, IDisposableCallback, TListeningTarget, IListener, default as DisposableMixin } from './DisposableMixin';
import formatters from './formatters';
import { ILocaleSettings, ILocalizationTexts, IGetTextConfig, IGetText, default as getText } from './getText';
import { IPossiblyComponentElement, IComponentElement, IComponentElementClassNameMap, IComponentEvents, default as Component } from './Component';
import KEY_ELEMENT_CONNECTED from './KEY_ELEMENT_CONNECTED';
import KEY_COMPONENT_INPUT_VALUES from './KEY_COMPONENT_INPUT_VALUES';
import { IComponentInput, default as ComponentInput } from './ComponentInput';
import RtContent from './Components/rt-content';
import RtSlot from './Components/rt-slot';
import { TIfCell as TRtIfThenIfCell, default as RtIfThen } from './Components/rt-if-then';
import RtIfElse from './Components/rt-if-else';
import { TListCell as TRtRepeatListCell, IItem as IRtRepeatItem, TItemList as TRtRepeatItemList, TItemMap as TRtRepeatItemMap, default as RtRepeat } from './Components/rt-repeat';
import d from './d';
import './bemlTemplateHelpers';
declare let Components: {
    RtContent: typeof RtContent;
    RtSlot: typeof RtSlot;
    RtIfThen: typeof RtIfThen;
    RtIfElse: typeof RtIfElse;
    RtRepeat: typeof RtRepeat;
};
declare let Utils: {
    camelize: (str: string) => string;
    hyphenize: (str: string) => string;
    escapeString: (str: string) => string;
    escapeHTML: (str: string) => string;
    unescapeHTML: (str: string) => string;
    isRegExp: (value: any) => boolean;
    defer: (cb: () => void, context?: any) => void;
    htmlToFragment: (html: string) => DocumentFragment;
};
export { BemlParser, Template, IDisposable, IDisposableListening, IDisposableTimeout, IDisposableInterval, IDisposableCallback, TListeningTarget, IListener, DisposableMixin, formatters, ILocaleSettings, ILocalizationTexts, IGetTextConfig, IGetText, getText, IPossiblyComponentElement, IComponentElement, IComponentElementClassNameMap, IComponentEvents, Component, KEY_ELEMENT_CONNECTED, KEY_COMPONENT_INPUT_VALUES, IComponentInput, ComponentInput, TRtIfThenIfCell, TRtRepeatListCell, IRtRepeatItem, TRtRepeatItemList, TRtRepeatItemMap, Components, d, Utils };
