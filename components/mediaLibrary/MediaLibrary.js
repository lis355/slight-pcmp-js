import path from "node:path";

import fs from "fs-extra";
// import moment from "moment";

import ApplicationComponent from "../app/ApplicationComponent.js";
import Track from "../player/Track.js";
// import FFPlayer from "../player/FFPlayer.js";

// const OBSOLETE_COVER_CACHE_FILE_PERIOD_IN_MILLISECONDS = moment.duration("P3D");

// function objectHash(stats) {
// 	// return Math.floor(fs.statSync(filePath).atimeMs);
// 	return stats.ctime.toString();
// }

function isTrack(filePath) {
	return path.extname(filePath).toLowerCase() === ".mp3";
}

// class Track {
// }

class Group {
	static get groupName() {
		return this.constructor.name.toLowerCase() + "s";
	}
}

class Artist extends Group { }
class Genre extends Group { }
class Album extends Group { }

class Library {
	constructor() {
		this.tracks = {};

		[Artist, Genre, Album].forEach(group => {
			this[group.groupName] = new group();
		});
	}
}

export default class MediaLibrary extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.baseDirectories = this.application.applicationSettings.get(this.baseDirectoriesSettingPath, [])
			.filter(directory => fs.existsSync(directory) &&
				fs.statSync(directory).isDirectory());

		this.mediaLibrary = this.application.applicationCache.get(this.mediaLibraryCachePath, { children: {} });

		// this.tracks = [
		// 	await this.loadTrack(path.posix.join(process.env.CWD, "temp/test.mp3"))
		// ];
	}

	get baseDirectoriesSettingPath() {
		return "mediaLibrary.baseDirectories";
	}

	get mediaLibraryCachePath() {
		return "mediaLibrary.libary";
	}

	hasBaseDirectories() {
		return this.baseDirectories.length > 0;
	}

	addBaseDirectory(directory) {
		this.baseDirectories.push(directory);

		this.application.applicationSettings.set(this.baseDirectoriesSettingPath, this.baseDirectories);
	}

	// TODO Refreshing and creting media library algorithm
	// https://github.com/lis355/slight-pcmp-js/issues/3
	// Updating the contents of folders requires an algorithm and studying statSync, stats.ctime stats.mtime
	// For now, the update will be complete just once every certain period of time + forced update

	// async refreshLibrary() {
	// 	let refreshed = false;
	// 	let touchedDirectoriesAmount = 0;
	// 	let touchedFilesAmount = 0;
	// 	let touchedTracksAmount = 0;
	// 	let changedTracksAmount = 0;

	// 	function walkSync(objectPath, objectName, treeNode) {
	// 		let childTreeNode = treeNode.children[objectName];
	// 		const stats = fs.statSync(objectPath);

	// 		const isDirectory = stats.isDirectory();
	// 		let isObjectTrack;
	// 		if (isDirectory) {
	// 			touchedDirectoriesAmount++;
	// 		} else if (stats.isFile()) {
	// 			touchedFilesAmount++;

	// 			isObjectTrack = isTrack(objectPath);
	// 			if (isObjectTrack) touchedTracksAmount++;
	// 		}

	// 		const currentHash = objectHash(stats);

	// 		if (!childTreeNode ||
	// 			childTreeNode.h !== currentHash) {
	// 			refreshed = true;

	// 			if (isDirectory) {
	// 				if (!childTreeNode) treeNode.children[objectName] = childTreeNode = { children: {} };
	// 				childTreeNode.h = currentHash;

	// 				if (!childTreeNode.children) childTreeNode.children = {};

	// 				for (const fileName of fs.readdirSync(objectPath)) {
	// 					const filePath = path.posix.join(objectPath, fileName);

	// 					walkSync(filePath, fileName, childTreeNode);
	// 				}
	// 			} else {
	// 				treeNode.children[objectName] = currentHash;

	// 				if (isObjectTrack) changedTracksAmount++;
	// 			}
	// 		}
	// 	}

	// 	for (const baseDirectory of this.baseDirectories) {
	// 		let childTreeNode = this.mediaLibrary.children[baseDirectory];

	// 		const stats = fs.statSync(baseDirectory);
	// 		const currentHash = objectHash(stats);

	// 		if (!childTreeNode ||
	// 			childTreeNode.h !== currentHash) {
	// 			refreshed = true;

	// 			if (!childTreeNode) this.mediaLibrary.children[baseDirectory] = childTreeNode = { children: {} };
	// 			childTreeNode.h = currentHash;

	// 			for (const fileName of fs.readdirSync(baseDirectory)) {
	// 				const filePath = path.posix.join(baseDirectory, fileName);

	// 				walkSync(filePath, fileName, childTreeNode);
	// 			}
	// 		}
	// 	}

	// 	// walkSync(this.baseDirectory, filePath => {
	// 	// 	if (path.extname(filePath) === ".mp3") this.mediaLibrary.tracks[filePath] = new Track(this, filePath, this.getTrackCacheId(filePath));
	// 	// });

	// 	if (refreshed) this.application.applicationCache.set("mediaLibrary", this.mediaLibrary);

	// 	// console.log(`[MediaLibrary]: [refreshLibrary] refreshed: ${refreshed}, touchedDirectoriesAmount: ${touchedDirectoriesAmount}, touchedFilesAmount: ${touchedFilesAmount}, touchedTracksAmount: ${touchedTracksAmount}, changedTracksAmount: ${changedTracksAmount}`);
	// }

	async refreshLibrary() {
		function walkSync(objectPath, objectName, treeNode) {
			let childTreeNode = treeNode.children[objectName];
			const stats = fs.statSync(objectPath);

			const isDirectory = stats.isDirectory();
			let isObjectTrack;
			if (isDirectory) {
				touchedDirectoriesAmount++;
			} else if (stats.isFile()) {
				touchedFilesAmount++;

				isObjectTrack = isTrack(objectPath);
				if (isObjectTrack) touchedTracksAmount++;
			}

			const currentHash = objectHash(stats);

			if (!childTreeNode ||
				childTreeNode.h !== currentHash) {
				refreshed = true;

				if (isDirectory) {
					if (!childTreeNode) treeNode.children[objectName] = childTreeNode = { children: {} };
					childTreeNode.h = currentHash;

					if (!childTreeNode.children) childTreeNode.children = {};

					for (const fileName of fs.readdirSync(objectPath)) {
						const filePath = path.posix.join(objectPath, fileName);

						walkSync(filePath, fileName, childTreeNode);
					}
				} else {
					treeNode.children[objectName] = currentHash;

					if (isObjectTrack) changedTracksAmount++;
				}
			}
		}

		for (const baseDirectory of this.baseDirectories) {
			for (const fileName of fs.readdirSync(baseDirectory)) {
				const filePath = path.posix.join(baseDirectory, fileName);

				walkSync(filePath, fileName);
			}
		}

		// walkSync(this.baseDirectory, filePath => {
		// 	if (path.extname(filePath) === ".mp3") this.mediaLibrary.tracks[filePath] = new Track(this, filePath, this.getTrackCacheId(filePath));
		// });

		if (refreshed) this.application.applicationCache.set("mediaLibrary", this.mediaLibrary);

		// console.log(`[MediaLibrary]: [refreshLibrary] refreshed: ${refreshed}, touchedDirectoriesAmount: ${touchedDirectoriesAmount}, touchedFilesAmount: ${touchedFilesAmount}, touchedTracksAmount: ${touchedTracksAmount}, changedTracksAmount: ${changedTracksAmount}`);
	}

	async loadTrack(trackFilePath) {
		const track = new Track(this, trackFilePath, null);
		await track.load();

		const width = 20;
		const height = 8; // Math.floor(CELL_SIZE[0] / CELL_SIZE[1] * w);

		track.coverScreenBuffer = await this.application.coversCache.getCoverScreenBufferForTrack(track, width, height);

		return track;
	}
}
