import path from "node:path";

import _ from "lodash";
import { JSONFilePreset } from "lowdb/node";
import fs from "fs-extra";
import moment from "moment";

import ApplicationComponent from "../app/ApplicationComponent.js";
import hash from "../../tools/hash.js";
import AsyncQueue from "../../tools/AsyncQueue.js";

const SAVE_DEBOUNCE_COOLDOWN_IN_MILLISECONDS = moment.duration("PT15S").asMilliseconds();

export default class ApplicationCache extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.cacheDirectory = this.application.applicationDataManager.applicationDataPath(".cache");
		fs.ensureDirSync(this.cacheDirectory);

		this.db = await JSONFilePreset(path.posix.join(this.cacheDirectory, ".data"), {});
		await this.db.write();

		this.dbSaveAsyncQueue = new AsyncQueue();

		if (!process.env.DEVELOPER_ENVIRONMENT) _.debounce(this.save.bind(this), SAVE_DEBOUNCE_COOLDOWN_IN_MILLISECONDS);
	}

	save() {
		this.dbSaveAsyncQueue.push(async () => this.db.write());
	}

	get(path, defaultValue) {
		return _.get(this.db.data, path, defaultValue);
	}

	set(path, value) {
		_.set(this.db.data, path, value);

		this.save();
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
