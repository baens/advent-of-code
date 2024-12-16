import { assert, expect, test } from "vitest";
import { findAntinode, loadLocations, run } from "./part1";

test("run returns expected", async () => {
	expect(await run("./test.txt")).toEqual(14);
});

test("load board", async () => {
	const [board, maxX, maxY] = await loadLocations("./test.txt");

	assert.deepInclude(board.A, { x: 6, y: 5 });
	expect(maxX).toBe(11);
	expect(maxY).toBe(11);
});

test.each([
	[
		[
			{ x: 5, y: 5 },
			{ x: 4, y: 3 },
		],
		["3|1", "6|7"],
	],
	[
		[
			{ x: 8, y: 1 },
			{ x: 5, y: 2 },
		],
		["2|3", "11|0"],
	],
])("find antinode", () => {
	assert.sameMembers(findAntinode({ x: 4, y: 3 }, { x: 5, y: 5 }, 11, 11), [
		"3|1",
		"6|7",
	]);
});
