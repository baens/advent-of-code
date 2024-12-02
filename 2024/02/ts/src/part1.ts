import readline from "node:readline/promises";
import fs from "node:fs";

export async function parseLineData(
	file: string,
): Promise<Array<Array<number>>> {
	const rl = readline.createInterface({
		input: fs.createReadStream(file),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	const result: Array<Array<number>> = [];

	for await (const line of rl) {
		const split = line.split(/\s+/);
		result.push(split.map((i) => Number.parseInt(i)));
	}

	return result;
}

export function verifyLine(line: Array<number>): boolean {
	const isIncreasing: boolean = line[0] < line[1];

	for (let index = 0; index < line.length; index += 1) {
		const current = line[index];
		const next = line[index + 1];

		if (next == null) {
			break;
		}

		if (current === next) {
			console.log("exactly the same");
			return false;
		}

		const difference = Math.abs(current - next);

		if (difference < 1 || difference > 3) {
			console.log("failed at difference", current, next);
			return false;
		}

		if (isIncreasing && current > next) {
			console.log("not increasing", current, next);
			return false;
		}

		if (!isIncreasing && current < next) {
			console.log("increasing", current, next);
			return false;
		}
	}

	return true;
}

export async function run(file: string): Promise<number> {
	const lines = await parseLineData(file);

	return lines.reduce((previous, current) => {
		if (verifyLine(current)) {
			return previous + 1;
		}

		return previous;
	}, 0);
}
