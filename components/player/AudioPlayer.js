import ApplicationComponent from "../app/ApplicationComponent.js";

export default class AudioPlayer extends ApplicationComponent {
	constructor(filePath) {
		super();

		this.filePath = filePath;
	}

	play(track) {
		this.emit("startPlay", track);
	}

	stop() {
		this.emit("stopPlay");
	}
}
