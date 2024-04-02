import path from "node:path";

import fs from "fs-extra";

import BorderElement from "./BorderElement.js";
import ContainerElement from "./ContainerElement.js";
import FrameElement from "./FrameElement.js";
import VerticalScrollBarElement from "./VerticalScrollBarElement.js";
import TextElement from "./TextElement.js";

const PARENT_DIRECTORY = "..";

export default class DirectorySelectorElement extends ContainerElement {
	static create() {
		let captionElement;
		let directorySelectorElement;
		let scrollBarElement;
		let pathElement;

		const element = new ContainerElement({
			children: [
				new BorderElement(),
				new FrameElement({
					leftMargin: 1,
					children: [
						captionElement = new TextElement()
					]
				}),
				new FrameElement({
					leftMargin: 1,
					topMargin: 1,
					rightMargin: 4,
					bottomMargin: 1,
					children: [
						directorySelectorElement = new DirectorySelectorElement()
					]
				}),
				new FrameElement({
					leftMargin: 1,
					topMargin: 1,
					rightMargin: 1,
					bottomMargin: 1,
					children: [
						scrollBarElement = new VerticalScrollBarElement()
					]
				}),
				new FrameElement({
					leftMargin: 1,
					verticalAlignment: "BOTTOM",
					children: [
						pathElement = new TextElement()
					]
				})
			]
		});

		directorySelectorElement.scrollBarElement = scrollBarElement;
		directorySelectorElement.pathElement = pathElement;

		element.__defineSetter__("caption", value => {
			captionElement.text = `╣ ${value} ╠`;
		});

		element.__defineSetter__("selectDirectoryHandler", value => {
			directorySelectorElement.selectDirectoryHandler = value;
		});

		return element;
	}

	handleMounted() {
		this.cycleScroll = true;

		this.baseOptions = this.manager.application.osManager.drives;
		this.selectedPath = [];

		this.selectNextPath();
	}

	handleTerminalOnResize() {
		this.resetIndexes();
	}

	handleTerminalOnKey(keyInfo) {
		switch (keyInfo.key) {
			case "UP":
				this.setPreviousSelectedIndex();
				break;

			case "DOWN":
				this.setNextSelectedIndex();
				break;

			case "ENTER":
				this.selectNextPath(this.options[this.selectedIndex]);
				break;

			case "ESCAPE":
				this.selectPreviousPath();
				break;

			case "S":
				this.selectDirectoryHandler(this.absoluteSelectedPath);
				break;
		}
	}

	selectNextPath(selectedPath) {
		if (selectedPath === PARENT_DIRECTORY) this.selectedPath.pop();
		else if (selectedPath) this.selectedPath.push(selectedPath);

		if (this.selectedPath.length === 0) {
			this.pathElement.text = "";

			this.options = this.baseOptions;
		} else {
			const absolutePath = this.absoluteSelectedPath;

			this.pathElement.text = `╣ ${absolutePath} ╠`;

			this.options = fs.readdirSync(absolutePath).filter(fileName => {
				try {
					return fs.statSync(path.posix.join(absolutePath, fileName)).isDirectory();
				} catch (error) {
					if (error.code === "EPERM" ||
						error.code === "EBUSY") return false;
					else throw error;
				}
			});

			this.options.unshift(PARENT_DIRECTORY);
		}

		this.resetIndexes();
	}

	selectPreviousPath() {
		if (this.options[0] === PARENT_DIRECTORY) this.selectNextPath(PARENT_DIRECTORY);
	}

	get absoluteSelectedPath() {
		return path.posix.join(...this.selectedPath);
	}

	resetIndexes() {
		this.selectedIndex = 0;
		this.windowStartIndex = 0;
	}

	update(time) {
		this.windowStartIndex = Math.floor(this.selectedIndex / this.height) * this.height;
		const barSize = Math.ceil(this.options.length / this.height) * this.height;
		this.scrollBarElement.setBar(this.windowStartIndex / barSize, this.height / barSize);
	}

	setNextSelectedIndex() {
		this.selectedIndex++;
		if (this.selectedIndex === this.options.length) this.selectedIndex = this.cycleScroll ? 0 : this.options.length - 1;
	}

	setPreviousSelectedIndex() {
		this.selectedIndex--;
		if (this.selectedIndex < 0) this.selectedIndex = this.cycleScroll ? this.options.length - 1 : 0;
	}

	render(screenBuffer, absoluteX, absoluteY) {
		for (let i = 0; i < Math.min(this.options.length - this.windowStartIndex, this.height); i++) {
			const offsetIndex = i + this.windowStartIndex;
			const line = this.options[offsetIndex];
			const attr = offsetIndex === this.selectedIndex ? { color: "#000", bgColor: "#fff" } : { color: "#fff", bgColor: "#000" };

			for (let j = 0; j < this.width; j++) {
				let char;
				if (j < 1) char = " ";
				else if (j < line.length + 1) char = line[j - 1];
				else char = " ";

				screenBuffer.put({ x: absoluteX + this.x + j, y: absoluteY + this.y + i, attr }, char);
			}
		}
	}
}
