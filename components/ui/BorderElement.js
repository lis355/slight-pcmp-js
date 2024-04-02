import { renderRectangleBorder } from "./tools/renders.js";
import Element from "./Element.js";

export default class BorderElement extends Element {
	get x() { return 0; }
	get y() { return 0; }
	get width() { return this.parent.width; }
	get height() { return this.parent.height; }

	render(screenBuffer, absoluteX, absoluteY) {
		renderRectangleBorder(screenBuffer, absoluteX + this.x, absoluteY + this.y, this.width, this.height);
	}
}
