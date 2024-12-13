import { expect, test } from "vitest";
import { evalItems, run } from "./part2";

test("run returns expected", async () => {
	expect(await run("./test.txt")).toEqual(11387);
});

test.each([
	[[15, 6], ["|"], 156],
	[[6, 8, 6, 15], ["*", "|", "*"], 7290],
	[[17, 8, 14], ["|", "+"], 192],
])(
	"eval for numbers %s and operators %s should be %s",
	(numbers, operators, expected) => {
		expect(evalItems(numbers, operators)).toEqual(expected);
	},
);
