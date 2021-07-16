import { BaseComponent } from '../BaseComponent';
import { Component } from '../decorators/Component';

@Component({
	elementIs: 'RnHtml',

	params: {
		html: { type: String }
	}
})
export class RnHtml extends BaseComponent {
	html: string;

	override ready() {
		this._setHtml();
	}

	override connected() {
		this.listenTo(this, 'change:html', this._onHtmlChange);
	}

	_onHtmlChange() {
		this._setHtml();
	}

	_setHtml() {
		this.element.innerHTML = this.html || '';
	}
}
