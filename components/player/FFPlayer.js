import { spawn, exec } from "node:child_process";

import moment from "moment";

import AudioPlayer from "./AudioPlayer.js";
import { getFFMpegFFPlayPath } from "./ffmpegPathProvider.js";

export default class FFPlayer extends AudioPlayer {
	play(position = 0) {
		super.play();

		this.ffPlay(position);
	}

	stop() {
		this.ffStop();
	}

	ffPlay(position) {
		this.process = spawn(
			`"${getFFMpegFFPlayPath()} "`,
			[
				`"${this.filePath}"`,

				"-nodisp",
				"-autoexit",
				"-hide_banner",

				"-loglevel",
				"8",

				"-stats",

				"-ss",
				moment.utc(position.asMilliseconds()).format("HH:mm:ss.SSS")
			],
			{
				shell: true
			}
		);

		// this.process.stdout.on("data", data => console.log(data.toString()));
		this.process.stderr.on("data", data => {
			for (let line of data.toString().split("\r")) {
				const parts = line.trim().split(" ");
				if (parts.length > 1) {
					const time = Number(parts[0]);
					if (Number.isFinite(time) &&
						time > 0) {
						this.emit("played", moment.duration(time, "seconds"));
					}
				}
			}
		});

		// this.process.stdin.write("q");

		this.process.on("exit", () => {
			this.emit("stopped");
		});
	}

	ffStop() {
		// kill don't work
		// child.kill("SIGKILL");
		exec("taskkill /pid " + this.process.pid + " /T /F");
	}
}
