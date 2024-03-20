import terminal from "terminal-kit";

import ApplicationComponent from "../app/ApplicationComponent.js";
import BackgroundWindowElement from "./BackgroundWindowElement.js";
import ImageElement from "./ImageElement.js";
import LogoElement from "./LogoElement.js";
import LyricsElement from "./LyricsElement.js";
import RootElement from "./RootElement.js";
import TextElement from "./TextElement.js";
import WindowElement from "./WindowElement.js";

import Track from "../player/Track.js";

const term = terminal.createTerminal({ appId: "xterm-truecolor" });

term.clear();
term.hideCursor();

const CELL_SIZES = {
	"vscodeIntegratedMinGWWindows": [7, 17],
	"externalWindows": [8, 16]
};

const CELL_SIZE = CELL_SIZES.vscodeIntegratedMinGWWindows;

export default class UIManager extends ApplicationComponent {
	async initialize() {
		await super.initialize();

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

		this.mainScreenBuffer = new terminal.ScreenBufferHD({ dst: term });

		this.rootElement = new RootElement();

		this.backgroundWindowElement = new BackgroundWindowElement(this.mainScreenBuffer.width, this.mainScreenBuffer.height);
		this.rootElement.addChild(this.backgroundWindowElement);

		// this.logoElement = new LogoElement();
		// this.backgroundWindowElement.addChild(this.logoElement);

		// this. lyricsElement = new LyricsElement(t);
		// this.backgroundWindowElement.addChild(lyricsElement);

		// const coverW = 40;
		// const coverH = 18;
		// const coverBorderWindowElement = new WindowElement(
		// 	1, // Math.ceil((screenBuffer.width - coverW) / 2),
		// 	Math.ceil((this.mainScreenBuffer.height - coverH) / 2),
		// 	coverW,
		// 	coverH
		// );
		// backgroundWindowElement.addChild(coverBorderWindowElement);

		let x = 0;
		for (const trackFilePath of [
			"C:/Users/LIS355/Desktop/MSC/Benny Benassi/The Biz - Hypnotica/01. Benny Benassi - The Biz - Hypnotica (2003) - Satisfaction (Isak Original).mp3",
			"C:/Users/LIS355/Desktop/MSC/Ber-Linn/В.П.Н.С/01. Ber-Linn - В.П.Н.С. (2003) - Даша.mp3",
			"C:/Users/LIS355/Desktop/MSC/Billy Talent/Billy Talent II/01. Billy Talent - Billy Talent II (2006) - Devil In A Midnight Mass.mp3"
		]) {
			const t = new Track(trackFilePath);
			await t.initialize();

			const w = 10;
			const h = Math.floor(CELL_SIZE[0] / CELL_SIZE[1] * w);

			const screenBuffer = await this.application.coversCache.getCoverScreenBufferForTrack(t, w, h);

			const cover = new ImageElement(
				1 + x,
				1,
				screenBuffer
			);
			this.backgroundWindowElement.addChild(cover);

			x += w + 1;
		}

		// const header1 = new TextElement(0, 0, ` ${t.tags.artist} - ${t.tags.title} `, "center");
		// backgroundWindowElement.addChild(header1);

		// const header2 = new TextElement(0, 1, t.tags.album, "center");
		// backgroundWindowElement.addChild(header2);

		term.on("resize", this.handleTerminalOnResize.bind(this));

		term.grabInput(true);

		term.on("key", this.handleTerminalOnKey.bind(this));
	}

	async run() {
		await super.run();

		await this.render();
	}

	async render() {
		this.mainScreenBuffer.clear();

		await this.rootElement.render(this.mainScreenBuffer);

		// renderBar(moment.duration("PT0S"), 0);

		this.mainScreenBuffer.draw({ delta: true });
	}

	handleTerminalOnResize(width, height) {
		// 	rootElement.handleResize();

		// 	render();
	}

	handleTerminalOnKey(name) {
		switch (name) {
			case "UP":
				// lyricsElement.offsetY--;
				// render();
				break;
			case "DOWN":
				// lyricsElement.offsetY++;
				// render();
				break;
		}
	}
}
