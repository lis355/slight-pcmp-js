import TrackInfo from "./TrackInfo.js";

export default class Track {
	constructor(filePath) {
		this.filePath = filePath;
		this.info = new TrackInfo(this.filePath);
	}

	async initialize() {
		await this.info.initialize();
	}
}
