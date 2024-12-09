import { isSorted, loadBoard } from "./part1";

export async function run(input: string): Promise<number> {
	const [board, pagesList] = await loadBoard(input);

	let sum = 0;

	for (const pages of pagesList) {
		if (isSorted(pages, board)) {
			continue;
		}

		pages.sort((a, b) => board.sort(a, b));

		const middle = pages[Math.floor(pages.length / 2)];

		sum += middle;
	}

	return sum;
}
