import Application from "./Application.js";
import ApplicationCache from "../cache/ApplicationCache.js";
import ApplicationDataManager from "./ApplicationDataManager.js";
import ApplicationSettings from "./ApplicationSettings.js";
import CoversCache from "../cache/CoversCache.js";
import MediaLibrary from "../mediaLibrary/MediaLibrary.js";
import UIManager from "../ui/UIManager.js";

export default class SlightApplication extends Application {
	constructor() {
		super();

		this.addComponent(this.applicationDataManager = new ApplicationDataManager());
		this.addComponent(this.applicationSettings = new ApplicationSettings());
		this.addComponent(this.applicationCache = new ApplicationCache());
		this.addComponent(this.coversCache = new CoversCache());
		this.addComponent(this.mediaLibrary = new MediaLibrary());
		this.addComponent(this.uiManager = new UIManager());
	}

	async run() {
		await super.run();

		// await this.mediaLibrary.refreshLibrary();
	}
}
