import { expect, test } from "vitest";
import { run, verifyLine } from "./part2";

test("test data returns corretly", async () => {
	expect(await run("./test.txt")).toEqual(4);
});

test.each([
	[[7, 6, 4, 2, 1], true],
	[[1, 2, 7, 8, 9], false],
	[[1, 3, 2, 4, 5], true],
	[[8, 6, 4, 4, 1], true],
])("verifyLine(%o) => %o", (value, expected) => {
	expect(verifyLine(value)).toEqual(expected);
});
