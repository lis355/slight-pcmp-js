import Element from "./Element.js";
import renderText from "./tools/renderText.js";

export default class TextElement extends Element {
	constructor(x, y, text, alignment) {
		super();

		this.x = x;
		this.y = y;
		this.text = text;
		this.alignment = alignment;
	}

	async render(screenBuffer) {
		renderText(screenBuffer, this.x, this.y, this.text, this.alignment);

		await super.render(screenBuffer);
	}
}
