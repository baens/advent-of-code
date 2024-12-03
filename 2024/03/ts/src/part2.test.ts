import { expect, test } from "vitest";
import { run } from "./part2";

test("ensure that run works", async () => {
	expect(await run("./test.part2.txt")).toEqual(48);
});
