import { assert, describe, expect, test } from "vitest";
import { parseLineData, run, verifyLine } from "./part1";

test("test data returns corretly", async () => {
	expect(await run("./test.txt")).toEqual(2);
});

test("parse out line data", async () => {
	const result = await parseLineData("./test.txt");
	assert.sameDeepOrderedMembers(result[0], [7, 6, 4, 2, 1]);
});

test.each([
	[[7, 6, 4, 2, 1], true],
	[[1, 2, 7, 8, 9], false],
	[[8, 6, 4, 4, 1], false],
])("verifyLine(%o) => %o", (value, expected) => {
	expect(verifyLine(value)).toEqual(expected);
});
