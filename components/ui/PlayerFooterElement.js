import { Element } from "./Element.js";

/**
 * ╟──────────────────────────────────────────╢
 * ║  Artist / Album / Year / Title / Genre   ║
 * ╚╣▓▓▓▓▓▓░░░░░░░║ 00:00 / 00:10 / 192 KB/s ╠╝
 */

export default class PlayerFooterElement extends Element {
	constructor() {
		super();

		this.handleAudioPlayerStartPlay = this.handleAudioPlayerStartPlay.bind(this);
	}

	get w() { return this.parent.w; }
	get h() { return 3; }

	mounted() {
		super.mounted();

		this.manager.application.audioPlayer.on("startPlay", this.handleAudioPlayerStartPlay);
	}

	unmounted() {
		super.unmounted();

		this.manager.application.audioPlayer.off("startPlay", this.handleAudioPlayerStartPlay);
	}

	async render(screenBuffer, absoluteX, absoluteY) {
		// for (let i = 0; i < this.w; i++) {
		// 	const brightness = Math.floor(this.brightnessBuffer[i] * 255);
		// 	screenBuffer.put({ x: absoluteX + i, y: absoluteY, attr: { color: { r: brightness, g: brightness, b: brightness } } }, CHAR);
		// }

		await super.render(screenBuffer, absoluteX, absoluteY);
	}
}
