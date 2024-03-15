import terminal from "terminal-kit";

import Element from "./Element.js";

const term = terminal.terminal;

export default class HeaderTextElement extends Element {
	constructor(x, y, w, text) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.text = text;
	}

	async render() {
		this.renderHeader();

		await super.render();
	}

	renderHeader() {
		let text = this.text;
		let textLength = text.length;

		const maxTextLength = this.w - 2;
		if (textLength > maxTextLength) {
			text = text.substring(0, maxTextLength - 3) + "...";
			textLength = this.text.length;
		}

		term.moveTo(1 + this.x + Math.ceil((this.w - textLength) / 2), 1 + this.y, this.text);
	}
}
