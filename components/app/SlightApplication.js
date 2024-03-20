import Application from "./Application.js";
import ApplicationCache from "../cache/ApplicationCache.js";
import CoversCache from "../cache/CoversCache.js";
import ApplicationDataManager from "./ApplicationDataManager.js";
import UIManager from "../ui/UIManager.js";

export default class SlightApplication extends Application {
	constructor() {
		super();

		this.addComponent(this.applicationDataManager = new ApplicationDataManager());
		this.addComponent(this.applicationCache = new ApplicationCache());
		this.addComponent(this.coversCache = new CoversCache());
		this.addComponent(this.uiManager = new UIManager());
	}

	async run() {
		await super.run();

		const trackFilePath = "C:/Users/LIS355/YandexDisk/MUSIC/ARTISTS/Linkin Park/Minutes To Midnight/05. Linkin Park - Minutes To Midnight (2007) - Shadow Of The Day.mp3";
		this.applicationCache.getCaheForTrack(trackFilePath);
	}
}
