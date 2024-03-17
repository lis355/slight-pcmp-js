import Jimp from "jimp";
import terminal from "terminal-kit";

import Element from "./Element.js";

export default class ImageElement extends Element {
	constructor(x, y, w, h, imageBuffer) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imageBuffer = imageBuffer;
		this.screenBuffer = null;
	}

	async render(screenBuffer) {
		if (!this.screenBuffer) await this.renderImage();

		this.screenBuffer.draw({ dst: screenBuffer, x: this.x, y: this.y });

		await super.render(screenBuffer);
	}

	async renderImage() {
		const image = await Jimp.read(this.imageBuffer);
		image.resize(this.w, this.h * 2);

		this.screenBuffer = new terminal.ScreenBufferHD({ width: this.w, height: this.h });

		for (let y = 0; y < image.bitmap.height - 1; y += 2) {
			for (let x = 0; x < image.bitmap.width; x++) {
				const { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(x, y));
				const { r: r2, g: g2, b: b2 } = Jimp.intToRGBA(image.getPixelColor(x, y + 1));

				if (a === 0) this.screenBuffer.put({ x, y: y / 2 }, " ");
				else this.screenBuffer.put({ x, y: y / 2, attr: { color: { r, g, b, a }, bgColor: { r: r2, g: g2, b: b2 } } }, "▄");
			}
		}
	}
}
