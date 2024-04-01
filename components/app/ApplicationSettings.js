import _ from "lodash";
import { JSONFilePreset } from "lowdb/node";
import moment from "moment";

import ApplicationComponent from "../app/ApplicationComponent.js";
import AsyncQueue from "../../tools/AsyncQueue.js";

const SAVE_DEBOUNCE_COOLDOWN_IN_MILLISECONDS = moment.duration("PT15S").asMilliseconds();

export default class ApplicationSettings extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.settingsFilePath = this.application.applicationDataManager.applicationDataPath(".settings");

		this.db = await JSONFilePreset(this.settingsFilePath, {});
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
}
