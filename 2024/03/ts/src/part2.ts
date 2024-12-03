import fs from "node:fs";
import { parseMul } from "./part1";

export async function run(file: string): Promise<number> {
	const fileContent = fs.readFileSync(file);

	const foundExpressions = fileContent
		.toString()
		.match(/mul\(\d+,\d+\)|do\(\)|don\'t\(\)/g);

	if (foundExpressions == null) {
		throw "No found expressions";
	}

	let isEnabled = true;
	let accumulator = 0;
	for (const value of foundExpressions) {
		switch (value) {
			case "don't()":
				isEnabled = false;
				break;
			case "do()":
				isEnabled = true;
				break;
			default:
				if (isEnabled) {
					accumulator += parseMul(value);
				}
				break;
		}
	}

	return accumulator;
}
