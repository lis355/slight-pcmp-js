import Element from "./Element.js";

export default class FrameMarginElement extends Element {
	constructor({ leftMargin, topMargin, rightMargin, bottomMargin, ...props }) {
		super(props);

		this.leftMargin = leftMargin;
		this.topMargin = topMargin;
		this.rightMargin = rightMargin;
		this.bottomMargin = bottomMargin;
	}

	get x() { return this.leftMargin; }
	get y() { return this.topMargin; }
	get width() { return this.parent.width - this.leftMargin - this.rightMargin; }
	get height() { return this.parent.height - this.topMargin - this.bottomMargin; }
}
