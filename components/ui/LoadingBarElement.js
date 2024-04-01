import FramedElement from "./FramedElement.js";

const CHAR = "░";

export default class LoadingBarElement extends FramedElement {
	constructor() {
		super();

		this.container.w = 30;
		this.brightnessBuffer = new Array(this.w).fill(0);
		this.currentIndex = -1;
		this.currentDirection = 1;
		this.step = 1 / this.w;
		this.updatesInRender = 5;
	}

	async update(time) {
		for (let i = 0; i < this.updatesInRender; i++) this.updateBar();

		super.update(time);
	}

	updateBar() {
		for (let i = 0; i < this.w; i++) {
			if (this.brightnessBuffer[i] > 0) this.brightnessBuffer[i] = Math.max(0, this.brightnessBuffer[i] - this.step);
		}

		this.brightnessBuffer[this.currentIndex = Math.max(0, Math.min(this.w - 1, this.currentIndex + this.currentDirection))] = 1;

		if (this.currentIndex === 0) this.currentDirection = 1;
		else if (this.currentIndex === this.w - 1) this.currentDirection = -1;
	}

	async render(screenBuffer, absoluteX, absoluteY) {
		for (let i = 0; i < this.w; i++) {
			const brightness = Math.floor(this.brightnessBuffer[i] * 255);
			screenBuffer.put({ x: absoluteX + i, y: absoluteY, attr: { color: { r: brightness, g: brightness, b: brightness } } }, CHAR);
		}

		await super.render(screenBuffer, absoluteX, absoluteY);
	}
}
