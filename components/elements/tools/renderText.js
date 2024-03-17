export default function renderText(screenBuffer, x, y, text, alignment = "left") {
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
