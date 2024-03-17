import Element from "./Element.js";
import renderText from "./tools/renderText.js";

export default class LyricsElement extends Element {
	constructor(track) {
		super();

		this.track = track;
		this.offsetY = 3;
	}

	async render(screenBuffer) {
		this.renderLyrics(screenBuffer);

		await super.render(screenBuffer);
	}

	renderLyrics(screenBuffer) {
		const lines = (this.track.lyrics || "No lyrics").split("\n").map(x => x.trim());

		lines.forEach((line, i) => {
			renderText(screenBuffer, 0, this.offsetY + i, line, "center");
		});
	}
}
