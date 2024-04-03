import { getTextInBorder } from "./tools/boxDrawing.js";
import BorderElement from "./BorderElement.js";
import ContainerElement from "./ContainerElement.js";
import FrameElement from "./FrameElement.js";
import TextElement from "./TextElement.js";
import AlbumsElement from "./AlbumsElement.js";

export default class PlayerElement extends ContainerElement {
	static create() {
		let captionElement;
		let albumsElement;

		const element = new PlayerElement({
			children: [
				new BorderElement(),
				new FrameElement({
					leftMargin: 1,
					children: [
						captionElement = new TextElement({ text: getTextInBorder("Albums") })
					]
				}),
				new FrameElement({
					leftMargin: 1,
					topMargin: 1,
					rightMargin: 1,
					bottomMargin: 1,
					children: [
						albumsElement = AlbumsElement.create()
					]
				})
			]
		});

		// this.albumsScrollElement = scrollBarElement;

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
}
