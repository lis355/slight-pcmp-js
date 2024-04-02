import Element from "./Element.js";

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

// const trackFilePath = "C:/Users/LIS355/YandexDisk/MUSIC/ARTISTS/Linkin Park/Minutes To Midnight/05. Linkin Park - Minutes To Midnight (2007) - Shadow Of The Day.mp3";

// const t = new Track(trackFilePath);
// await t.initialize();

// const p = new FFPlayer(trackFilePath);
// // p.play(moment.duration("PT0S"));

// function renderBar(time, progress) {
// 	// ╣▓▓▓▓▓▓░░░░░░░░╬ 00:00 / 00:10 | 192 KB/s ╠

// 	const statusStr = `${moment.utc(time.asMilliseconds()).format("mm:ss")} / ${moment.utc(t.duration.asMilliseconds()).format("mm:ss")} ║ ${Math.floor(t.info.format.bit_rate / 1000)} KB/s`;

// 	const barLength = screenBuffer.width - 7 - statusStr.length;
// 	const progressInUnit = Math.floor(barLength * progress);
// 	const barStr = "▓".repeat(progressInUnit) + "░".repeat(barLength - progressInUnit);

// 	screenBuffer.put({ x: 1, y: screenBuffer.height - 1 }, `╣${barStr}║ ${statusStr} ╠`);
// }

// p.on("played", time => {
// 	const progress = Math.min(1, time.asSeconds() / t.duration.asSeconds());
// 	renderBar(time, progress);

// 	screenBuffer.draw({ delta: true });
// });

// p.on("stopped", () => {
// 	renderBar(t.duration, 1);

// 	screenBuffer.draw({ delta: true });
// });
