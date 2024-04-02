import Element from "./Element.js";

export default class VerticalScrollBarElement extends Element {
	constructor({ position, ...props } = {}) {
		super(props);

		this.position = position || 0;
	}

	get x() { return this.parent.width - 1 - this.width; }
	get y() { return 0; }
	get width() { return 1; }
	get height() { return this.parent.height; }

	render(screenBuffer, absoluteX, absoluteY) {
		const barOffset = Math.ceil(this.position * (this.height - 1));

		for (let i = 0; i < this.height; i++) screenBuffer.put({ x: absoluteX + this.x, y: absoluteY + this.y + i }, barOffset === i ? "█" : "┆");
	}
}
