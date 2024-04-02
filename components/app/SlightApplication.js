import fs from "node:fs";

import { Command } from "commander";

import Application from "./Application.js";
import ApplicationCache from "../cache/ApplicationCache.js";
import ApplicationDataManager from "./ApplicationDataManager.js";
import ApplicationLogic from "./ApplicationLogic.js";
import ApplicationSettings from "./ApplicationSettings.js";
import CoversCache from "../cache/CoversCache.js";
import MediaLibrary from "../mediaLibrary/MediaLibrary.js";
import OSManager from "./OSManager.js";
import UIManager from "../ui/UIManager.js";

export default class SlightApplication extends Application {
	constructor() {
		super();

		this.packageInfo = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

		const program = new Command();

		program
			.name(this.packageInfo.name)
			.version(this.packageInfo.version)
			.description("CLI music player with media library support with cover images rendering");

		program.parse();

		this.addComponent(this.applicationDataManager = new ApplicationDataManager());
		this.addComponent(this.applicationSettings = new ApplicationSettings());
		this.addComponent(this.applicationCache = new ApplicationCache());
		this.addComponent(this.applicationLogic = new ApplicationLogic());
		this.addComponent(this.osManager = new OSManager());
		this.addComponent(this.coversCache = new CoversCache());
		this.addComponent(this.mediaLibrary = new MediaLibrary());
		this.addComponent(this.uiManager = new UIManager());
	}
}
