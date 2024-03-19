
// import moment from "moment";

// import FFPlayer from "./components/player/FFPlayer.js";
// import Track from "./components/tracks/Track.js";

import normalizePath from "./tools/normalizePath.js";
import SlightApplication from "./components/app/SlightApplication.js";

// const trackFilePath = "C:/Users/LIS355/YandexDisk/MUSIC/ARTISTS/Linkin Park/Minutes To Midnight/05. Linkin Park - Minutes To Midnight (2007) - Shadow Of The Day.mp3";

// const t = new Track(trackFilePath);
// await t.load();

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

process.env.CWD = normalizePath(process.cwd());

const application = new SlightApplication();
await application.initialize();
await application.run();
