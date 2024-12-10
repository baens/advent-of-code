import readline from "node:readline/promises";
import fs from "node:fs";

export async function run(input: string): Promise<number> {
	const board = await loadBoard(input);

	let [x, y] = findStart(board);
	let rotation = 0;

	let uniqueSpotsMoved = 0;

	while (isValidCoordinate(board, x, y)) {
		board[y][x] = "X";
		uniqueSpotsMoved += 1;

		let nextX = x;
		let nextY = y;

		switch (rotation) {
			case 0:
				nextY -= 1;
				break;
			case 1:
				nextX += 1;
				break;
			case 2:
				nextY += 1;
				break;
			case 3:
				nextX -= 1;
				break;
			default:
				throw `Wrong rotation ${rotation}`;
		}

		if (isValidCoordinate(board, nextX, nextY) && board[nextY][nextX] === "#") {
			rotation = (rotation + 1) % 4;
		} else {
			x = nextX;
			y = nextY;
		}
	}

	return board.reduce(
		(previous, current) =>
			previous +
			current.reduce(
				(previous, current) => previous + (current === "X" ? 1 : 0),
				0,
			),
		0,
	);
}

export function isValidCoordinate(
	board: string[][],
	x: number,
	y: number,
): boolean {
	return y >= 0 && y < board.length && x >= 0 && x < board[y].length;
}

export async function loadBoard(input: string): Promise<string[][]> {
	const rl = readline.createInterface({
		input: fs.createReadStream(input),
		crlfDelay: Number.POSITIVE_INFINITY,
	});

	const map: string[][] = [];

	for await (const line of rl) {
		map.push(line.split(""));
	}

	return map;
}

export function findStart(board: string[][]): [number, number] {
	for (let y = 0; y < board.length; y += 1) {
		for (let x = 0; x < board[y].length; x += 1) {
			const item = board[y][x];
			if (item === "^") {
				return [x, y];
			}
		}
	}

	throw "no start found";
}
