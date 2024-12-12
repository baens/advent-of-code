import { expect, test } from "vitest";
import { run } from "./part1";

test("run returns expected", async () => {
	expect(await run("./test.txt")).toEqual(0);
});
