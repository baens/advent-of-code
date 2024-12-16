import { assert, expect, test } from "vitest";
import { findAntinodePath, run } from "./part2";

test("run returns expected", async () => {
	expect(await run("./test.txt")).toEqual(34);
});

test("antinode path", () => {
	assert.sameDeepMembers(
		findAntinodePath({ x: 2, y: 2 }, { x: 1, y: 1 }, 5, 5),
		["0|0", "3|3", "4|4", "5|5", "1|1", "2|2"],
	);
});
