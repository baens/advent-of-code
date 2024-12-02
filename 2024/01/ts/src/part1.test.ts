import { expect, test, assert } from "vitest";
import { pairList, parseFile, run } from "./part1";

test("produces the right list from 2 lists", () => {
	const list1 = [1, 2, 3];
	const list2 = [4, 5, 6];

	const result: Array<Array<number>> = [];

	for (const val of pairList(list1, list2)) {
		result.push(val);
	}

	assert.deepNestedInclude(result, [2, 5]);
});

test("parse", async () => {
	const result = await parseFile("day1input.test.txt");

	assert.sameDeepOrderedMembers(result, [
		[3, 4, 2, 1, 3, 3],
		[4, 3, 5, 3, 9, 3],
	]);
});

test("correct use", async () => {
	expect(await run("day1input.test.txt")).toBe(11);
});
