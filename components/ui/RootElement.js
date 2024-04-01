import FramedElement from "./FramedElement.js";

export default class RootElement extends FramedElement {
	setSize(width, height) {
		this.container.w = width;
		this.container.h = height;
	}
}
