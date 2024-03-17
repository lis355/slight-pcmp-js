import moment from "moment";
import terminal from "terminal-kit";

import FFPlayer from "./components/player/FFPlayer.js";
import Track from "./components/tracks/Track.js";

import BackgroundWindowElement from "./components/elements/BackgroundWindowElement.js";
import HeaderTextElement from "./components/elements/HeaderTextElement.js";
import ImageElement from "./components/elements/ImageElement.js";
import LogoElement from "./components/elements/LogoElement.js";
import RootElement from "./components/elements/RootElement.js";
import WindowElement from "./components/elements/WindowElement.js";

const term = terminal.createTerminal({
	appId: "xterm-truecolor"
});

term.clear();
term.hideCursor();

const screenBuffer = new terminal.ScreenBufferHD({
	dst: term
});

const trackFilePath = "C:/Users/LIS355/YandexDisk/MUSIC/ARTISTS/Linkin Park/Minutes To Midnight/05. Linkin Park - Minutes To Midnight (2007) - Shadow Of The Day.mp3";

const t = new Track(trackFilePath);
await t.load();

const p = new FFPlayer(trackFilePath);
// p.play(moment.duration("PT0S"));

function renderBar(time, progress) {
	// ╣▓▓▓▓▓▓░░░░░░░░╬ 00:00 / 00:10 | 192 KB/s ╠

	const statusStr = `${moment.utc(time.asMilliseconds()).format("mm:ss")} / ${moment.utc(t.duration.asMilliseconds()).format("mm:ss")} ║ ${Math.floor(t.info.format.bit_rate / 1000)} KB/s`;

	const barLength = screenBuffer.width - 7 - statusStr.length;
	const progressInUnit = Math.floor(barLength * progress);
	const barStr = "▓".repeat(progressInUnit) + "░".repeat(barLength - progressInUnit);

	screenBuffer.put({ x: 1, y: screenBuffer.height - 1 }, `╣${barStr}║ ${statusStr} ╠`);
}

p.on("played", time => {
	const progress = Math.min(1, time.asSeconds() / t.duration.asSeconds());
	renderBar(time, progress);

	screenBuffer.draw({ delta: true });
});

p.on("stopped", () => {
	renderBar(t.duration, 1);

	screenBuffer.draw({ delta: true });
});

const rootElement = new RootElement();
const backgroundWindowElement = new BackgroundWindowElement();
rootElement.addChild(backgroundWindowElement);

const logoElement = new LogoElement();
backgroundWindowElement.addChild(logoElement);

const coverW = 40;
const coverH = 18;
const w2 = new WindowElement(Math.ceil((term.width - coverW) / 2), Math.ceil((term.height - coverH) / 2), coverW, coverH);
backgroundWindowElement.addChild(w2);

const cover = new ImageElement(Math.ceil((term.width - coverW) / 2) + 1, Math.ceil((term.height - coverH) / 2) + 1, coverW - 2, coverH - 2, t.tags.image.imageBuffer);
w2.addChild(cover);

const header1 = new HeaderTextElement(0, 0, term.width, ` ${t.tags.artist} - ${t.tags.title} `);
backgroundWindowElement.addChild(header1);

const header2 = new HeaderTextElement(0, 1, term.width, t.tags.album);
backgroundWindowElement.addChild(header2);

async function render() {
	await rootElement.render(screenBuffer);

	renderBar(moment.duration("PT0S"), 0);

	screenBuffer.draw({ delta: true });
}

term.on("resize", (width, height) => {
	rootElement.handleResize();

	render();
});

term.grabInput(true);

term.on("key", name => {
	switch (name) {
		case "LEFT":
			cover.x--;
			render();
			break;
		case "RIGHT":
			cover.x++;
			render();
			break;
	}
});

render();
