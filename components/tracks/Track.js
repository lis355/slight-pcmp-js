import NodeID3 from "node-id3";

export default class Track {
	constructor(fileName) {
		this.fileName = fileName;
	}

	async load() {
		this.tags = await NodeID3.Promise.read(this.fileName);
	}
}
