import fs from "node:fs";

import figlet from "figlet";

import { Element } from "./Element.js";
import { renderText } from "./tools/renders.js";

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

	get x() { return 0; }
	get y() { return 0; }
	get w() { return this.parent.w; }
	get h() { return this.parent.h; }

	async render(screenBuffer, absoluteX, absoluteY) {
		this.renderLogo(screenBuffer, absoluteX, absoluteY);

		await super.render(screenBuffer, absoluteX, absoluteY);
	}

	renderLogo(screenBuffer, absoluteX, absoluteY) {
		const textOffsetX = Math.ceil((screenBuffer.width - this.textW) / 2);
		const textOffsetY = Math.ceil((screenBuffer.height - this.textH) / 2) - 1;

		this.textLines.forEach((line, i) => {
			screenBuffer.put({ x: absoluteX + textOffsetX, y: absoluteY + textOffsetY + i }, line);
		});

		renderText(screenBuffer, absoluteX + textOffsetX, absoluteY + textOffsetY + this.textH, `v${this.version}`, "center");
	}
}
