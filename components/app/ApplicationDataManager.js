import fs from "fs-extra";
import path from "node:path";

import ApplicationComponent from "../app/ApplicationComponent.js";
import normalizePath from "../../tools/normalizePath.js";

export default class ApplicationDataManager extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		if (process.env.DEVELOPER_ENVIRONMENT) {
			this.applicationDataDirectory = path.posix.join(process.env.CWD, ".applicationData");
		} else {
			this.applicationDataDirectory = path.posix.join(normalizePath(process.env.LOCALAPPDATA));
		}

		fs.ensureDirSync(this.applicationDataDirectory);
	}

	applicationDataPath(...nextPaths) {
		return path.posix.join(this.applicationDataDirectory, ...nextPaths);
	}
}
