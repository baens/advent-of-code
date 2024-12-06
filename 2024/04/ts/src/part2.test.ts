import { expect, test } from "vitest";
import { run } from "./part2";

test("expect run to be right", async () => {
	expect(await run("./test.txt")).toEqual(9);
});
