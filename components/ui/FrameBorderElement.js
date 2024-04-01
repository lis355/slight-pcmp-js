import { Element } from "./Element.js";
import { renderRectangleBorder } from "./tools/renders.js";

export default class FrameBorderElement extends Element {
	get x() { return 0; }
	get y() { return 0; }
	get w() { return this.parent.w; }
	get h() { return this.parent.h; }

	async render(screenBuffer, absoluteX, absoluteY) {
		renderRectangleBorder(screenBuffer, absoluteX + this.x, absoluteY + this.y, this.w, this.h);

		await super.render(screenBuffer, absoluteX, absoluteY);
	}
}
