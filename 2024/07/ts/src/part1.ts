import fs from "node:fs";
import readline from "node:readline/promises";

export async function run(input: string): Promise<number> {
	let accumulator = 0;
	for await (const line of loadLines(input)) {
		const [rawAnswer, rawNumbers] = line.split(":");
		const answer = Number.parseInt(rawAnswer.trim());

		const numbers = rawNumbers
			.trim()
			.split(" ")
			.map((s) => Number.parseInt(s));

		if (isValid(answer, numbers)) {
			accumulator += answer;
		}
	}

	return accumulator;
}

async function* loadLines(file: string): AsyncGenerator<string, void, void> {
	const rl = readline.createInterface({
		input: fs.createReadStream(file),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	for await (const line of rl) {
		yield line;
	}
}

export function isValid(answer: number, numbers: number[]): boolean {
	for (let i = 0; i < 2 ** (numbers.length - 1); i += 1) {
		const operators = i
			.toString(2)
			.padStart(numbers.length - 1, "0")
			.replaceAll("0", "+")
			.replaceAll("1", "*")
			.split("");

		if (evalItems(numbers, operators) === answer) {
			return true;
		}
	}

	return false;
}

export function evalItems(numbers: number[], operators: string[]): number {
	return numbers.reduce((previous, current, index) => {
		switch (operators[index - 1]) {
			case "+":
				return previous + current;
			case "*":
				return previous * current;
			default:
				throw `Unknown oepreator ${operators[index - 1]}`;
		}
	});
}
