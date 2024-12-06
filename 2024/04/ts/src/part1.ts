import readline from "node:readline/promises";
import fs from "node:fs";

export async function run(file: string): Promise<number> {
	const board = await loadBoard(file);

	let found = 0;

	for (let y = 0; y < board.length; y += 1) {
		for (let x = 0; x < board[y].length; x += 1) {
			const item = board[y][x];

			if (item === "X") {
				found += searchSpot(board, x, y);
			}
		}
	}

	return found;
}

export function searchSpot(
	board: Array<Array<string>>,
	x: number,
	y: number,
): number {
	let found = 0;
	for (let searchY = y - 1; searchY <= y + 1; searchY += 1) {
		for (let searchX = x - 1; searchX <= x + 1; searchX += 1) {
			if (!isCoordinatesValid(board, searchX, searchY)) {
				continue;
			}

			const item = board[searchY][searchX];

			if (
				item === "M" &&
				searchVector(board, x, y, searchX - x, searchY - y) === "XMAS"
			) {
				found += 1;
			}
		}
	}

	return found;
}

export function isCoordinatesValid(
	board: Array<Array<string>>,
	x: number,
	y: number,
) {
	return y >= 0 && y < board.length && x >= 0 && x < board[y].length;
}

export function searchVector(
	board: Array<Array<string>>,
	x: number,
	y: number,
	vectorX: number,
	vectorY: number,
): string {
	let accumlator = "";
	for (let i = 0; i < 4; i += 1) {
		const posX = x + vectorX * i;
		const posY = y + vectorY * i;

		if (!isCoordinatesValid(board, posX, posY)) {
			break;
		}

		accumlator += board[posY][posX];
	}

	return accumlator;
}

export async function loadBoard(file: string): Promise<Array<Array<string>>> {
	const rl = readline.createInterface({
		input: fs.createReadStream(file),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	const board = [];
	for await (const line of rl) {
		board.push(line.split(""));
	}

	return board;
}
