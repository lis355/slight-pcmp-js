import fs from "node:fs";

import figlet from "figlet";

import Element from "./Element.js";
import renderText from "./tools/renderText.js";

export default class LogoElement extends Element {
	constructor() {
		super();

		const { version, name } = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

		this.version = version;

		const data = figlet.textSync(name, { font: "ANSI Shadow" });

		this.textLines = data.split("\n");
		this.textW = this.textLines[0].length;
		this.textH = this.textLines.length;
	}

	async render(screenBuffer) {
		this.renderLogo(screenBuffer);

		await super.render(screenBuffer);
	}

	renderLogo(screenBuffer) {
		const x = Math.ceil((screenBuffer.width - this.textW) / 2);
		const y = Math.ceil((screenBuffer.height - this.textH) / 2) - 1;

		this.textLines.forEach((line, i) => {
			screenBuffer.put({ x, y: y + i }, line);
		});

		renderText(screenBuffer, x, y + this.textH, `v${this.version}`, "center");
	}
}
