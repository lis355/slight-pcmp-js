import AudioPlayer from "./AudioPlayer.js";

import { spawn, exec } from "child_process";

function getFFPlayPath() {
	return "C:/Program Files/ffmpeg/bin/ffplay.exe";
}

export default class FFPlayer extends AudioPlayer {
	play() {
		super.play();

		this.ffPlay(0);
	}

	pause() {
		this.ffStop();
	}

	resume() {
	}

	stop() {
		this.ffStop();
	}

	ffPlay(startTime) {
		this.process = spawn(
			`"${getFFPlayPath()}"`,
			[
				`"${this.filePath}"`,
				"-nodisp",
				"-ss",
				startTime.toString()
			],
			{
				shell: true
			}
		);

		// this.process.stdout.on("data", data => console.log(data.toString()));
		// this.process.stderr.on("data", data => console.error(data.toString()));
	}

	ffStop() {
		// kill don't work
		// child.kill("SIGKILL");
		exec("taskkill /pid " + this.process.pid + " /T /F");
	}
}
