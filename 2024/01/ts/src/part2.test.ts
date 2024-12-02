import { expect, test } from "vitest";
import { generateCountMap, run } from "./part2";

test("ensure list is constructed into count map", () => {
	const result = generateCountMap([2, 1, 3, 4, 2, 3, 1, 1]);
	expect(result).toEqual({
		1: 3,
		2: 2,
		3: 2,
		4: 1,
	});
});

test("run", async () => {
	expect(await run("day1input.test.txt")).toEqual(31);
});
