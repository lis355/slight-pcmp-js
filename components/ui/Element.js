export class Rectangle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

export class Element {
	constructor() {
		this.index = -1;
		this.parent = null;
		this.manager = null;
		this.children = [];
	}

	get x() { }
	get y() { }
	get w() { }
	get h() { }

	addChild(child) {
		child.manager = this.manager;
		child.index = this.children.length;
		child.parent = this;
		child.mounted();

		this.children.push(child);
	}

	removeChild(child) {
		this.children.splice(child.index, 1);

		child.unmounted();
		child.manager = null;
		child.index = -1;
		child.parent = null;
	}

	mounted() {
		for (const child of this.children) child.mounted();
	}

	unmounted() {
		for (const child of this.children) child.unmounted();
	}

	update(time) {
		for (const child of this.children) child.update(time);
	}

	async render(screenBuffer, absoluteX, absoluteY) {
		for (const child of this.children) await child.render(screenBuffer, absoluteX + this.x, absoluteY + this.y);
	}
}
