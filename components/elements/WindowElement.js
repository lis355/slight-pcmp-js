import Element from "./Element.js";

function renderWindowBorder(screenBuffer, x, y, w, h) {
	for (let i = 0; i < w; i++) screenBuffer.put({ x: x + i, y }, "═");
	for (let i = 0; i < h; i++) screenBuffer.put({ x: x + w - 1, y: y + i }, "║");
	for (let i = 0; i < w; i++) screenBuffer.put({ x: x + i, y: y + h - 1 }, "═");
	for (let i = 0; i < h; i++) screenBuffer.put({ x, y: y + i }, "║");

	screenBuffer.put({ x, y }, "╔");
	screenBuffer.put({ x: x + w - 1, y }, "╗");
	screenBuffer.put({ x: x + w - 1, y: y + h - 1 }, "╝");
	screenBuffer.put({ x, y: y + h - 1 }, "╚");
}

export default class WindowElement extends Element {
	constructor(x, y, w, h) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	async render(screenBuffer) {
		renderWindowBorder(screenBuffer, this.x, this.y, this.w, this.h);

		await super.render(screenBuffer);
	}

	handleResize() {
		super.handleResize();

		for (const child of this.children) child.handleResize();
	}
}
