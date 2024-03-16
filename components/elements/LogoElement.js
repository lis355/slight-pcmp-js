import fs from "node:fs";

import terminal from "terminal-kit";
import figlet from "figlet";

import Element from "./Element.js";

const term = terminal.terminal;

export default class LogoElement extends Element {
	constructor() {
		super();

		const name = JSON.parse(fs.readFileSync("./package.json", "utf-8")).name;

		const data = figlet.textSync(name, { font: "ANSI Shadow" });

		this.lines = data.split("\n");
		this.w = this.lines[0].length;
		this.h = this.lines.length;
	}

	async render() {
		this.renderLogo();

		await super.render();
	}

	renderLogo() {
		const x = Math.ceil((term.width - this.w) / 2);
		const y = Math.ceil((term.height - this.h) / 2);

		this.lines.forEach((line, i) => {
			term.moveTo(1 + x, 1 + y + i, line);
		});
	}
}
