import fs from "fs-extra";
import path from "node:path";

import ApplicationComponent from "../app/ApplicationComponent.js";
import normalizePath from "../../tools/normalizePath.js";

export default class ApplicationDataManager extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		const basePath = process.env.DEVELOPER_ENVIRONMENT
			? process.env.CWD
			: path.posix.join(normalizePath(process.env.LOCALAPPDATA), this.application.packageInfo.name);

		this.applicationDataDirectory = path.posix.join(basePath, ".applicationData");
		fs.ensureDirSync(this.applicationDataDirectory);
	}

	applicationDataPath(...nextPaths) {
		return path.posix.join(this.applicationDataDirectory, ...nextPaths);
	}
}
