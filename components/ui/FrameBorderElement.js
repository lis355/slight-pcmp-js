import Element from "./Element.js";
import { renderRectangleBorder } from "./tools/renders.js";

export default class FrameBorderElement extends Element {
	get x() { return 0; }
	get y() { return 0; }
	get width() { return this.parent.width; }
	get height() { return this.parent.height; }

	render(screenBuffer, absoluteX, absoluteY) {
		renderRectangleBorder(screenBuffer, absoluteX + this.x, absoluteY + this.y, this.width, this.height);
	}
}
