import { expect, test } from "vitest";
import { run } from "./part2";

test("verify run", async () => {
	expect(await run("./test.txt")).toEqual(123);
});
