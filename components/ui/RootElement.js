import Element from "./Element.js";

export default class RootElement extends Element {
	constructor(props) {
		super(props);

		this.sizeProvider = null;
	}

	get x() { return 0; }
	get y() { return 0; }
	get width() { return this.sizeProvider.width; }
	get height() { return this.sizeProvider.height; }
}
