import Jimp from "jimp";

import Element from "./Element.js";

export default class ImageElement extends Element {
	constructor(x, y, w, h, imageBuffer) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imageBuffer = imageBuffer;
	}

	async render(screenBuffer) {
		await this.drawImage(screenBuffer, this.x, this.y, this.w, this.h);

		await super.render(screenBuffer);
	}

	async drawImage(screenBuffer) {
		const image = await Jimp.read(this.imageBuffer);
		image.resize(this.w, this.h * 2);

		for (let y = 0; y < image.bitmap.height - 1; y += 2) {
			for (let x = 0; x < image.bitmap.width; x++) {
				const { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(x, y));
				const { r: r2, g: g2, b: b2 } = Jimp.intToRGBA(image.getPixelColor(x, y + 1));

				if (a === 0) screenBuffer.put({ x: this.x + x, y: this.y + y / 2 }, " ");
				else screenBuffer.put({ x: this.x + x, y: this.y + y / 2, attr: { color: { r, g, b, a }, bgColor: { r: r2, g: g2, b: b2 } } }, "▄");
			}
		}
	}
}
