import { isCoordinatesValid, loadBoard } from "./part1";

export async function run(file: string): Promise<number> {
	const board = await loadBoard(file);

	let found = 0;

	for (let y = 0; y < board.length; y += 1) {
		for (let x = 0; x < board[y].length; x += 1) {
			const item = board[y][x];

			if (item === "A" && searchSpot(board, x, y)) {
				found += 1;
			}
		}
	}
	return found;
}

export function searchSpot(board: Array<Array<string>>, x: number, y: number) {
	let bottomLeft = "";
	if (isCoordinatesValid(board, x - 1, y - 1)) {
		bottomLeft = board[y - 1][x - 1];
	}

	let bottomRight = "";
	if (isCoordinatesValid(board, x + 1, y - 1)) {
		bottomRight = board[y - 1][x + 1];
	}

	let topLeft = "";
	if (isCoordinatesValid(board, x - 1, y + 1)) {
		topLeft = board[y + 1][x - 1];
	}

	let topRight = "";
	if (isCoordinatesValid(board, x + 1, y + 1)) {
		topRight = board[y + 1][x + 1];
	}

	const right = bottomLeft + topRight;
	const left = bottomRight + topLeft;

	return (right === "MS" || right === "SM") && (left === "MS" || left === "SM");
}
