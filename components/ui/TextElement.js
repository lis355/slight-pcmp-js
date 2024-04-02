import { renderText } from "./tools/renderText.js";
import Element from "./Element.js";

export default class TextElement extends Element {
	constructor({ text, alignment, ...props } = {}) {
		super(props);

		this.text = text;
		this.alignment = alignment;
	}

	render(screenBuffer, absoluteX, absoluteY) {
		renderText(screenBuffer, absoluteX + this.x, absoluteY + this.y, this.text, this.alignment);
	}
}
