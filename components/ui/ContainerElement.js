import Element from "./Element.js";

export default class ContainerElement extends Element {
	get x() { return 0; }
	get y() { return 0; }
	get width() { return this.parent.width; }
	get height() { return this.parent.height; }
}
