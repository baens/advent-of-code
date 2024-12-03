import { expect, test } from "vitest";
import { parseMul, run } from "./part1";

test("ensure run is right", async () => {
	expect(await run("./test.txt")).toEqual(161);
});

test("Ensure mul returns right data", () => {
	expect(parseMul("mul(5,23)")).toEqual(115);
});
