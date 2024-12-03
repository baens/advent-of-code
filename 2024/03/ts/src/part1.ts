import fs from "node:fs";

const finder = /mul\(\d+,\d+\)/g;

export function parseMul(data: string): number {
	const rawNumbers = data.match(/\d+/g);

	if (rawNumbers == null) {
		throw "No found numbers";
	}

	const number1 = Number.parseInt(rawNumbers[0]);
	const number2 = Number.parseInt(rawNumbers[1]);

	return number1 * number2;
}

export async function run(file: string): Promise<number> {
	const fileContent = fs.readFileSync(file);

	const foundExpressions = fileContent.toString().match(finder);

	if (foundExpressions == null) {
		throw "No found expressions";
	}

	return foundExpressions.reduce(
		(previous, current) => previous + parseMul(current),
		0,
	);
}
