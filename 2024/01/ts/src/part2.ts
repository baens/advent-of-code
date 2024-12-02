import fs from "node:fs";
import readline from "node:readline/promises";

export async function parseFile(file: string): Promise<Array<Array<number>>> {
	const rl = readline.createInterface({
		input: fs.createReadStream(file),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	const list1: Array<number> = [];
	const list2: Array<number> = [];
	for await (const line of rl) {
		const split = line.split(/\s+/);
		const [item1, item2] = split.map((i) => Number.parseInt(i));
		list1.push(item1);
		list2.push(item2);
	}

	return [list1, list2];
}

export function generateCountMap(list: Array<number>): Record<number, number> {
	return list.reduce((previous, current) => {
		if (!previous[current]) {
			previous[current] = 0;
		}

		previous[current] += 1;

		return previous;
	}, {});
}

export async function run(file: string): Promise<number> {
	const [list1, list2] = await parseFile(file);

	const countMap = generateCountMap(list2);

	return list1.reduce(
		(previous, current) => previous + current * (countMap[current] ?? 0),
		0,
	);
}
