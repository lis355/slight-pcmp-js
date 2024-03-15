export default class Element {
	constructor() {
		this.children = [];
	}

	addChild(child) {
		this.children.push(child);
	}

	async render() {
		for (const child of this.children) child.render();
	}

	handleResize() {
		for (const child of this.children) child.handleResize();
	}
}
