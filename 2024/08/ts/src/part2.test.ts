import { expect, test } from "vitest";
import { run } from "./part2";

test("run returns expected", async () => {
	expect(await run("./test.txt")).toEqual(34);
});
