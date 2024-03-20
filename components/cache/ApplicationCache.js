import path from "node:path";

import { JSONFilePreset } from "lowdb/node";
import fs from "fs-extra";

import ApplicationComponent from "../app/ApplicationComponent.js";
import hash from "../../tools/hash.js";

export default class ApplicationCache extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.cacheDirectory = this.application.applicationDataManager.applicationDataPath(".cache");
		fs.ensureDirSync(this.cacheDirectory);

		this.db = await JSONFilePreset(path.posix.join(this.cacheDirectory, ".data"), {});
	}

	getCacheObjectAbsolutePath(objPath) {
		return path.posix.join(this.cacheDirectory, objPath);
	}

	getFileId(filePath) {
		const stats = fs.statSync(filePath);

		const id = [filePath, stats.size, stats.ctimeMs];

		return id;
	}

	getFileHash(filePath) {
		const id = this.getFileId(filePath);
		const hashStr = hash(id);

		return hashStr;
	}

	hasCacheFile(filePath) {
		return fs.existsSync(this.getCacheObjectAbsolutePath(filePath));
	}

	getCacheFile(filePath) {
		return fs.readFileSync(this.getCacheObjectAbsolutePath(filePath));
	}

	setCacheFile(filePath, contents) {
		return fs.outputFileSync(this.getCacheObjectAbsolutePath(filePath), contents);
	}

	removeCacheFile(filePath) {
		return fs.removeSync(this.getCacheObjectAbsolutePath(filePath));
	}

	// getCaheForTrack(filePath) {
	// 	let cache;
	// 	if (!fs.existsSync(filePath)) return cache;

	// 	const hash = fileHash(filePath);

	// 	cache = _.get(this.db.data, `tracks.${hash}`);

	// 	return cache;
	// }

	// getCahedBufferForCover(track, width, height) {
	// 	let cache;
	// 	if (!fs.existsSync(filePath)) return cache;

	// 	const id = fileId(filePath);
	// 	const hash = strHash(id + width + height);

	// 	cache = _.get(this.db.data, `tracks.${hash}`);

	// 	return cache;
	// }

	// async setCaheForTrack(filePath) {
	// 	let cache;
	// 	if (!fs.existsSync(filePath)) return cache;

	// 	const stats = fs.statSync(filePath);

	// 	const id = filePath + stats.ctimeMs;
	// 	const hash = strHash(id);

	// 	cache = this.db.get(`tracks.${hash}`);

	// 	await this.db.update(data => { data.a = 1; });

	// 	return cache;
	// }
}
