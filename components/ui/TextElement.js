import { renderText } from "./tools/renders.js";
import Element from "./Element.js";

export default class TextElement extends Element {
	constructor({ text, alignment, ...props } = {}) {
		super(props);

		this.text = text;
		this.alignment = alignment;
	}

	get x() { return 0; }
	get y() { return 0; }
	get w() { return this.text.width; }
	get h() { return 1; }

	render(screenBuffer, absoluteX, absoluteY) {
		renderText(screenBuffer, absoluteX + this.x, absoluteY + this.y, this.text, this.alignment);
	}
}
