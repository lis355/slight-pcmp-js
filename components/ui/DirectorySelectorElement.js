import path from "node:path";

import fs from "fs-extra";

import { renderText } from "./tools/renders.js";
import ContainerElement from "./ContainerElement.js";
import FrameBorderElement from "./FrameBorderElement.js";
import FrameMarginElement from "./FrameMarginElement.js";
import VerticalScrollBarElement from "./VerticalScrollBarElement.js";

export default class DirectorySelectorElement extends ContainerElement {
	static create() {
		let directorySelectorElement;
		let scrollBarElement;

		const element = new ContainerElement({
			children: [
				new FrameBorderElement(),
				new FrameMarginElement({
					leftMargin: 1,
					topMargin: 0,
					rightMargin: 2,
					bottomMargin: 0,
					children: [
						directorySelectorElement = new DirectorySelectorElement()
					]
				}),
				new FrameMarginElement({
					leftMargin: 1,
					topMargin: 1,
					rightMargin: 1,
					bottomMargin: 1,
					children: [
						scrollBarElement = new VerticalScrollBarElement()
					]
				})
			]
		});

		directorySelectorElement.scrollBarElement = scrollBarElement;

		element.__defineSetter__("caption", value => {
			directorySelectorElement.caption = value;
		});

		element.__defineSetter__("selectDirectoryHandler", value => {
			directorySelectorElement.selectDirectoryHandler = value;
		});

		return element;
	}

	handleMounted() {
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
		const windowHeight = this.height - 2;

		this.scrollBarElement.position = (this.selectedIndex + windowHeight / 2) / this.options.length;

		let offsetY = 0;

		renderText(screenBuffer, absoluteX + this.x, absoluteY + this.y + offsetY, `╣ ${this.caption} ╠`);
		offsetY++;

		const maxOptions = Math.min(this.options.length, windowHeight);
		for (let i = 0; i < maxOptions; i++) {
			const line = this.options[i];
			const attr = i === this.selectedIndex ? { color: "#000", bgColor: "#fff" } : { color: "#fff", bgColor: "#000" };
			for (let j = 0; j < this.width; j++) {
				const char = j < line.length ? line[j] : " ";
				screenBuffer.put({ x: absoluteX + this.x + j, y: absoluteY + this.y + offsetY, attr }, char);
			}

			offsetY++;
		}

		renderText(screenBuffer, absoluteX + this.x, absoluteY + this.y + offsetY, `╣ ${this.selectedPath} ╠`);
	}
}
