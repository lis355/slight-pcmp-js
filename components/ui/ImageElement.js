import Element from "./Element.js";

export default class ImageElement extends Element {
	constructor({ imageScreenBuffer, ...props }) {
		super(props);

		this.imageScreenBuffer = imageScreenBuffer;
	}

	get x() { return 0; }
	get y() { return 0; }
	get width() { return this.imageScreenBuffer.width; }
	get height() { return this.imageScreenBuffer.height; }

	render(screenBuffer, absoluteX, absoluteY) {
		this.imageScreenBuffer.draw({ dst: screenBuffer, x: absoluteX + this.x, y: absoluteY + this.y });
	}
}
