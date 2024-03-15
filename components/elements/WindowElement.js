import terminal from "terminal-kit";

import Element from "./Element.js";

const term = terminal.terminal;

function renderWindowBorder(x, y, w, h) {
	for (let i = 1; i <= w; i++) term.moveTo(x + i, y + 1, "═");
	for (let i = 1; i <= h; i++) term.moveTo(x + w, y + i, "║");
	for (let i = 1; i <= w; i++) term.moveTo(x + i, y + h, "═");
	for (let i = 1; i <= h; i++) term.moveTo(x + 1, y + i, "║");

	term.moveTo(x + 1, y + 1, "╔");
	term.moveTo(x + w, y + 1, "╗");
	term.moveTo(x + w, y + h, "╝");
	term.moveTo(x + 1, y + h, "╚");
}

export default class WindowElement extends Element {
	constructor(x, y, w, h) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	async render() {
		renderWindowBorder(this.x, this.y, this.w, this.h);

		await super.render();
	}

	handleResize() {
		super.handleResize();

		for (const child of this.children) child.handleResize();
	}
}
