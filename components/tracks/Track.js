import { spawn } from "node:child_process";
import path from "node:path";

import moment from "moment";
import NodeID3 from "node-id3";

// TODO refactor
function getFFDirectory() {
	return "C:/Program Files/ffmpeg/bin";
}

export default class Track {
	constructor(filePath) {
		this.filePath = filePath;
	}

	async load() {
		const id3tags = await NodeID3.Promise.read(this.filePath);

		this.imageBuffer = id3tags.image && id3tags.image.imageBuffer;
		this.lyrics = id3tags.unsynchronisedLyrics && id3tags.unsynchronisedLyrics.text;

		let infoStr = "";

		await new Promise(resolve => {
			this.process = spawn(
				`"${path.posix.join(getFFDirectory(), "ffprobe.exe")} "`,
				[
					`"${this.filePath}"`,

					"-v",
					"quiet",

					"-print_format",
					"json",

					"-show_format"
				],
				{
					shell: true
				}
			);

			this.process.stdout.on("data", data => { infoStr += data.toString(); });

			this.process.on("exit", resolve);
		});

		this.info = JSON.parse(infoStr);

		this.tags = this.info.format.tags;

		this.duration = moment.duration(Number(this.info.format.duration), "seconds");
		this.bitrate = Number(this.info.format.bit_rate);
	}
}
