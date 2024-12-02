import fs from "node:fs";
import readline from "node:readline/promises";

export function* pairList(list1: Array<number>, list2: Array<number>) {
	for (let index = 0; index < list1.length; index += 1) {
		yield [list1[index], list2[index]];
	}
}

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

export async function run(file: string): Promise<number> {
	const [list1, list2] = await parseFile(file);

	//	console.log("list1", list1);
	list1.sort();
	list2.sort();

	let sum = 0;

	for (const [item1, item2] of pairList(list1, list2)) {
		sum += Math.abs(item2 - item1);
	}

	return sum;
}
