import terminal from "terminal-kit";

import Track from "./components/tracks/Track.js";

import BackgroundWindowElement from "./components/elements/BackgroundWindowElement.js";
import HeaderTextElement from "./components/elements/HeaderTextElement.js";
import ImageElement from "./components/elements/ImageElement.js";
import RootElement from "./components/elements/RootElement.js";
import WindowElement from "./components/elements/WindowElement.js";

import FFPlayer from "./components/player/FFPlayer.js";

const term = terminal.terminal;

term.fullscreen();

const trackFilePath = "C:/Users/LIS355/YandexDisk/MUSIC/ARTISTS/Linkin Park/Minutes To Midnight/05. Linkin Park - Minutes To Midnight (2007) - Shadow Of The Day.mp3";

const t = new Track(trackFilePath);
await t.load();

const p = new FFPlayer(trackFilePath);
p.play();

const r = new RootElement();

const w = new BackgroundWindowElement();
r.addChild(w);

const coverW = 40;
const coverH = 20;
const w2 = new WindowElement(Math.ceil((term.width - coverW) / 2), Math.ceil((term.height - coverH) / 2), coverW, coverH);
w.addChild(w2);

const cover = new ImageElement(Math.ceil((term.width - coverW) / 2) + 1, Math.ceil((term.height - coverH) / 2) + 1, coverW - 2, coverH - 2, t.tags.image.imageBuffer);
w2.addChild(cover);

const header1 = new HeaderTextElement(0, 0, term.width, ` ${t.tags.artist} - ${t.tags.title} `);
w.addChild(header1);

const header2 = new HeaderTextElement(0, 1, term.width, t.tags.album);
w.addChild(header2);

async function render() {
	term.clear();
	term.hideCursor();

	await r.render();
}

term.on("resize", (width, height) => {
	r.handleResize();

	render();
});

render();
