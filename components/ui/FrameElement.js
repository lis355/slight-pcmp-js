import Element from "./Element.js";

export default class FrameElement extends Element {
	constructor({
		leftMargin, topMargin, rightMargin, bottomMargin,
		verticalAlignment, horizontalAlignment,
		...props }) {
		super(props);

		this.leftMargin = leftMargin || 0;
		this.topMargin = topMargin || 0;
		this.rightMargin = rightMargin || 0;
		this.bottomMargin = bottomMargin || 0;

		this.verticalAlignment = verticalAlignment || "TOP";
		this.horizontalAlignment = horizontalAlignment || "LEFT";
	}

	get x() {
		switch (this.horizontalAlignment) {
			case "LEFT": return this.leftMargin;
			case "CENTER": return this.leftMargin + Math.ceil((this.parent.width - this.leftMargin - this.rightMargin) / 2);
			case "RIGHT": return this.leftMargin + this.parent.width - this.rightMargin - 1;
		}
	}

	get y() {
		switch (this.verticalAlignment) {
			case "TOP": return this.topMargin;
			case "CENTER": return this.topMargin + Math.ceil((this.parent.height - this.topMargin - this.bottomMargin) / 2);
			case "BOTTOM": return this.topMargin + this.parent.height - this.bottomMargin - 1;
		}
	}

	get width() { return this.parent.width - this.leftMargin - this.rightMargin; }

	get height() { return this.parent.height - this.topMargin - this.bottomMargin; }
}
