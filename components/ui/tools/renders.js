export function renderRectangleBorder(screenBuffer, x, y, w, h) {
	for (let i = 0; i < w; i++) screenBuffer.put({ x: x + i, y }, "═");
	for (let i = 0; i < h; i++) screenBuffer.put({ x: x + w - 1, y: y + i }, "║");
	for (let i = 0; i < w; i++) screenBuffer.put({ x: x + i, y: y + h - 1 }, "═");
	for (let i = 0; i < h; i++) screenBuffer.put({ x, y: y + i }, "║");

	screenBuffer.put({ x, y }, "╔");
	screenBuffer.put({ x: x + w - 1, y }, "╗");
	screenBuffer.put({ x: x + w - 1, y: y + h - 1 }, "╝");
	screenBuffer.put({ x, y: y + h - 1 }, "╚");
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
