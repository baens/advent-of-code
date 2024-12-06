import { assert, expect, test } from "vitest";
import { loadBoard, run, searchSpot, searchVector } from "./part1";

test("verify full run", async () => {
	expect(await run("./test.txt")).toEqual(18);
});

test("parseBoard", async () => {
	const board = await loadBoard("./test.txt");

	assert.sameDeepOrderedMembers(board[0], [
		"M",
		"M",
		"M",
		"S",
		"X",
		"X",
		"M",
		"A",
		"S",
		"M",
	]);
});

test("searchVector down right", () => {
	const board = [
		["X", ".", ".", "."],
		[".", "M", ".", "."],
		[".", ".", "A", "."],
		[".", ".", ".", "S"],
	];
	expect(searchVector(board, 0, 0, 1, 1)).toEqual("XMAS");
});

test("searchVector up left", () => {
	const board = [
		["X", ".", ".", "."],
		[".", "M", ".", "."],
		[".", ".", "A", "."],
		[".", ".", ".", "S"],
	];
	expect(searchVector(board, 3, 3, -1, -1)).toEqual("SAMX");
});

test("searchVector down", () => {
	const board = [
		[".", ".", "X", "."],
		[".", ".", "M", "."],
		[".", ".", "A", "."],
		[".", ".", "S", "."],
	];
	expect(searchVector(board, 2, 0, 0, 1)).toEqual("XMAS");
});

test("searchSpot", () => {
	const board = [
		["X", "M", "A", "S"],
		[".", "M", ".", "."],
		[".", ".", "A", "."],
		[".", ".", ".", "S"],
	];

	expect(searchSpot(board, 0, 0)).toEqual(2);
});
