export default class Element {
	constructor() {
		this.children = [];
	}

	addChild(child) {
		this.children.push(child);
	}

	async render(screenBuffer) {
		for (const child of this.children) await child.render(screenBuffer);
	}

	handleResize() {
		for (const child of this.children) child.handleResize();
	}
}
