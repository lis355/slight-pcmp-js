export default class Element {
	constructor() {
		this.children = [];
	}

	addChild(child) {
		child.renderIndex = this.children.length;
		child.parentElement = this;

		this.children.push(child);
	}

	removeChild(child) {
		this.children.splice(child.renderIndex, 1);

		child.renderIndex = -1;
		child.parentElement = null;
	}

	async render(screenBuffer) {
		for (const child of this.children) await child.render(screenBuffer);
	}
}
