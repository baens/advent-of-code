import { assert, expect, test } from "vitest";
import { LoadOrder, run } from "./part1";
test("verify run", async () => {
	expect(await run("./test.txt")).toBe(143);
});
