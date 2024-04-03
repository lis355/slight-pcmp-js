import ContainerElement from "./ContainerElement.js";
import FrameElement from "./FrameElement.js";
import ImageElement from "./ImageElement.js";
import VerticalScrollBarElement from "./VerticalScrollBarElement.js";

class CoversContainerElement extends ContainerElement {
	update(time) {
		this.DEBUG_DRAW_BORDERS = true;

		if (!this.imageFrameElements ||
			this.imageFrameElements.length === 0) this.createImageFrameElements();
	}

	createImageFrameElements() {
		this.imageFrameElements = [];

		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 2; j++) {
				const imageFrameElement = new FrameElement({
					leftMargin: i * 22,
					topMargin: j * 9,
					rightMargin: 0,
					bottomMargin: 0,
					children: [
						new ImageElement({ imageScreenBuffer: this.manager.application.mediaLibrary.tracks[0].coverScreenBuffer })
					]
				});

				this.addChild(imageFrameElement);

				this.imageFrameElements.push(imageFrameElement);
			}
		}
	}

	render(screenBuffer, absoluteX, absoluteY) {
	}
}

export default class AlbumsElement extends ContainerElement {
	static create() {
		let coversContainerElement;
		let scrollBarElement;

		const element = new AlbumsElement({
			children: [
				new FrameElement({
					leftMargin: 1,
					topMargin: 0,
					rightMargin: 4,
					bottomMargin: 0,
					children: [
						coversContainerElement = new CoversContainerElement()
					]
				}),
				new FrameElement({
					children: [
						scrollBarElement = new VerticalScrollBarElement()
					]
				})
			]
		});

		element.scrollBarElement = scrollBarElement;

		return element;
	}

	handleMounted() {
		// this.cycleScroll = true;

		// this.baseOptions = this.manager.application.osManager.drives;
		// this.selectedPath = [];

		// this.selectNextPath();

		// if (this.baseOptions.length === 1) this.selectNextPath(this.baseOptions[0]);
	}

	handleTerminalOnResize() {
		// this.resetIndexes();
	}

	handleTerminalOnKey(keyInfo) {
		// switch (keyInfo.key) {
		// 	case "UP":
		// 		this.setPreviousSelectedIndex();
		// 		break;

		// 	case "DOWN":
		// 		this.setNextSelectedIndex();
		// 		break;

		// 	case "ENTER":
		// 		this.selectNextPath(this.options[this.selectedIndex]);
		// 		break;

		// 	case "ESCAPE":
		// 		this.selectPreviousPath();
		// 		break;

		// 	case "S":
		// 		this.selectDirectoryHandler(this.absoluteSelectedPath);
		// 		break;
		// }
	}
}
