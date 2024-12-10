import { expect, test } from "vitest";
import { run } from "./part1";

test("verify run", async () => {
	expect(await run("./test.txt")).toEqual(41);
});
