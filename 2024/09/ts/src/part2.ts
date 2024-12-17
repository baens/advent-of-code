import fs from "node:fs";

export async function run(input: string): Promise<number> {
	const diskConfiguration = fs
		.readFileSync(input, "utf-8")
		.split("")
		.map((s) => Number.parseInt(s));

	const diskArray: Array<number | string> = [];
	let currentPosition = 0;
	const fileLengthLookup: number[] = [];
	for (let i = 0; i < diskConfiguration.length / 2; i += 1) {
		const length = diskConfiguration[i * 2];
		const freeSpace = diskConfiguration[i * 2 + 1];
		fileLengthLookup[i] = length;
		for (let j = 0; j < length; j += 1, currentPosition += 1) {
			diskArray[currentPosition] = i;
		}

		for (let j = 0; j < freeSpace; j += 1, currentPosition += 1) {
			diskArray[currentPosition] = ".";
		}
	}

	let lastSearchedPosition = 0;
	for (let i = diskArray.length - 1; i >= 0; i -= 1) {
		const item = diskArray[i];

		if (typeof item === "string") {
			continue;
		}

		const length = fileLengthLookup[item];

		let startOfFreeSpace: number = null;
		for (let j = 0; j < i; j += 1) {
			if (diskArray[j] !== ".") {
				startOfFreeSpace = null;
				continue;
			}
		}
	}

	return 0;
}
