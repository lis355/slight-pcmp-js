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

		// let x = 0;
		// for (const trackFilePath of [
		// 	"C:/Users/LIS355/Desktop/MSC/Benny Benassi/The Biz - Hypnotica/01. Benny Benassi - The Biz - Hypnotica (2003) - Satisfaction (Isak Original).mp3",
		// 	"C:/Users/LIS355/Desktop/MSC/Ber-Linn/В.П.Н.С/01. Ber-Linn - В.П.Н.С. (2003) - Даша.mp3",
		// 	"C:/Users/LIS355/Desktop/MSC/Billy Talent/Billy Talent II/01. Billy Talent - Billy Talent II (2006) - Devil In A Midnight Mass.mp3"
		// ]) {
		// 	const t = new Track(trackFilePath);
		// 	await t.initialize();

		// 	const w = 10;
		// 	const h = Math.floor(CELL_SIZE[0] / CELL_SIZE[1] * w);

		// 	const screenBuffer = await this.application.coversCache.getCoverScreenBufferForTrack(t, w, h);

		// 	const cover = new ImageElement(
		// 		1 + x,
		// 		1,
		// 		screenBuffer
		// 	);
		// 	this.backgroundWindowElement.addChild(cover);

		// 	x += w + 1;
		// }

		this.application.uiManager.renderIdle();
	}
}
