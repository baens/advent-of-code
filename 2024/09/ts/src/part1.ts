import fs from "node:fs";

export async function run(input: string): Promise<number> {
	const diskConfiguration = fs
		.readFileSync(input, "utf-8")
		.split("")
		.map((s) => Number.parseInt(s));

	const diskArray: Array<number | string> = [];
	let currentPosition = 0;
	for (let i = 0; i < diskConfiguration.length / 2; i += 1) {
		const length = diskConfiguration[i * 2];
		const freeSpace = diskConfiguration[i * 2 + 1];

		for (let j = 0; j < length; j += 1, currentPosition += 1) {
			diskArray[currentPosition] = i;
		}

		for (let j = 0; j < freeSpace; j += 1, currentPosition += 1) {
			diskArray[currentPosition] = ".";
		}
	}

	let lastSearchedPosition = 0;
	for (let i = diskArray.length - 1; i >= 0; i -= 1) {
		if (diskArray[i] === ".") {
			continue;
		}

		for (; lastSearchedPosition < i; lastSearchedPosition += 1) {
			if (diskArray[lastSearchedPosition] === ".") {
				break;
			}
		}

		if (lastSearchedPosition < i) {
			diskArray[lastSearchedPosition] = diskArray[i];
			diskArray[i] = ".";
		}
	}

	return diskArray.reduce<number>((previous, current, index) => {
		if (typeof current === "string") {
			return previous;
		}

		return current * index + previous;
	}, 0);
}
