import { Container } from '@riim/di';
import { logger } from '@riim/logger';
import './lib/polyfills';
import './lib/templateHelpers';

export { NodeType as NelmNodeType, IBlock as INelmBlock, Parser as NelmParser } from 'nelm-parser';
export {
	IDisposable,
	IDisposableListening,
	IDisposableTimeout,
	IDisposableInterval,
	IDisposableCallback,
	TListeningTarget,
	TListener,
	DisposableMixin
} from './DisposableMixin';
export { formatters } from './lib/formatters';
export { Component } from './decorators/Component';
export { Param } from './decorators/Param';
export {
	IComponentParamConfig,
	I$ComponentParamConfig,
	IPossiblyComponentElement,
	IComponentElement,
	IComponentElementClassNameMap,
	TEventHandler,
	IComponentEvents,
	KEY_PARAMS_CONFIG,
	KEY_PARAMS,
	BaseComponent
} from './BaseComponent';
export { KEY_ELEMENT_CONNECTED } from './ElementProtoMixin';
export { ComponentParams } from './ComponentParams';
export { Template } from './Template';
export { registerComponent } from './registerComponent';
export { TIfCell as TRtIfThenIfCell, RnIfThen } from './components/RnIfThen';
export { RnIfElse } from './components/RnIfElse';
export {
	TList as TRtRepeatList,
	TListCell as TRtRepeatListCell,
	I$Item as IRtRepeatItem,
	T$ItemMap as TRtRepeatItemMap,
	RnRepeat
} from './components/RnRepeat';
export { RnSlot } from './components/RnSlot';

Container.registerService('logger', logger);
