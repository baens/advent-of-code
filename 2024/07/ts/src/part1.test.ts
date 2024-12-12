import { expect, test } from "vitest";
import { evalItems, isValid, run } from "./part1";

test("run returns expected", async () => {
	expect(await run("./test.txt")).toEqual(3749);
});

test.each([
	[190, [10, 19], true],
	[3267, [81, 40, 27], true],
])("isValid for answer %s on array %s is %s", (answer, numbers, expected) => {
	expect(isValid(answer, numbers)).eq(expected);
});

test.each([
	[[10, 19], ["+"], 29],
	[[81, 40, 27], ["+", "*"], 3267],
])("eval takes %s and %s and returns %s", (numbers, operators, expected) => {
	expect(evalItems(numbers, operators)).toEqual(expected);
});
