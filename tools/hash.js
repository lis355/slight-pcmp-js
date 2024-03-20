import crypto from "node:crypto";

// What is the fastest node.js hashing algorithm
// https://medium.com/@chris_72272/what-is-the-fastest-node-js-hashing-algorithm-c15c1a0e164e
export default function hash(...objects) {
	const str = objects.map(String).join();

	return crypto.createHash("sha1").update(str).digest("hex");
}
