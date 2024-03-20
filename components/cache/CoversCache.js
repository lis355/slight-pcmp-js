import path from "node:path";

import _ from "lodash";
import fs from "fs-extra";
import Jimp from "jimp";
import terminal from "terminal-kit";

import ApplicationComponent from "../app/ApplicationComponent.js";
import hash from "../../tools/hash.js";

export default class CoversCache extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		fs.ensureDirSync(this.application.applicationCache.getCacheObjectAbsolutePath("covers"));

		this.cachedScreenBuffers = {};
	}

	async getCoverScreenBufferForTrack(track, width, height) {
		const applicationCache = this.application.applicationCache;

		const trackFilePathHash = hash(applicationCache.getFileId(track.filePath));
		const sizeId = `${width}x${height}`;
		const screenBufferId = `${trackFilePathHash}.${sizeId}`;

		let screenBuffer = _.get(this.cachedScreenBuffers, screenBufferId);
		if (!screenBuffer) {
			const coverHash = path.posix.join("covers", `${hash(applicationCache.getFileId(track.filePath), width, height)}.data`);
			const coverHashFilePath = applicationCache.getCacheObjectAbsolutePath(coverHash);
			if (!applicationCache.hasCacheFile(coverHash)) {
				screenBuffer = await this.createScreenBufferFromTrackImageBuffer(track, width, height);

				screenBuffer.saveSync(coverHashFilePath);
			} else {
				screenBuffer = terminal.ScreenBufferHD.loadSync(coverHashFilePath);
			}

			_.set(this.cachedScreenBuffers, screenBufferId, screenBuffer);
		}

		return screenBuffer;
	}

	async createScreenBufferFromTrackImageBuffer(track, width, height) {
		const imageBuffer = track.info.imageBuffer;

		const image = await Jimp.read(imageBuffer);
		image.resize(width, height * 2);

		const screenBuffer = new terminal.ScreenBufferHD({ width, height });

		for (let y = 0; y < image.bitmap.height - 1; y += 2) {
			for (let x = 0; x < image.bitmap.width; x++) {
				const { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(x, y));
				const { r: r2, g: g2, b: b2 } = Jimp.intToRGBA(image.getPixelColor(x, y + 1));

				if (a === 0) screenBuffer.put({ x, y: y / 2 }, " ");
				else screenBuffer.put({ x, y: y / 2, attr: { color: { r, g, b, a }, bgColor: { r: r2, g: g2, b: b2 } } }, "▄");
			}
		}

		return screenBuffer;
	}
}
