import terminal from "terminal-kit";

import ApplicationComponent from "../app/ApplicationComponent.js";
import DirectorySelectorElement from "./DirectorySelectorElement.js";
import LogoElement from "./LogoElement.js";
import RootElement from "./RootElement.js";

const term = terminal.createTerminal({ appId: "xterm-truecolor" });

term.CELL_SIZES = {
	"vscodeIntegratedMinGWWindows": [7, 17],
	"externalWindows": [8, 16]
};

term.CELL_SIZE = term.CELL_SIZES.vscodeIntegratedMinGWWindows;

export default class UIManager extends ApplicationComponent {
	async initialize() {
		await super.initialize();

		this.rootElement = new RootElement();
		this.rootElement.manager = this;

		this.initializeTermAndMainScreenBuffer();

		this.stateElement = null;

		this.logoStateElementsTree = LogoElement.create(this.application.packageInfo);
		this.directorySelectorStateElementsTree = DirectorySelectorElement.create();

		term.on("resize", this.handleTerminalOnResize.bind(this));

		term.grabInput(true);

		term.on("key", this.handleTerminalOnKey.bind(this));
	}

	update() {
		this.rootElement.update(this.application.workingTime);
	}

	render() {
		this.mainScreenBuffer.clear();

		this.rootElement.renderElement(this.mainScreenBuffer, 0, 0);

		this.mainScreenBuffer.draw({ delta: true });
	}

	updateAndRender() {
		this.update();

		this.render();
	}

	handleTerminalOnResize(width, height) {
		this.initializeTermAndMainScreenBuffer();

		this.updateAndRender();
	}

	initializeTermAndMainScreenBuffer() {
		term.hideCursor();

		this.rootElement.sizeProvider = this.mainScreenBuffer = new terminal.ScreenBufferHD({ dst: term });
	}

	handleTerminalOnKey(name) {
		switch (name) {
		}
	}

	setStateElement(stateElement) {
		if (this.stateElement) this.rootElement.removeChild(this.stateElement);
		this.stateElement = stateElement;
		if (this.stateElement) this.rootElement.addChild(this.stateElement);

		this.updateAndRender();
	}

	renderLogo() {
		this.setStateElement(this.logoStateElementsTree);
	}

	renderDirectorySelector(caption, selectDirectoryHandler) {
		this.directorySelectorStateElementsTree.caption = caption;
		this.directorySelectorStateElementsTree.selectDirectoryHandler = selectDirectoryHandler;

		this.setStateElement(this.directorySelectorStateElementsTree);
	}

	renderIdle(selectDirectoryHandler) {
	}
}
