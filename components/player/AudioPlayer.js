import EventEmitter from "node:events";

export default class AudioPlayer extends EventEmitter {
	constructor(filePath) {
		super();

		this.filePath = filePath;
	}

	play(position) { }
	stop() { }
}
