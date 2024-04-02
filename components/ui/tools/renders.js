import { BOX_CHARS } from "./boxDrawing.js";

export function renderRectangleBorder(screenBuffer, x, y, w, h) {
	for (let i = 0; i < w; i++) screenBuffer.put({ x: x + i, y }, BOX_CHARS.HORIZONTAL);
	for (let i = 0; i < h; i++) screenBuffer.put({ x: x + w - 1, y: y + i }, BOX_CHARS.VERTICAL);
	for (let i = 0; i < w; i++) screenBuffer.put({ x: x + i, y: y + h - 1 }, BOX_CHARS.HORIZONTAL);
	for (let i = 0; i < h; i++) screenBuffer.put({ x, y: y + i }, BOX_CHARS.VERTICAL);

	screenBuffer.put({ x, y }, BOX_CHARS.LEFT_TOP);
	screenBuffer.put({ x: x + w - 1, y }, BOX_CHARS.TOP_RIGHT);
	screenBuffer.put({ x: x + w - 1, y: y + h - 1 }, BOX_CHARS.RIGHT_BOTTOM);
	screenBuffer.put({ x, y: y + h - 1 }, BOX_CHARS.BOTTOM_LEFT);
}

export function renderText(screenBuffer, x, y, text, alignment = "left") {
	// let text = this.text;
	// let textLength = text.length;

	// const maxTextLength = this.w - 2;
	// if (textLength > maxTextLength) {
	// 	text = text.substring(0, maxTextLength - 3) + "...";
	// 	textLength = this.text.length;
	// }

	switch (alignment) {
		case "left":
		default:
			break;

		case "center":
			x = Math.ceil((screenBuffer.width - text.length) / 2);
			break;

		case "right":
			x = screenBuffer.width - text.length;
			break;
	}

	screenBuffer.put({ x, y }, text);
}
