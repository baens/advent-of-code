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
	let hasSkippedError = false;

	for (let index = 0; index < line.length; index += 1) {
		const current = line[index];
		const next = line[index + 1];

		if (next == null) {
			break;
		}

		if (current === next) {
			if (!hasSkippedError) {
				hasSkippedError = true;
				line.splice(index + 1, 1);
				index -= 1;
				continue;
			}

			return false;
		}

		const difference = Math.abs(current - next);

		if (difference < 1 || difference > 3) {
			if (!hasSkippedError) {
				hasSkippedError = true;
				line.splice(index + 1, 1);
				index -= 1;
				continue;
			}

			return false;
		}

		if (isIncreasing && current > next) {
			if (!hasSkippedError) {
				hasSkippedError = true;
				line.splice(index + 1, 1);
				index -= 1;
				continue;
			}

			return false;
		}

		if (!isIncreasing && current < next) {
			if (!hasSkippedError) {
				hasSkippedError = true;
				line.splice(index + 1, 1);
				index -= 1;
				continue;
			}

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
