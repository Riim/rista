"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var cellx = require("cellx");
var Component_1 = require("../Component");
var d_1 = require("../d");
var bindContent_1 = require("../bindContent");
var attachChildComponentElements_1 = require("../attachChildComponentElements");
var Features_1 = require("../Features");
var KEY_TEMPLATES_FIXED = cellx.JS.Symbol('Rionite.RtContent#templatesFixed');
var RtContent = (function (_super) {
    __extends(RtContent, _super);
    function RtContent() {
        return _super.apply(this, arguments) || this;
    }
    RtContent.prototype._attachElement = function () {
        var ownerComponent = this.ownerComponent;
        var el = this.element;
        var props = this.props;
        if (this.isReady) {
            for (var child = void 0; (child = el.firstChild);) {
                el.removeChild(child);
            }
        }
        else {
            var inputContent = props.content = document.createDocumentFragment();
            for (var child = void 0; (child = el.firstChild);) {
                inputContent.appendChild(child);
            }
            var ownerComponentInputContent = ownerComponent.props.content;
            var selector = this.elementAttributes['select'];
            if (selector) {
                if (!Features_1.templateTag && !ownerComponentInputContent[KEY_TEMPLATES_FIXED]) {
                    var templates = ownerComponentInputContent.querySelectorAll('template');
                    for (var i = templates.length; i;) {
                        templates[--i].content;
                    }
                    ownerComponentInputContent[KEY_TEMPLATES_FIXED] = true;
                }
                var selectedEls = ownerComponentInputContent.querySelectorAll(selector);
                var selectedElCount = selectedEls.length;
                if (selectedElCount) {
                    var rawContent = this._rawContent = document.createDocumentFragment();
                    for (var i = 0; i < selectedElCount; i++) {
                        rawContent.appendChild(selectedEls[i].cloneNode(true));
                    }
                }
                else {
                    this._rawContent = inputContent;
                }
            }
            else {
                this._rawContent = ownerComponentInputContent.firstChild ? ownerComponentInputContent : inputContent;
            }
            this.isReady = true;
        }
        var content = this._rawContent.cloneNode(true);
        var getContext = props['getContext'];
        var _a = this._rawContent == props.content ?
            bindContent_1.default(content, ownerComponent, getContext ? ownerComponent[getContext](this, props.context) : props.context) :
            bindContent_1.default(content, ownerComponent.ownerComponent, getContext ?
                ownerComponent[getContext](this, ownerComponent.props.context) :
                ownerComponent.props.context), bindings = _a.bindings, childComponents = _a.childComponents;
        this._bindings = bindings;
        el.appendChild(content);
        if (!Features_1.nativeCustomElements && childComponents) {
            attachChildComponentElements_1.default(childComponents);
        }
    };
    RtContent.prototype._detachElement = function () {
        this._destroyBindings();
    };
    return RtContent;
}(Component_1.default));
RtContent = __decorate([
    d_1.default.Component({
        elementIs: 'rt-content',
        props: {
            select: { type: String, readonly: true },
            getContext: { type: String, readonly: true }
        },
        template: ''
    })
], RtContent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RtContent;