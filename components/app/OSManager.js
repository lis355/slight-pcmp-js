import { exec } from "node:child_process";

import ApplicationComponent from "../app/ApplicationComponent.js";

export default class OSManager extends ApplicationComponent {
	async loadDrivesList() {
		if (process.platform === "win32") {
			await new Promise((resolve, reject) => {
				exec("wmic logicaldisk get name", (error, stdout) => {
					if (error) return reject(error);

					this.drives = stdout.split("\r\r\n")
						.filter(value => /[A-Za-z]:/.test(value))
						.map(value => value.trim().toUpperCase() + "/");

					return resolve();
				});
			});
		} else throw new Error("Unsupported OS");
	}
}
