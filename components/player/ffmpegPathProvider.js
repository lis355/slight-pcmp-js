import path from "node:path";

function getFFMpegDirectory() {
	return "C:/Program Files/ffmpeg";
}

export function getFFMpegFFPlayPath() {
	return path.posix.join(getFFMpegDirectory(), "bin/ffplay.exe");
}

export function getFFMpegFFProbePath() {
	return path.posix.join(getFFMpegDirectory(), "bin/ffprobe.exe");
}
