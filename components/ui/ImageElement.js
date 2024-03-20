import Element from "./Element.js";

export default class ImageElement extends Element {
	constructor(x, y, screenBuffer) {
		super();

		this.x = x;
		this.y = y;
		this.screenBuffer = screenBuffer;
	}

	async render(screenBuffer) {
		this.screenBuffer.draw({ dst: screenBuffer, x: this.x, y: this.y });

		await super.render(screenBuffer);
	}
}
