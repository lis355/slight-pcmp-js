import { Element, Rectangle } from "./Element.js";

export default class FramedElement extends Element {
	constructor(x = 0, y = 0, w = 0, h = 0) {
		super();

		this.container = new Rectangle(x, y, w, h);
	}

	get x() { return this.container.x; }
	get y() { return this.container.y; }
	get w() { return this.container.w; }
	get h() { return this.container.h; }
}
