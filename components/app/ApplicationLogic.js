// import moment from "moment";

// import delay from "../../tools/delay.js";
import AsyncQueue from "../../tools/AsyncQueue.js";
import ApplicationComponent from "../app/ApplicationComponent.js";

export default class ApplicationLogic extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.asyncQueue = new AsyncQueue();
	}

	setState(nextState) {
		this.asyncQueue.push(async () => {
			if (this.state) {
				await this.state.stop();

				this.state.application = null;
			}

			this.state = nextState;
		});

		this.asyncQueue.push(async () => {
			if (this.state) {
				this.state.application = this.application;

				await this.state.start();
			}
		});
	}

	async run() {
		await super.run();

		this.setState(new StartState());
	}
}

class State {
	async start() { }
	async stop() { }

	setState(nextState) {
		this.application.applicationLogic.setState(nextState);
	}
}

// const LOGO_TIME_IN_MILLISECONDS = moment.duration("PT1S");

class StartState extends State {
	async start() {
		await super.start();

		// if (this.stateElement === this.logoStateElementsTree &&
		// 	this.application.time - this.logoStartTime < LOGO_TIME_IN_MILLISECONDS) {
		// 	await delay(LOGO_TIME_IN_MILLISECONDS - (this.application.time - this.logoStartTime));
		// }

		// this.application.uiManager.renderLogo();

		return this.setState(new RefreshMediaLibraryState());

		// return this.setState(new RefreshMediaLibraryState());
	}
}

class RefreshMediaLibraryState extends State {
	async start() {
		await super.start();

		if (!this.application.mediaLibrary.hasBaseDirectories()) return this.setState(new SelectMediaLibraryBaseDirectoryState());

		await this.application.mediaLibrary.refreshLibrary();

		return this.setState(new IdleState());
	}
}

class SelectMediaLibraryBaseDirectoryState extends State {
	async start() {
		await super.start();

		await this.application.osManager.loadDrivesList();

		this.application.uiManager.renderDirectorySelector("Set media library directory", selectedDirectory => {
			this.application.mediaLibrary.addBaseDirectory(selectedDirectory);

			return this.setState(new RefreshMediaLibraryState());
		});
	}
}

class IdleState extends State {
	async start() {
		await super.start();

		this.application.uiManager.renderIdle();
	}
}
