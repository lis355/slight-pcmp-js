import fs from "node:fs";

import figlet from "figlet";

import Element from "./Element.js";

export default class LogoElement extends Element {
	constructor() {
		super();

		const name = JSON.parse(fs.readFileSync("./package.json", "utf-8")).name;

		const data = figlet.textSync(name, { font: "ANSI Shadow" });

		this.lines = data.split("\n");
		this.w = this.lines[0].length;
		this.h = this.lines.length;
	}

	async render(screenBuffer) {
		this.renderLogo(screenBuffer);

		await super.render(screenBuffer);
	}

	renderLogo(screenBuffer) {
		const x = Math.ceil((screenBuffer.width - this.w) / 2);
		const y = Math.ceil((screenBuffer.height - this.h) / 2);

		this.lines.forEach((line, i) => {
			screenBuffer.put({ x, y: y + i }, line);
		});
	}
}
