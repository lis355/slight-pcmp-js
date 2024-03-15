import terminal from "terminal-kit";

import chalk from "chalk";
import Jimp from "jimp";

import Element from "./Element.js";

const term = terminal.terminal;

const ROW_OFFSET = 0;

const PIXEL = "\u2584";

function scale(width, height, originalWidth, originalHeight) {
	const originalRatio = originalWidth / originalHeight;
	const factor = (width / height > originalRatio ? height / originalHeight : width / originalWidth);
	width = factor * originalWidth;
	height = factor * originalHeight;
	return { width, height };
}

function checkAndGetDimensionValue(value, percentageBase) {
	if (typeof value === "string" && value.endsWith("%")) {
		const percentageValue = Number.parseFloat(value);
		if (!Number.isNaN(percentageValue) && percentageValue > 0 && percentageValue <= 100) {
			return Math.floor(percentageValue / 100 * percentageBase);
		}
	}

	if (typeof value === "number") {
		return value;
	}

	throw new Error(`${value} is not a valid dimension value`);
}

function calculateWidthHeight(imageWidth, imageHeight, inputWidth, inputHeight, preserveAspectRatio) {
	const terminalColumns = term.width;
	const terminalRows = term.height - ROW_OFFSET;

	let width;
	let height;

	if (inputHeight && inputWidth) {
		width = checkAndGetDimensionValue(inputWidth, terminalColumns);
		height = checkAndGetDimensionValue(inputHeight, terminalRows) * 2;

		if (preserveAspectRatio) {
			({ width, height } = scale(width, height, imageWidth, imageHeight));
		}
	} else if (inputWidth) {
		width = checkAndGetDimensionValue(inputWidth, terminalColumns);
		height = imageHeight * width / imageWidth;
	} else if (inputHeight) {
		height = checkAndGetDimensionValue(inputHeight, terminalRows) * 2;
		width = imageWidth * height / imageHeight;
	} else {
		({ width, height } = scale(terminalColumns, terminalRows * 2, imageWidth, imageHeight));
	}

	if (width > terminalColumns) {
		({ width, height } = scale(terminalColumns, terminalRows * 2, width, height));
	}

	width = Math.round(width);
	height = Math.round(height);

	return { width, height };
}

async function drawImage(imageBuffer, x0, y0, w, h) {
	const image = await Jimp.read(imageBuffer);
	const { bitmap } = image;

	const { width, height } = calculateWidthHeight(bitmap.width, bitmap.height, w, h, false);
	image.resize(width, height);

	for (let y = 0; y < image.bitmap.height - 1; y += 2) {
		for (let x = 0; x < image.bitmap.width; x++) {
			const { r, g, b, a } = Jimp.intToRGBA(image.getPixelColor(x, y));
			const { r: r2, g: g2, b: b2 } = Jimp.intToRGBA(image.getPixelColor(x, y + 1));

			const symbol = a === 0 ? chalk.reset(" ") : chalk.bgRgb(r, g, b).rgb(r2, g2, b2)(PIXEL);

			term.moveTo(1 + x0 + x, 1 + y0 + y / 2, symbol);
		}
	}
}

export default class ImageElement extends Element {
	constructor(x, y, w, h, imageBuffer) {
		super();

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.imageBuffer = imageBuffer;
	}

	async render() {
		drawImage(this.imageBuffer, this.x, this.y, this.w, this.h);

		await super.render();
	}
}
