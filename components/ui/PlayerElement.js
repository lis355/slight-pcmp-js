import { getTextInBorder } from "./tools/boxDrawing.js";
import BorderElement from "./BorderElement.js";
import ContainerElement from "./ContainerElement.js";
import FrameElement from "./FrameElement.js";
import TextElement from "./TextElement.js";

export default class PlayerElement extends ContainerElement {
	static create() {
		let captionElement;
		// let directorySelectorElement;
		// let scrollBarElement;
		// let pathElement;

		const element = new ContainerElement({
			children: [
				new BorderElement(),
				new FrameElement({
					leftMargin: 1,
					children: [
						captionElement = new TextElement({ text: getTextInBorder("Albums") })
					]
				})

			]
		});

		// directorySelectorElement.scrollBarElement = scrollBarElement;

		element.__defineSetter__("caption", value => {
			captionElement.text = getTextInBorder(value);
		});

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

	render(screenBuffer, absoluteX, absoluteY) {
	}
}
