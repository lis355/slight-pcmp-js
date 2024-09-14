import { DatabaseSync } from "node:sqlite";

import ApplicationComponent from "../../app/ApplicationComponent.js";
import Tracks from "./models/Tracks.js";

export default class ApplicationLocalDBManager extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.dbFilePath = this.application.applicationDataManager.applicationDataPath("db.data");
		this.db = new DatabaseSync(this.dbFilePath);

		this.models = {
			tracks: new Tracks(this.db)
		};

		Object.entries(this.models).forEach(([key, model]) => {
			model.initialize();
		});
	}
}
