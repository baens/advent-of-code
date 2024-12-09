import readline from "node:readline/promises";
import fs from "node:fs";

export async function run(input: string): Promise<number> {
	const [board, pagesList] = await loadBoard(input);

	let sum = 0;

	for (const pages of pagesList) {
		if (!isSorted(pages, board)) {
			continue;
		}

		const middle = pages[Math.floor(pages.length / 2)];

		sum += middle;
	}

	return sum;
}

export class Pair<L, R> {
	public readonly left: L;
	public readonly right: R;

	constructor(left: L, right: R) {
		this.left = left;
		this.right = right;
	}
}

export class LoadOrder {
	private pairs: Array<Pair<number, number>> = [];

	public load(raw: string) {
		const [n1, n2] = raw.split("|").map((s) => Number.parseInt(s));
		this.pairs.push(new Pair(n1, n2));
	}

	public sort(left: number, right: number): number {
		for (const pair of this.pairs) {
			if (left === pair.left && right === pair.right) {
				return -1;
			}

			if (right === pair.left && left === pair.right) {
				return 1;
			}
		}

		throw `Number pair not found ${left} ${right}`;
	}
}

export function isSorted(array: number[], loader: LoadOrder): boolean {
	try {
		for (let i = 0; i < array.length - 1; i += 1) {
			if (loader.sort(array[i], array[i + 1]) !== -1) {
				return false;
			}
		}
	} catch (e) {
		console.log("Array", array);
		throw e;
	}

	return true;
}

export async function loadBoard(
	file: string,
): Promise<[LoadOrder, number[][]]> {
	const rl = readline.createInterface({
		input: fs.createReadStream(file),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	const loadOrder = new LoadOrder();

	for await (const line of rl) {
		if (line.trim() === "") {
			break;
		}

		loadOrder.load(line);
	}

	const pages: number[][] = [];

	for await (const line of rl) {
		pages.push(line.split(",").map(Number));
	}

	return [loadOrder, pages];
}
