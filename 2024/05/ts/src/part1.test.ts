import { assert, expect, test } from "vitest";
import { LoadOrder, run } from "./part1";
test("verify run", async () => {
	expect(await run("./test.txt")).toBe(143);
});

test("verify loading LoadOrder works", () => {
	const loader = new LoadOrder();
	loader.load("1|2");
	loader.load("3|2");
	loader.load("4|2");

	assert.sameDeepOrderedMembers(loader.toIdealArray(), [1, 3, 4, 2]);
});
