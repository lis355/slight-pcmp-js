export function clamp(x, min, max) {
	return Math.max(min, Math.min(max, x));
}

export function clamp01(x) {
	return clamp(x, 0, 1);
}
