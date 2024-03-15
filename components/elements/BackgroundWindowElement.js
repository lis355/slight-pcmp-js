import terminal from "terminal-kit";

import WindowElement from "./WindowElement.js";

const term = terminal.terminal;

export default class BackgroundWindowElement extends WindowElement {
	constructor() {
		super(0, 0, term.width, term.height);
	}

	handleResize() {
		super.handleResize();

		this.w = term.width;
		this.h = term.height;
	}
}
