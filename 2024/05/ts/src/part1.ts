import readline from "node:readline/promises";
import fs from "node:fs";

export async function run(input: string): Promise<number> {
	const [board, pages] = await loadBoard(input);

	const ideal = board.toIdealArray();

	let sum = 0;

	for (const p of pages) {
		const pagesIndexes = p.map((page) => ideal.indexOf(page));
		console.log("pages", p);
		console.log("indexes", pagesIndexes);

		if (!isSorted(pagesIndexes)) {
			continue;
		}

		console.log("sorted");

		const middle = p[Math.floor(p.length / 2)];

		sum += middle;
	}

	return sum;
}

class Pair<L, R> {
	public readonly left: L;
	public readonly right: R;

	constructor(left: L, right: R) {
		this.left = left;
		this.right = right;
	}
}

export class LoadOrder {
	private numbers: Set<number> = new Set<number>();
	private pairs: Array<Pair<number, number>> = [];

	public load(raw: string) {
		const [n1, n2] = raw.split("|").map((s) => Number.parseInt(s));
		this.numbers.add(n1);
		this.numbers.add(n2);
		this.pairs.push(new Pair(n1, n2));
	}

	public toIdealArray(): Array<number> {
		return Array.from(this.numbers).sort(this.sort.bind(this));
	}

	private sort(left: number, right: number): number {
		for (const pair of this.pairs) {
			if (left === pair.left && right === pair.right) {
				return -1;
			}

			if (right === pair.left && left === pair.right) {
				return 1;
			}
		}

		return 0;
	}
}

function isSorted(array: number[]): boolean {
	for (let i = 0; i < array.length; i++) {
		if (array[i] > array[i + 1]) {
			return false;
		}
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
