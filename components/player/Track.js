import TrackInfo from "./TrackInfo.js";

export default class Track {
	constructor(mediaLibrary, filePath, cacheId) {
		this.mediaLibrary = mediaLibrary;
		this.filePath = filePath;
		this.cacheId = cacheId;

		this.info = new TrackInfo(this.filePath);
	}

	async initialize() {
		await this.info.initialize();
	}
}
