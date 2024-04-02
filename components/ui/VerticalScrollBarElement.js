import { SCROLL_BAR_CHARS } from "./tools/boxDrawing.js";
import * as math from "../../tools/math.js";
import Element from "./Element.js";

export default class VerticalScrollBarElement extends Element {
	constructor({ barPosition, barWidth, ...props } = {}) {
		super(props);

		this.barPosition = barPosition || 0;
		this.barWidth = barWidth || 1;
	}

	get x() { return this.parent.width - 1 - this.width; }
	get y() { return 0; }
	get width() { return 1; }
	get height() { return this.parent.height; }

	// barPosition, barWidth in [0,1]
	setBar(barPosition, barWidth) {
		this.barPosition = math.clamp01(barPosition);
		this.barWidth = math.clamp01(barWidth);
	}

	render(screenBuffer, absoluteX, absoluteY) {
		const barPosition = Math.ceil(this.barPosition * (this.height - 1));
		const barWidth = Math.ceil(this.barWidth * this.height);

		if (barWidth === this.height) {
			for (let i = 0; i < this.height; i++) screenBuffer.put({ x: absoluteX + this.x, y: absoluteY + this.y + i }, SCROLL_BAR_CHARS.EMPTY);
		} else {
			for (let i = 0; i < barPosition; i++) screenBuffer.put({ x: absoluteX + this.x, y: absoluteY + this.y + i }, SCROLL_BAR_CHARS.EMPTY);
			for (let i = barPosition; i < Math.min(this.height, barPosition + barWidth); i++) screenBuffer.put({ x: absoluteX + this.x, y: absoluteY + this.y + i }, SCROLL_BAR_CHARS.BAR);
			for (let i = barPosition + barWidth; i < this.height; i++) screenBuffer.put({ x: absoluteX + this.x, y: absoluteY + this.y + i }, SCROLL_BAR_CHARS.EMPTY);
		}
	}
}
