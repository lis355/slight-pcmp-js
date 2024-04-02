import path from "node:path";

import fs from "fs-extra";

import ContainerElement from "./ContainerElement.js";
import Element from "./Element.js";
import FrameBorderElement from "./FrameBorderElement.js";
import FrameMarginElement from "./FrameMarginElement.js";
import HeaderCaptionElement from "./HeaderCaptionElement.js";

export default class DirectorySelectorElement extends Element {
	static create() {
		// eslint-disable-next-line no-return-assign
		return new ContainerElement({
			children: [
				new FrameBorderElement(),
				this.captionElement = new HeaderCaptionElement(),
				new FrameMarginElement({
					leftMargin: 1,
					topMargin: 1,
					rightMargin: 1,
					bottomMargin: 1,
					children: [
						new DirectorySelectorElement()
					]
				})
			]
		});
	}

	mounted() {
		super.mounted();

		this.selectedPath = "";
		this.options = this.manager.application.osManager.drives;
		this.selectedIndex = 0;

		if (this.options.length === 1) this.selectPath(this.options[0] + "/");
	}

	selectPath(selectedPath) {
		this.selectedPath = selectedPath;

		this.options = fs.readdirSync(this.selectedPath).filter(fileName => {
			try {
				return fs.statSync(path.posix.join(this.selectedPath, fileName)).isDirectory();
			} catch (error) {
				if (error.code === "EPERM" ||
					error.code === "EBUSY") return false;
				else throw error;
			}
		});

		this.selectedIndex = 0;
	}

	selectPrevious() {
		this.selectPath(path.posix.basename(this.selectedPath));
	}

	render(screenBuffer, absoluteX, absoluteY) {
		for (let i = 0; i < this.options.length && i < this.h; i++) screenBuffer.put({ x: absoluteX + this.x, y: absoluteY + this.y + i }, this.options[i]);
	}
}
