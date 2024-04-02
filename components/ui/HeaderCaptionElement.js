import { renderText } from "./tools/renders.js";
import Element from "./Element.js";

export default class HeaderCaptionElement extends Element {
	constructor({ caption = "", ...props } = {}) {
		super(props);

		this.caption = "";
	}

	get x() { return 2; }
	get y() { return 0; }

	async render(screenBuffer, absoluteX, absoluteY) {
		renderText(screenBuffer, absoluteX + this.x, absoluteY + this.y, `╣ ${this.caption} ╠`);

		await super.render(screenBuffer, absoluteX, absoluteY);
	}
}
