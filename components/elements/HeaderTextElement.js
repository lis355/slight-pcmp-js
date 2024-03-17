import Element from "./Element.js";

export default class HeaderTextElement extends Element {
	constructor(x, y, w, text) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.text = text;
	}

	async render(screenBuffer) {
		this.renderHeader(screenBuffer);

		await super.render(screenBuffer);
	}

	renderHeader(screenBuffer) {
		let text = this.text;
		let textLength = text.length;

		const maxTextLength = this.w - 2;
		if (textLength > maxTextLength) {
			text = text.substring(0, maxTextLength - 3) + "...";
			textLength = this.text.length;
		}

		screenBuffer.put({ x: this.x + Math.ceil((this.w - textLength) / 2), y: this.y }, this.text);
	}
}
