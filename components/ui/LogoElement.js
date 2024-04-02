import figlet from "figlet";

import { renderText } from "./tools/renders.js";
import BorderElement from "./BorderElement.js";
import ContainerElement from "./ContainerElement.js";
import Element from "./Element.js";
import FrameElement from "./FrameElement.js";

export default class LogoElement extends Element {
	constructor({ name, version, ...props }) {
		super(props);

		this.version = version;

		const data = figlet.textSync(name, { font: "ANSI Shadow" });

		this.textLines = data.split("\n");
		this.textW = this.textLines[0].length;
		this.textH = this.textLines.length;
	}

	static create({ name, version }) {
		const element = new ContainerElement({
			children: [
				new BorderElement(),
				new FrameElement({
					leftMargin: 1,
					topMargin: 1,
					rightMargin: 1,
					bottomMargin: 1,
					children: [
						new LogoElement({ name, version })
					]
				})
			]
		});

		return element;
	}

	get x() { return 0; }
	get y() { return 0; }
	get w() { return this.parent.w; }
	get h() { return this.parent.h; }

	render(screenBuffer, absoluteX, absoluteY) {
		const textOffsetX = Math.ceil((screenBuffer.width - this.textW) / 2);
		const textOffsetY = Math.ceil((screenBuffer.height - this.textH) / 2) - 1;

		this.textLines.forEach((line, i) => {
			screenBuffer.put({ x: absoluteX + textOffsetX, y: absoluteY + textOffsetY + i }, line);
		});

		renderText(screenBuffer, absoluteX + textOffsetX, absoluteY + textOffsetY + this.textH, `v${this.version}`, "center");
	}
}
