import { renderRectangleBorder } from "./tools/renders.js";

export default class Element {
	constructor(props = {}) {
		this.props = props;
		this.index = -1;
		this.parent = null;
		this.manager = null;
		this.children = [];
		(this.props.children || []).forEach(child => this.addChild(child));
		this.visible = this.props.visible === undefined ? true : !!this.props.visible;
	}

	get x() { throw new Error("Not implemented"); }
	get y() { throw new Error("Not implemented"); }
	get width() { throw new Error("Not implemented"); }
	get height() { throw new Error("Not implemented"); }

	addChild(child) {
		child.index = this.children.length;
		child.parent = this;

		this.children.push(child);

		if (this.manager) {
			child.manager = this.manager;

			child.handleMountedElement();
		}
	}

	removeChild(child) {
		if (this.manager) {
			child.handleUnmountedElement();

			child.manager = null;
		}

		this.children.splice(child.index, 1);

		child.parent = null;
		child.index = -1;
	}

	handleMountedElement() {
		this.handleMounted();

		for (const child of this.children) {
			child.manager = this.manager;

			child.handleMountedElement();
		}
	}

	handleUnmountedElement() {
		this.handleUnmounted();

		for (const child of this.children) {
			child.handleUnmountedElement();

			child.manager = null;
		}
	}

	handleTerminalOnResizeElement() {
		this.handleTerminalOnResize();

		for (const child of this.children) child.handleTerminalOnResizeElement();
	}

	handleTerminalOnKeyElement(name) {
		this.handleTerminalOnKey(name);

		for (const child of this.children) child.handleTerminalOnKeyElement(name);
	}

	updateElement(time) {
		this.update(time);

		for (const child of this.children) child.updateElement(time);
	}

	renderElement(screenBuffer, absoluteX, absoluteY) {
		if (!this.visible) return;

		this.preChildrenRender(screenBuffer, absoluteX, absoluteY);

		if (this.DEBUG_DRAW_BORDERS &&
			process.env.DEVELOPER_ENVIRONMENT) renderRectangleBorder(screenBuffer, absoluteX + this.x, absoluteY + this.y, this.width, this.height);

		for (const child of this.children) child.renderElement(screenBuffer, absoluteX + this.x, absoluteY + this.y);

		this.postChildrenRender(screenBuffer, absoluteX, absoluteY);
	}

	handleMounted() {
	}

	handleUnmounted() {
	}

	handleTerminalOnResize() {
	}

	handleTerminalOnKey(name) {
	}

	update(time) {
	}

	preChildrenRender(screenBuffer, absoluteX, absoluteY) {
		this.render(screenBuffer, absoluteX, absoluteY);
	}

	postChildrenRender(screenBuffer, absoluteX, absoluteY) {
	}

	// default
	render(screenBuffer, absoluteX, absoluteY) {
	}
}
