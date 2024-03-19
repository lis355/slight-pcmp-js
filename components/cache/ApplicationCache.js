import crypto from "node:crypto";
import path from "node:path";

import _ from "lodash";
import { JSONFilePreset } from "lowdb/node";
import fs from "fs-extra";

import ApplicationComponent from "../app/ApplicationComponent.js";

// What is the fastest node.js hashing algorithm
// https://medium.com/@chris_72272/what-is-the-fastest-node-js-hashing-algorithm-c15c1a0e164e
function strHash(str) {
	return crypto.createHash("sha1").update(str).digest("base64");
}

export default class ApplicationCache extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		const cacheDirectory = this.application.applicationDataManager.applicationDataPath(".cache");
		fs.ensureDirSync(cacheDirectory);

		this.db = await JSONFilePreset(path.posix.join(cacheDirectory, ".data"), {});
	}

	getCaheForTrack(filePath) {
		let cache;
		if (!fs.existsSync(filePath)) return cache;

		const stats = fs.statSync(filePath);

		const id = filePath + stats.ctimeMs;
		const hash = strHash(id);

		cache = _.get(this.db.data, `tracks.${hash}`);

		return cache;
	}

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
